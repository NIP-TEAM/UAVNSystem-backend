import { Module } from '@nestjs/common';
import { NetworkService } from './network.service';
import { NetworkController } from './network.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProtocolModule } from '../protocol/protocol.module';

@Module({
  imports: [PrismaModule, ProtocolModule],
  controllers: [NetworkController],
  providers: [NetworkService],
  exports: [NetworkService],
})
export class NetworkModule { }
