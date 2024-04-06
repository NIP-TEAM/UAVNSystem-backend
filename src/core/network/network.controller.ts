import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { NetworkService } from './network.service';
import { CreateNetworkDto } from './dto/create-network.dto';
import { UpdateNetworkDto } from './dto/update-network.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtAuthReq } from 'src/utils/types';

@Controller('network')
export class NetworkController {
  constructor(private readonly networkService: NetworkService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: JwtAuthReq, @Body() createNetworkDto: CreateNetworkDto) {
    return this.networkService.create(req.user.tenant.id, createNetworkDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: JwtAuthReq) {
    return this.networkService.findAll(req.user.tenant.merchantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.networkService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNetworkDto: UpdateNetworkDto) {
    return this.networkService.update(+id, updateNetworkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.networkService.remove(+id);
  }
}
