import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(email: string) {
    return await this.prisma.userInfo.findFirst({ where: { email } });
  }

  async updateOne(id: number, data: UpdateUserDto) {
    return await this.prisma.userInfo.update({ where: { id }, data });
  }
}
