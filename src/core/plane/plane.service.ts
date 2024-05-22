import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateUavDto } from './dto/create-uav.dto';
import { formateFilter, formateSearchKey } from './utils';
import { GetUavDto } from './dto/get-uav.dto';

@Injectable()
export class PlaneService {
  constructor(private readonly prisma: PrismaService) {}

  async create(merchantId: number, creatorId: number, uavs: CreateUavDto[]) {
    await Promise.all(
      uavs.map(({ name, networkId, mac }, index) =>
        this.prisma.uav.create({
          data: {
            name: name || `network${networkId}uav${index}`,
            createAt: new Date().getTime().toString(),
            networkId,
            merchantId,
            creatorId,
            mac,
          },
        }),
      ),
    );
    return 'success';
  }

  async findAll(
    merchantId: number,
    { pagination: { current, pageSize }, filter }: GetUavDto,
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
    await this.prisma.uav.deleteMany({ where: { id: { in: ids } } });
    return 'success';
  }
}
