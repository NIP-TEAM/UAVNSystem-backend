import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { EmailService } from './email.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtAuthReq } from 'src/utils/types';
import { CreateEmailDto } from './dto/create-email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createEmail(@Req() req: JwtAuthReq, @Body() data: CreateEmailDto[]) {
    return this.emailService.createOne(req.user.tenant, data);
  }
}
