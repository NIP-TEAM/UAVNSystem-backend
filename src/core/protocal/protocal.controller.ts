import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ProtocalService } from './protocal.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtAuthReq } from 'src/utils/types';
import { GetProtocalDto } from './dto/get-protocal.dto';

@Controller('protocal')
export class ProtocalController {
  constructor(private readonly protocalService: ProtocalService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: JwtAuthReq, @Query() dataController: GetProtocalDto) {
    return this.protocalService.findAll(req.user.tenant.id, dataController);
  }
}
