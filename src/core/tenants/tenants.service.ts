import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getHashPassword } from 'src/utils/utils';
import { VerifyCodeService } from '../verify-code/verify-code.service';
import { UserService } from '../user/user.service';
import { RegisterUserDto } from '../user/dto/register-user.dto';

@Injectable()
export class TenantsService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly verifyCodeService: VerifyCodeService,
    private readonly userService: UserService,
  ) {}

  findOne(id: number) {
    return this.userService.findOneById(id);
  }

  private generateRandomPassword() {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    const passwordLength = Math.floor(Math.random() * 11) + 6;
    let password = '';

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }

    return password;
  }

  async register({ email, password, name, verifyCode }: RegisterUserDto) {
    const isExist = await this.userService.findOneByEmail(email);
    if (isExist)
      throw new BadRequestException(
        JSON.stringify({
          en: 'This email is existed!',
          zh: '此邮箱已被注册!',
        }),
      );
    else {
      // check verifyCode
      if (!(await this.verifyCodeService.checkVerifyCode(email, verifyCode)))
        throw new BadRequestException(
          JSON.stringify({
            en: 'Error varification code!',
            zh: '验证码错误!',
          }),
        );
      // generate password
      const radomPassword = password || this.generateRandomPassword();
      const hashedPassword = await getHashPassword(radomPassword);
      await this.userService.createOne({
        email,
        password: hashedPassword,
        name,
      });
    }
  }
}
