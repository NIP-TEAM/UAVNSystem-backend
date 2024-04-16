import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetNetworkDto } from '../network/dto/get-network.dto';
import { Prisma } from '@prisma/client';
import { CreateUavDto } from './dto/create-uav.dto';
import { formateFilter, formateSearchKey } from './utils';

@Injectable()
export class PlaneService {
  constructor(private readonly prisma: PrismaService) {}

  async create(merchantId: number, creatorId: number, uavs: CreateUavDto[]) {
    await Promise.all(
      uavs.map(({ name, networkId }, index) =>
        this.prisma.uav.create({
          data: {
            name: name || `network${networkId}uav${index}`,
            createAt: new Date().getTime().toString(),
            networkId,
            merchantId,
            creatorId,
          },
        }),
      ),
    );
    return 'success';
  }

  async findAll(
    merchantId: number,
    { pagination: { current, pageSize }, filter }: GetNetworkDto,
  ) {
    const {
      searchKey = '',
      filters = {},
      sorter = {},
    } = JSON.parse(filter || '{}');
    const where: Prisma.UavWhereInput = {
      AND: [
        {
          merchantId,
        },
        ...formateFilter(filters),
        formateSearchKey(searchKey),
      ],
    };
    const [data, total] = await Promise.all([
      this.prisma.uav.findMany({
        where,
        skip: (current - 1) * pageSize,
        take: +pageSize,
        orderBy: sorter,
        include: {
          networkInfo: true,
          creatorInfo: true,
        },
      }),
      this.prisma.uav.count({
        where,
      }),
    ]);
    return {
      data,
      meta: {
        pagination: { total },
      },
    };
  }

  async deleteOne(id: number) {
    await this.prisma.uav.delete({
      where: {
        id,
      },
    });
    return 'success';
  }

  async deleteMany(ids: number[]) {
    await Promise.all(ids.map((id) => this.deleteOne(+id)));
    return 'success';
  }
}
