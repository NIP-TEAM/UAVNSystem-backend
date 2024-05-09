import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { AuthService } from '../auth/auth.service';
import { ToolsService } from 'src/utils/tools.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtAuthReq } from 'src/utils/types';
import { ForgetUserDto } from './user/dto/forget-user.dto';
import { LoginUserDto } from './user/dto/login-user.dto';
import { RegisterUserDto } from './user/dto/register-user.dto';

@Controller('tenants')
export class TenantsController {
  constructor(
    private readonly tenantsService: TenantsService,
    private authService: AuthService,
    private readonly toolsService: ToolsService,
  ) {}

  // @Post()
  // create(@Body() createTenantDto: CreateTenantDto) {
  //   return this.tenantsService.create(createTenantDto);
  // }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: JwtAuthReq) {
    return this.tenantsService.findAll(req.user.tenant.merchantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenantsService.findOne(+id);
  }

  //   @Patch(':id')
  //   update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
  //     return this.tenantsService.update(+id, updateTenantDto);
  //   }

  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.tenantsService.remove(+id);
  //   }
  @Post('sessions')
  login(@Body() { email, password }: LoginUserDto) {
    return this.authService.login(email, password);
  }
  @Post('register')
  register(@Body() registerInfo: RegisterUserDto) {
    return this.tenantsService.register(registerInfo);
  }

  @Post('captcha')
  getCaptcha() {
    return this.toolsService.captche();
  }

  @Post('forget')
  forgetPassword(@Body() forgetInfo: ForgetUserDto) {
    this.tenantsService.sendPassword(forgetInfo);
  }
}
