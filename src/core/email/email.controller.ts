import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtAuthReq } from 'src/utils/types';
import { CreateEmailDto } from './dto/create-email.dto';
import { GetEmailsDto } from './dto/get-email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getEmails(@Req() req: JwtAuthReq, @Query() data: GetEmailsDto) {
    return this.emailService.findAll(req.user.tenant.merchantId, data);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getEmail(@Param('id') id: number) {
    return this.emailService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createEmail(@Req() req: JwtAuthReq, @Body() data: CreateEmailDto[]) {
    return this.emailService.createMany(req.user.tenant, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteEmail(@Param('id') id: number) {
    return this.emailService.deleteOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/schedule/:id')
  handleSchedule(@Param('id') id: number) {
    return this.emailService.handleSchedule(id);
  }
}
