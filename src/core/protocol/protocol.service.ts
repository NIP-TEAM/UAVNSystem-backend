import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetProtocolDto } from './dto/get-protocol.dto';
import { formateFilter, formateSearchKey } from './utils';
import { Prisma } from '@prisma/client';
import { shuffle } from 'lodash';

@Injectable()
export class ProtocolService {
  constructor(private readonly prisma: PrismaService) { }

  private readonly logger = new Logger(ProtocolService.name)

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

  async runScript(id: number) {
    const { uavs, protocol: { id: protocolId, name } } = await this.prisma.network.findUniqueOrThrow({
      where: { id },
      select: {
        uavs: true,
        protocol: true
      }
    })
    this.logger.log('change protocol to ' + name)

    const ids = [0, ...uavs.map(({ id }) => id)]

    const connectMap = []

    ids.forEach((id: number) => {
      const random1 = shuffle(ids.filter(item => item !== id))[0]
      connectMap.push([id, random1])
      if (id && Math.random() < 0.5) {
        const random2 = shuffle(ids.filter(item => item !== id && item !== random1))[0]
        connectMap.push([id, random2])
        if (Math.random() < 0.5) {
          connectMap.push([id, shuffle(ids.filter(item => item !== id && item !== random1 && item !== random2))[0]])
        }
      }
    })

    await this.prisma.network.update({
      where: { id },
      data: {
        connectMap,
        lastEdit: new Date().getTime().toString(),
        status: 2
      }
    })
  }
}
