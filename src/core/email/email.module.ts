import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { EMAILCONFIG } from './config';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [MailerModule.forRoot(EMAILCONFIG), PrismaModule],
  providers: [EmailService],
  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailModule {}
