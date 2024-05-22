import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { EMAILCONFIG } from './config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailScheduleService } from './email.schedule';

@Module({
  imports: [
    MailerModule.forRoot(EMAILCONFIG),
    PrismaModule,
    ScheduleModule.forRoot(),
  ],
  providers: [EmailService, EmailScheduleService],
  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailModule {}
