import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ContactController } from './contact.controller';

@Module({
  imports: [PrismaModule],
  providers: [ContactService],
  controllers: [ContactController],
  exports: [ContactService],
})
export class ContactModule {}
