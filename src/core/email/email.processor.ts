import { Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { PrismaService } from 'src/prisma/prisma.service';

export class EmailProcessor {
  private readonly logger = new Logger(EmailProcessor.name);
  constructor(private prisma: PrismaService) {}
  @Process('send')
  async sendEmail(job: Job) {
    this.logger.debug('start send');
  }
}
