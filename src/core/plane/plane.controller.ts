import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PlaneService } from './plane.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtAuthReq } from 'src/utils/types';
import { GetUavDto } from './dto/get-uav.dto';
import { CreateUavDto } from './dto/create-uav.dto';

@Controller('plane')
export class PlaneController {
  constructor(private readonly planeService: PlaneService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: JwtAuthReq, @Body() uavs: CreateUavDto[]) {
    return this.planeService.create(
      req.user.tenant.merchantId,
      req.user.tenant.id,
      uavs,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: JwtAuthReq, @Query() DataController: GetUavDto) {
    return this.planeService.findAll(
      req.user.tenant.merchantId,
      DataController,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  delete(@Body() { ids }: { ids: number[] }) {
    return this.planeService.deleteMany(ids);
  }
}
