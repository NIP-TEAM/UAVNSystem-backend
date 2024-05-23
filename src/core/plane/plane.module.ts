import { Module } from '@nestjs/common';
import { PlaneController } from './plane.controller';
import { PlaneService } from './plane.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProtocolModule } from '../protocol/protocol.module';

@Module({
  imports: [PrismaModule, ProtocolModule],
  controllers: [PlaneController],
  providers: [PlaneService],
  exports: [PlaneService],
})
export class PlaneModule { }
