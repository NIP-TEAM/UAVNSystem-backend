import {
  Body,
  Controller,
  Delete,
  Get,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProtocolService } from './protocol.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtAuthReq } from 'src/utils/types';
import { GetProtocolDto } from './dto/get-protocol.dto';

@Controller('protocal')
export class ProtocalController {
  constructor(private readonly protocalService: ProtocolService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: JwtAuthReq, @Query() dataController: GetProtocolDto) {
    return this.protocalService.findAll(req.user.tenant.id, dataController);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteOne(@Body() { id }: { id: number }) {
    return this.protocalService.deleteOne(id);
  }
}
