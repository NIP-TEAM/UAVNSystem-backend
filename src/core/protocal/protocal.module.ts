import { Module } from '@nestjs/common';
import { ProtocalController } from './protocal.controller';
import { ProtocalService } from './protocal.service';

@Module({
  controllers: [ProtocalController],
  providers: [ProtocalService]
})
export class ProtocalModule {}
