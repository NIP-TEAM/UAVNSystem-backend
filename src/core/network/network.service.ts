import { Injectable } from '@nestjs/common';
import { CreateNetworkDto } from './dto/create-network.dto';
import { UpdateNetworkDto } from './dto/update-network.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetNetworkDto } from './dto/get-network.dto';
import { RemoveNetworkDto } from './dto/remove-network.dto';
import { formateFilter, formateOptions, formateSearchKey } from './utils';
import { JwtAuthReq } from 'src/utils/types';
import { ProtocolService } from '../protocol/protocol.service';

@Injectable()
export class NetworkService {
  constructor(private readonly prisma: PrismaService, private readonly protocolService: ProtocolService) { }

  async create(
    { id: creatorId, merchantId }: JwtAuthReq['user']['tenant'],
    createNetworkDto: CreateNetworkDto,
  ) {
    await this.prisma.network.create({
      data: {
        ...createNetworkDto,
        createAt: new Date().getTime().toString(),
        lastEdit: new Date().getTime().toString(),
        merchantId,
        creatorId,
      },
    });
    return 'success';
  }

  async findAll(
    merchantId: number,
    { pagination: { current, pageSize }, filter, selectKeys }: GetNetworkDto,
  ) {
    const {
      searchKey = '',
      filters = {},
      sorter = {},
    } = JSON.parse(filter || '{}');
    const where: Prisma.NetworkWhereInput = {
      AND: [
        {
          merchantId,
        },
        ...(formateFilter(filters) as Prisma.NetworkWhereInput[]),
        formateSearchKey(searchKey) as Prisma.NetworkWhereInput,
      ],
    };
    const [data, total] = await Promise.all([
      this.prisma.network.findMany({
        where,
        select: {
          id: true,
          name: true,
          _count: {
            select: { uavs: true },
          },
          ...formateOptions(selectKeys),
        },
        skip: (current - 1) * pageSize,
        take: +pageSize,
        orderBy: sorter,
      }),
      this.prisma.network.count({
        where,
      }),
    ]);

    return {
      data: data.map(({ _count: { uavs: uavCount = 0 }, ...rest }) => ({
        uavCount,
        ...rest,
      })),
      meta: {
        pagination: {
          total,
        },
      },
    };
  }

  async findOne(id: number) {
    const {
      _count: { uavs: uavCount = 0 },
      ...rest
    } = await this.prisma.network.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        name: true,
        creator: {
          select: {
            id: true,
            name: true
          }
        },
        uavs: true,
        protocol: { select: { name: true, id: true } },
        connectMap: true,
        createAt: true,
        status: true,
        _count: {
          select: { uavs: true },
        },
      },
    });

    return {
      data: {
        ...rest,
        uavCount,
      },
    };
  }

  async updateOne(id: number, updateNetworkDto: UpdateNetworkDto) {
    await this.prisma.network.update({
      where: { id },
      data: {
        ...updateNetworkDto,
        lastEdit: new Date().getTime().toString(),
      },
    });
    const { protocolId } = updateNetworkDto;
    if (protocolId) await this.protocolService.runScript(id)
  
    return 'success';
  }

  async remove({ ids }: RemoveNetworkDto) {
    await Promise.all([
      this.prisma.network.deleteMany({ where: { id: { in: ids } } }),
      this.prisma.uav.deleteMany({ where: { id: { in: ids } } }),
    ]);
    return 'success';
  }
}
