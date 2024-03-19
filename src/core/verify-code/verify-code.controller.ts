import { Body, Controller, Post } from '@nestjs/common';
import { VerifyCodeService } from './verify-code.service';
import { VerifyCodeDto } from './dto/verify-code.dto';

@Controller('verify-code')
export class VerifyCodeController {
  constructor(private verifyCodeService: VerifyCodeService) {}
  @Post('send')
  sendVerify(@Body() { email }: VerifyCodeDto) {
    return this.verifyCodeService.sendVerifyCode(email);
  }
}
