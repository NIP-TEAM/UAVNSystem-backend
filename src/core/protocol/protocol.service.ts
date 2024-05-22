import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetProtocolDto } from './dto/get-protocol.dto';
import { formateFilter, formateSearchKey } from './utils';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProtocolService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(
    merchantId: number,
    { pagination: { current, pageSize }, filter, selectKeys }: GetProtocolDto,
  ) {
    const {
      searchKey = '',
      filters = {},
      sorter = {},
    } = JSON.parse(filter || '{}');
    const where: Prisma.ProtocolWhereInput = {
      AND: [
        {
          OR: [{ merchantId, }, { isDefault: true }]
        },
        ...(formateFilter(filters) as Prisma.ProtocolWhereInput[]),
        formateSearchKey(searchKey) as Prisma.ProtocolWhereInput,
      ],
    };
    const [data, total] = await Promise.all([
      this.prisma.protocol.findMany({
        where,
        select: {
          id: true,
          name: true,
          networks: {
            select: {
              name: true,
              id: true,
            }
          },
          creator: {
            select: {
              name: true,
              id: true,
            }
          },
          updateAt: true,
          createAt: true,
          isDefault: true,
        },
        skip: (current - 1) * pageSize,
        take: +pageSize,
        orderBy: sorter,
      }),
      this.prisma.protocol.count({
        where,
      }),
    ]);

    return {
      data,
      pagination: { total }
    }
  }

  async findOne(id: number) {
    return await this.prisma.protocol.findUniqueOrThrow({
      where: { id },
    });
  }

  async deleteOne(id: number) {
    await this.prisma.protocol.delete({
      where: { id },
    });
    return 'success';
  }
}
