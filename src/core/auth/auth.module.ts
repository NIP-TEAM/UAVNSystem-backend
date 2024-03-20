import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { TenantsModule } from '../tenants/tenants.module';
import { TenantsService } from '../tenants/tenants.service';
import { UserModule } from 'src/core/user/user.module';
import { UserService } from 'src/core/user/user.service';
import { VerifyCodeService } from '../verify-code/verify-code.service';
import { VerifyCodeModule } from '../verify-code/verify-code.module';
import { EmailService } from '../email/email.service';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '8h' }, // e.g. 30s, 7d, 24h
    }),
    TenantsModule,
    UserModule,
    VerifyCodeModule,
    EmailModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    TenantsService,
    UserService,
    VerifyCodeService,
    EmailService,
  ],
})
export class AuthModule {}
