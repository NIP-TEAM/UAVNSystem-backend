import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetContactDto } from './dto/get-contact.dto';
import { JwtAuthReq } from 'src/utils/types';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllContactList(@Req() req: JwtAuthReq) {
    return this.contactService.findAllContactList(req.user.tenant.merchantId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('detail/:id')
  findOneContactList(@Param('id') id: number) {
    return this.contactService.findOneContactList(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findAllContact(
    @Req() req: JwtAuthReq,
    @Param('id') id: number,
    @Query() dataController: GetContactDto,
  ) {
    return this.contactService.findAllContact(
      req.user.tenant.merchantId,
      id,
      dataController,
    );
  }
}
