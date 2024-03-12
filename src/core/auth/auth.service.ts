import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from 'src/core/user/entities/auth.entity';
import { UserService } from 'src/core/user/user.service';
import LoginText from 'src/language/core/auth.json';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new NotFoundException({
        en: LoginText.userNotFound.en + ' ' + email,
        zh: LoginText.userNotFound.zh + ' ' + email,
      });
    }

    if (!user.password) {
      throw new UnauthorizedException(LoginText.passwordError);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(LoginText.invalidPassword);
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
      ...userLatestInfo,
    };

    return new AuthEntity(loginUser);
  }
}
