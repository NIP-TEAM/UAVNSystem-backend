import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { PrismaService } from 'src/prisma/prisma.service';
import { Subject } from './config';
import { JwtAuthReq } from 'src/utils/types';
import { CreateEmailDto } from './dto/create-email.dto';
import { Prisma } from '@prisma/client';
import { formateFilter, formateSearchKey } from './utils';
import { GetEmailsDto } from './dto/get-email.dto';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly prisma: PrismaService,
  ) {}

  async findAll(
    merchantId: number,
    { pagination: { current, pageSize }, filter }: GetEmailsDto,
  ) {
    const {
      searchKey = '',
      filters = {},
      sorter = {},
    } = JSON.parse(filter || '{}');
    const where: Prisma.EmailWhereInput = {
      AND: [
        {
          merchantId,
        },
        ...(formateFilter(filters) as Prisma.EmailWhereInput[]),
        formateSearchKey(searchKey) as Prisma.EmailWhereInput,
      ],
    };
    const [data, total] = await Promise.all([
      this.prisma.email.findMany({
        where,
        select: {
          id: true,
          name: true,
          createAt: true,
          creator: {
            select: {
              id: true,
              name: true,
            },
          },
          network: {
            select: {
              id: true,
              name: true,
            },
          },
          onSchedule: true,
          updateAt: true,
        },
        skip: (current - 1) * pageSize,
        take: +pageSize,
        orderBy: sorter,
      }),
      this.prisma.email.count({
        where,
      }),
    ]);

    return {
      data,
      meta: {
        pagination: { total },
      },
    };
  }

  async findOne(id: number) {
    const data = await this.prisma.email.findUniqueOrThrow({
      where: { id },
      include: {
        creator: {
          select: {
            name: true,
            id: true,
          },
        },
        network: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
    const contacts = await this.prisma.contact.findMany({
      where: {
        id: { in: data.contactIds },
      },
      select: {
        name: true,
        email: true,
      },
    });

    return {
      data: { ...data, contacts },
    };
  }

  async createMany(
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

  async deleteOne(id: number) {
    await this.prisma.email.delete({ where: { id } });
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

  async handleSchedule(id: number) {
    const { onSchedule } = await this.prisma.email.findUniqueOrThrow({
      where: { id },
    });
    await this.prisma.email.update({
      where: { id },
      data: {
        onSchedule: !onSchedule,
        updateAt: new Date().getTime().toString(),
      },
    });
    return 'success';
  }
}
