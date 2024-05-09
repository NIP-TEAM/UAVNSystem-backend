import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { getHashPassword } from 'src/utils/utils';

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

  async updateOne(id: number, { password, ...restData }: UpdateUserDto) {
    await this.prisma.userInfo.update({
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
    return 'success';
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
