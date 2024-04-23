import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetContactListDto } from './dto/get-contact.dto';
import { JwtAuthReq } from 'src/utils/types';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: JwtAuthReq, @Query() data: GetContactListDto) {
    return this.contactService.findAll(req.user.tenant.merchantId, data);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.contactService.findOne(+id);
  }
}
