import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetEntityDto } from './dto/get-entity.dto';
import { EntityService } from './entity.service';

@Controller('entity')
export class EntityController {
  constructor(private readonly entityService: EntityService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getMapsInfo(@Query() { maps }: GetEntityDto) {
    return this.entityService.findAll(JSON.parse(maps || '[]'));
  }
}
