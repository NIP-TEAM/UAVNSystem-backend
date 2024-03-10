import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Post()
  async loginController() {
    // 添加token验证
    const userInfo = await this.appService.getUserInfo();
    return {
      token: '1w2312312341234ewwdfasfadgfa',
      userInfo,
    };
  }
}
