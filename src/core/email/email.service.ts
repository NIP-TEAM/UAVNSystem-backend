import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { PrismaService } from 'src/prisma/prisma.service';

export enum Subject {
  VerifyCode = '验证码邮件 Verification Code Email',
}

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly prisma: PrismaService,
  ) {}

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
