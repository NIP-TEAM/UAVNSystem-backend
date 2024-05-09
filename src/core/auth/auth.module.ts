import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { TenantsService } from '../tenants/tenants.service';
import { VerifyCodeService } from '../verify-code/verify-code.service';
import { EmailService } from '../email/email.service';
import { UserService } from '../tenants/user/user.service';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '8h' }, // e.g. 30s, 7d, 24h
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    TenantsService,
    UserService,
    VerifyCodeService,
    EmailService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
