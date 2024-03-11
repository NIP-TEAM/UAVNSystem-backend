import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly appService: UserService) {}

  // @Post()
  // async loginController(@Body() loginInfo: CreateUserDto) {
  //   // 添加token验证
  //   const userInfo = await this.appService.getUserInfo(loginInfo);
  //   return {
  //     token: '1w2312312341234ewwdfasfadgfa',
  //     userInfo,
  //   };
  // }
}
