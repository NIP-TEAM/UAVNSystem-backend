import { Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import { JwtAuthReq } from 'src/utils/types';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findUser(@Param('id') id: number) {
    return this.userService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser(@Req() req: JwtAuthReq, data: UpdateUserDto) {
    return this.userService.updateOne(req.user.tenant.id, data);
  }
}
