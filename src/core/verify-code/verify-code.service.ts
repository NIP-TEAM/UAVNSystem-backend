import { Injectable } from '@nestjs/common';
import { EmailService, Subject } from '../email/email.service';
import { getHashPassword } from 'src/utils/utils';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VerifyCodeService {
  constructor(
    private mailServer: EmailService,
    private prisma: PrismaService,
  ) {}

  async sendVerifyCode(email: string) {
    const randomCode = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');
    const newCode = await getHashPassword(randomCode);
    const verifyCode = await this.prisma.verifyCode.findFirst({
      where: {
        email,
      },
    });
    if (verifyCode) {
      await this.prisma.verifyCode.update({
        where: { email },
        data: {
          email,
          code: newCode,
          createTime: new Date().getTime().toString(),
        },
      });
    } else {
      await this.prisma.verifyCode.create({
        data: {
          email,
          code: newCode,
          createTime: new Date().getTime().toString(),
        },
      });
    }
    await this.mailServer.sendEmail(email, Subject.VerifyCode, 'verifyCode', {
      name: email,
      verificationCode: randomCode,
    });
    return 'success';
  }
}
