import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateNetworkDto } from './dto/create-network.dto';
import { UpdateNetworkDto } from './dto/update-network.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NetworkService {
  constructor(private readonly prisma: PrismaService) {}

  create(userInfoId, createNetworkDto: CreateNetworkDto) {
    return 'This action adds a new network';
  }

  async findAll(merchantId: number) {
    const where: Prisma.NetworkWhereInput = {
      merchantId,
    };
    const [email, total] = await Promise.all([
      this.prisma.network.findMany({
        where,
        include: {
          creator: true,
        },
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

  findOne(id: number) {
    return `This action returns a #${id} network`;
  }

  update(id: number, updateNetworkDto: UpdateNetworkDto) {
    return `This action updates a #${id} network`;
  }

  remove(id: number) {
    return `This action removes a #${id} network`;
  }
}
