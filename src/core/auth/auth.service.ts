import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from 'src/core/user/entities/auth.entity';
import { UserService } from 'src/core/user/user.service';
import { hashIsEqual } from 'src/utils/utils';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException(
        JSON.stringify({
          en: 'No user found for email:' + ' ' + email,
          zh: '没有找到该用户, 邮箱信息:' + ' ' + email,
        }),
      );
    }

    if (!user.password) {
      throw new UnauthorizedException(
        JSON.stringify({
          en: 'Please reset your password or enter from onboarding.',
          zh: '密码有误，或在下方重置密码!',
        }),
      );
    }
    const isPasswordValid = await hashIsEqual(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        JSON.stringify({
          en: 'Invalid password',
          zh: '密码不符合规则',
        }),
      );
    }

    const token = this.jwtService.sign(
      { userId: user.id },
      { secret: process.env.JWT_SECRET_KEY, expiresIn: '8h' },
    );

    const userLatestInfo = await this.userService.updateOne(+user.id, {
      active: true,
      lastLogin: new Date().getTime().toString(),
    });

    const loginUser = {
      token,
      userInfo: userLatestInfo,
    };

    return new AuthEntity(loginUser);
  }
}
