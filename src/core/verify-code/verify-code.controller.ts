import { Body, Controller, Post } from '@nestjs/common';
import { VerifyCodeService } from './verify-code.service';

@Controller('verify-code')
export class VerifyCodeController {
  constructor(private verifyCodeService: VerifyCodeService) {}
  @Post('send')
  sendVerify(@Body() email: string) {
    return this.verifyCodeService.sendVerifyCode(email);
  }
}
