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
    const verifyCode = await getHashPassword(randomCode);
    await this.prisma.verifyCode.create({
      data: {
        email,
        code: verifyCode,
        createTime: new Date().getTime().toString(),
      },
    });
    setTimeout(async () => {
      await this.prisma.verifyCode.delete({
        where: {
          email,
        },
      });
    }, 30000);
    await this.mailServer.sendEmail(email, Subject.VerifyCode, 'verifyCode', {
      name: email,
      verificationCode: randomCode,
    });
    return 'success';
  }
}
