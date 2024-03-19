import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerModule } from '@nestjs-modules/mailer';
import EMAILCONFIG from './config';

@Module({
  imports: [MailerModule.forRoot(EMAILCONFIG)],
  providers: [EmailService, PrismaService],
  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailModule {}
