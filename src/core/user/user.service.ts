import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(merchantId: number) {
    return (await this.prisma.userInfo.findMany({ where: { merchantId } })).map(
      ({ name, id }) => ({
        name,
        id,
      }),
    );
  }

  async findOneByEmail(email: string) {
    return await this.prisma.userInfo.findFirst({ where: { email } });
  }

  async findOneById(id: number) {
    return await this.prisma.userInfo.findFirst({ where: { id } });
  }

  async updateOne(id: number, data: UpdateUserDto) {
    return await this.prisma.userInfo.update({ where: { id }, data });
  }

  async createOne(data: CreateUserDto) {
    return await this.prisma.userInfo.create({
      data: {
        ...data,
        active: false,
        lastLogin: '0',
      },
    });
  }
}
