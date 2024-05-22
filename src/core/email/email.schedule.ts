import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from './email.service';
import { findIpByMac } from 'src/simulateData/utils';
import { compareResult, excutePingIp } from './utils';
import { Subject } from './config';

@Injectable()
export class EmailScheduleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}
  private readonly logger = new Logger(EmailScheduleService.name);

  @Interval(10000)
  async handleCron() {
    const allEmail = await this.prisma.email.findMany({
      where: { onSchedule: { equals: true } },
      include: {
        network: {
          select: {
            id: true,
            uavs: true,
            connectMap: true,
          },
        },
      },
    });
    allEmail.forEach(
      async ({ network: { uavs, id }, contactIds, condition }) => {
        const {
          condition: { category, quantifier, content },
        } = condition[0][0];
        switch (category) {
          case 1:
            const ips = uavs.map(({ mac }) => findIpByMac(mac)?.ip);
            const results = await Promise.all(
              ips.map((ip) => excutePingIp(ip)),
            );
            console.log(ips, results);
            if (
              compareResult(
                quantifier,
                content,
                results.filter((item) => !item).length,
              )
            ) {
              const sendTo = await this.prisma.contact.findMany({
                where: { id: { in: contactIds } },
                select: { email: true },
              });
              await Promise.all(
                sendTo.map(({ email }) => {
                  this.emailService.sendEmail(
                    email,
                    Subject.NetworkError,
                    'networkStateError',
                    {
                      name: email,
                      networkId: id,
                      urlContent: '100.87.174.74/network/' + id,
                    },
                  );
                }),
              );
            } else this.logger.log('network ' + id + ' run normally!');
            break;

          default:
            break;
        }
      },
    );
  }
}
