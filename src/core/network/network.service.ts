import { Injectable } from '@nestjs/common';
import { CreateNetworkDto } from './dto/create-network.dto';
import { UpdateNetworkDto } from './dto/update-network.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindNetworkDto } from './dto/find-network.dto';
import { RemoveNetworkDto } from './dto/remove-network.dto';

@Injectable()
export class NetworkService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userInfoId: number, createNetworkDto: CreateNetworkDto) {
    const userInfo = await this.prisma.userInfo.findUniqueOrThrow({
      where: { id: userInfoId },
    });
    const { merchantId, id } = userInfo;
    await this.prisma.network.create({
      data: {
        ...createNetworkDto,
        createAt: new Date().getTime().toString(),
        lastEdit: new Date().getTime().toString(),
        merchantId,
        userInfoId: id,
      },
    });
    return 'success';
  }

  async findAll(
    merchantId: number,
    { pagination: { current, pageSize }, filter }: FindNetworkDto,
  ) {
    const where: Prisma.NetworkWhereInput = {
      AND: [
        {
          merchantId,
        },
      ],
    };
    const [email, total] = await Promise.all([
      this.prisma.network.findMany({
        where,
        include: {
          creator: true,
        },
        skip: (current - 1) * pageSize,
        take: +pageSize,
      }),
      this.prisma.network.count({
        where,
      }),
    ]);

    return {
      data: email,
      meta: {
        pagination: {
          total,
        },
      },
    };
  }

  async findOne(id: number) {
    return await this.prisma.network.findUniqueOrThrow({
      where: { id },
      include: {
        creator: true,
        uavs: true,
      },
    });
  }

  update(id: number, updateNetworkDto: UpdateNetworkDto) {
    return `This action updates a #${id} network`;
  }

  async remove({ ids }: RemoveNetworkDto) {
    await Promise.all(
      ids.map((id) => this.prisma.network.delete({ where: { id } })),
    );
    return 'success';
  }
}
