import { Module } from '@nestjs/common';
import { PlaneController } from './plane.controller';
import { PlaneService } from './plane.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PlaneController],
  providers: [PlaneService, PrismaService],
})
export class PlaneModule {}
