import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { PlaneService } from './plane.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtAuthReq } from 'src/utils/types';
import { GetUavDto } from './dto/get-uav.dto';

@Controller('plane')
export class PlaneController {
  constructor(private readonly planeService: PlaneService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: JwtAuthReq, @Query() DataController: GetUavDto) {
    return this.planeService.findAll(
      req.user.tenant.merchantId,
      DataController,
    );
  }
}
