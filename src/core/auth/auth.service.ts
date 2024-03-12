import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from 'src/core/user/entities/auth.entity';
import { UserService } from 'src/core/user/user.service';
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
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    if (!user.password) {
      throw new UnauthorizedException(
        'Please reset your password or enter from onboarding.',
      );
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const access = this.jwtService.sign(
      { userId: user.id },
      { secret: process.env.JWT_SECRET_KEY, expiresIn: '8h' },
    );

    const userLatestInfo = await this.userService.updateOne(+user.id, {
      active: true,
      lastLogin: new Date().getTime().toString(),
    });

    const loginUser = {
      access,
      ...userLatestInfo,
    };

    return new AuthEntity(loginUser);
  }
}
