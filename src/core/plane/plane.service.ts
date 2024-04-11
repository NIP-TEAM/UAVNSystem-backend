import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetNetworkDto } from '../network/dto/get-network.dto';
import { Prisma } from '@prisma/client';
import { omit } from 'lodash';
import { CreateUavDto } from './dto/create-uav.dto';

// export type UavDataType = {
//     id: string;
//     name: string;
//     uploadSpeed: number;
//     downloadSpeed: number;
//     netWorkId: number;
//   }

@Injectable()
export class PlaneService {
  constructor(private readonly prisma: PrismaService) {}

  async createOne(merchantId: number, data: CreateUavDto) {
    
  }

  async findAll(
    merchantId: number,
    { pagination: { current, pageSize }, filter }: GetNetworkDto,
  ) {
    const where: Prisma.UavWhereInput = {
      AND: [
        {
          merchantId,
        },
      ],
    };
    const {
      searchKey = '',
      filters = {},
      sorter = {},
    } = JSON.parse(filter || '{}');
    const [data, total] = await Promise.all([
      this.prisma.uav.findMany({
        where,
        skip: (current - 1) * pageSize,
        take: +pageSize,
        orderBy: sorter,
      }),
      this.prisma.uav.count({
        where,
      }),
    ]);
    return {
      data: data.map((item) => omit(item, 'merchantId')),
      meta: {
        pagination: { total },
      },
    };
  }
}
