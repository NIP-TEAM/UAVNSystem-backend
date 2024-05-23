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
  Query,
} from '@nestjs/common';
import { NetworkService } from './network.service';
import { CreateNetworkDto } from './dto/create-network.dto';
import { UpdateNetworkDto } from './dto/update-network.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtAuthReq } from 'src/utils/types';
import { GetNetworkDto } from './dto/get-network.dto';
import { RemoveNetworkDto } from './dto/remove-network.dto';

@Controller('network')
export class NetworkController {
  constructor(private readonly networkService: NetworkService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: JwtAuthReq, @Body() createNetworkDto: CreateNetworkDto) {
    return this.networkService.create(req.user.tenant, createNetworkDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: JwtAuthReq, @Query() DataController: GetNetworkDto) {
    return this.networkService.findAll(
      req.user.tenant.merchantId,
      DataController,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.networkService.findOne(+id);
  }

  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() updateNetworkDto: UpdateNetworkDto) {
    return this.networkService.updateOne(+id, updateNetworkDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() removeDto: RemoveNetworkDto) {
    return this.networkService.remove(removeDto);
  }
}
