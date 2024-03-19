import { Module } from '@nestjs/common';
import { VerifyCodeService } from './verify-code.service';
import { EmailService } from '../email/email.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [VerifyCodeService, EmailService, PrismaService]
})
export class VerifyCodeModule {}
