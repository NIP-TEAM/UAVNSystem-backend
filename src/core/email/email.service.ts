import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

export enum Subject {
  VerifyCode = '验证码邮件(Verification Code Email)',
}

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(
    email: string,
    subject: Subject,
    text?: string,
    template?: string,
    context?: { [key: string]: string | number },
  ) {
    await this.mailerService.sendMail({
      to: email,
      subject,
      ...(text ? { text } : {}),
      ...(template ? { template, context } : {}),
    });
  }
}
