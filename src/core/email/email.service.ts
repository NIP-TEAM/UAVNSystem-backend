import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { PrismaService } from 'src/prisma/prisma.service';
import { Subject } from './config';
import { JwtAuthReq } from 'src/utils/types';
import { CreateEmailDto } from './dto/create-email.dto';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly prisma: PrismaService,
  ) {}

  async createOne(
    { id: creatorId, merchantId }: JwtAuthReq['user']['tenant'],
    createEmails: CreateEmailDto[],
  ) {
    await this.prisma.email.createMany({
      data: createEmails.map((data) => ({
        ...data,
        merchantId,
        creatorId,
        createAt: new Date().getTime().toString(),
        updateAt: new Date().getTime().toString(),
      })),
    });
    return 'success';
  }

  async sendEmail(
    email: string,
    subject: Subject,
    template?: string,
    context?: { [key: string]: string | number },
    text?: string,
  ) {
    await this.mailerService.sendMail({
      to: email,
      subject,
      ...(text ? { text } : {}),
      ...(template ? { template, context } : {}),
    });
  }
}
