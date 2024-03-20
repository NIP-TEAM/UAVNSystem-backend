import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { getHashPassword, hashIsEqual } from 'src/utils/utils';
import { PrismaService } from 'src/prisma/prisma.service';
import { Subject } from '../email/config';

@Injectable()
export class VerifyCodeService {
  constructor(
    private mailServer: EmailService,
    private prisma: PrismaService,
  ) {}

  private async findOne(email: string) {
    return await this.prisma.verifyCode.findFirst({ where: { email } });
  }

  private async deleteOne(email: string) {
    await this.prisma.verifyCode.delete({ where: { email } });
  }

  async sendVerifyCode(email: string) {
    const randomCode = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');
    const newCode = await getHashPassword(randomCode);
    const verifyCode = await this.findOne(email);
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

  async checkVerifyCode(email: string, code: string) {
    const verifyCode = await this.findOne(email);

    if (!verifyCode)
      throw new NotFoundException(
        JSON.stringify({
          en: 'The email does not contain any verification code information!',
          zh: '该邮箱不存在验证码信息！',
        }),
      );
    const { code: storedCode, createTime: createTimeString } = verifyCode;
    if (new Date().getTime() - Number(createTimeString) <= 5 * 60 * 1000) {
      if (!(await hashIsEqual(code, storedCode)))
        throw new ForbiddenException(
          JSON.stringify({
            en: 'Incorrect verification code!',
            zh: '验证码错误！',
          }),
        );
    } else {
      this.deleteOne(email);
      throw new ForbiddenException(
        JSON.stringify({
          en: 'The verification code has expired. Please re-validate!',
          zh: '验证码已过期，请重新验证！',
        }),
      );
    }
    this.deleteOne(email);

    return 'success';
  }
}
