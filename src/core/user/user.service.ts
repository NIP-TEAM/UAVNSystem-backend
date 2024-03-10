import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  getUserInfo({ email, password }: CreateUserDto) {
    // 扩展数据库查询
    return {
      id: 1,
      name: 'test',
      active: true,
      avatar: '',
      lastLogIn: new Date().getTime(),
    };
  }
}
