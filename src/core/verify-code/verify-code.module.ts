import { Module } from '@nestjs/common';
import { VerifyCodeService } from './verify-code.service';
import { EmailModule } from '../email/email.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { VerifyCodeController } from './verify-code.controller';

@Module({
  imports: [EmailModule, PrismaModule, AuthModule],
  controllers: [VerifyCodeController],
  providers: [VerifyCodeService],
  exports: [VerifyCodeService],
})
export class VerifyCodeModule {}
