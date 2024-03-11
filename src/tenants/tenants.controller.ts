import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { AuthService } from '../auth/auth.service';
import { ToolsService } from 'src/utils/tools.service';
import { RegisterDto } from '../core/user/dto/register.dto';
import { LoginUserDto } from '../core/user/dto/login-user.dto';

@Controller('tenants')
export class TenantsController {
  constructor(
    private readonly tenantsService: TenantsService,
    private authService: AuthService,
    private readonly toolsService: ToolsService,
  ) {}

  //   @Post()
  //   create(@Body() createTenantDto: CreateTenantDto) {
  //     return this.tenantsService.create(createTenantDto);
  //   }

  //   @Get()
  //   findAll() {
  //     return this.tenantsService.findAll();
  //   }

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
  register(@Body() registerInfo: RegisterDto) {
    return this.tenantsService.register(registerInfo);
  }

  @Post('captcha')
  getCaptcha() {
    return this.toolsService.captche();
  }
}
