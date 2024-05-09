import { Module } from '@nestjs/common';
import { ProtocalController } from './protocol.controller';
import { ProtocolService } from './protocol.service';

@Module({
  controllers: [ProtocalController],
  providers: [ProtocolService],
})
export class ProtocalModule {}
