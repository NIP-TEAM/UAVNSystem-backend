import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetContactDto, GetContactListDto } from './dto/get-contact.dto';
import { JwtAuthReq } from 'src/utils/types';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllContactList(@Req() req: JwtAuthReq, @Query() data: GetContactListDto) {
    return this.contactService.findAllContactList(
      req.user.tenant.merchantId,
      data,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOneContactList(@Param('id') id: number) {
    return this.contactService.findOneContactList(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('list/:id')
  findAllContact(
    @Req() req: JwtAuthReq,
    @Param('id') id: number,
    dataController: GetContactDto,
  ) {
    return this.contactService.findAllContact(
      req.user.tenant.merchantId,
      id,
      dataController,
    );
  }
}
