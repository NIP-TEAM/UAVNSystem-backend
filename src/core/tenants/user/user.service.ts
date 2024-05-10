import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { getHashPassword } from 'src/utils/utils';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(merchantId: number) {
    const data = await this.prisma.userInfo.findMany({
      where: { merchantId },
      select: {
        name: true,
        id: true,
      },
    });
    return {
      data,
    };
  }

  async findOneByEmail(email: string) {
    return await this.prisma.userInfo.findFirst({ where: { email } });
  }

  async findOneById(id: number) {
    return await this.prisma.userInfo.findFirst({ where: { id } });
  }

  async updateOne(id: number, { password, ...restData }: UpdateUserDto) {
    const result = await this.prisma.userInfo.update({
      where: { id },
      data: {
        ...(password
          ? {
              password: await getHashPassword(password),
            }
          : {}),
        ...restData,
      },
    });
    return result;
  }

  async createOne(data: CreateUserDto) {
    await this.prisma.userInfo.create({
      data: {
        ...data,
        active: false,
        lastLogin: '0',
      },
    });
    return 'success';
  }
}
