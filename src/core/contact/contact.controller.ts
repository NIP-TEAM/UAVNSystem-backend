import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetContactDto } from './dto/get-contact.dto';
import { JwtAuthReq } from 'src/utils/types';
import {
  CreateContactDto,
  CreateContactListDto,
} from './dto/create-contact.dto';
import {
  UpdateContactDto,
  UpdateContactListDto,
} from './dto/update-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @UseGuards(JwtAuthGuard)
  @Get('infos')
  findContacts(@Req() req: JwtAuthReq, @Query() ids: string) {
    return this.contactService.findManyContact(req.user.tenant.merchantId, ids);
  }

  @UseGuards(JwtAuthGuard)
  @Get('info/:id')
  findContactDetail(@Param('id') id: number) {
    return this.contactService.findContactDetail(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('info/:id')
  updateContactDetail(@Param('id') id: number, @Body() data: UpdateContactDto) {
    return this.contactService.updateContactInfo(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('contactlist')
  findAllContactList(@Req() req: JwtAuthReq) {
    return this.contactService.findAllContactList(req.user.tenant.merchantId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('contactlist/info/:id')
  findOneContactList(@Param('id') id: number) {
    return this.contactService.findOneContactList(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('contactlist/:id')
  updateOneContactListInfo(
    @Param('id') id: number,
    @Body() data: UpdateContactListDto,
  ) {
    return this.contactService.updateContactListInfo(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('contactlist/:id')
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

  @UseGuards(JwtAuthGuard)
  @Post('contactlist')
  createContactList(
    @Req() req: JwtAuthReq,
    @Body() data: CreateContactListDto,
  ) {
    return this.contactService.createNewContactList(req.user.tenant, data);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createContacts(@Req() req: JwtAuthReq, @Body() data: CreateContactDto[]) {
    return this.contactService.createNewContacts(req.user.tenant, data);
  }
}
