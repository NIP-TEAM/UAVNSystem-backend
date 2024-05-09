import { Module } from '@nestjs/common';
import { ProtocalController } from './protocol.controller';
import { ProtocolService } from './protocol.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProtocalController],
  providers: [ProtocolService],
})
export class ProtocolModule {}
