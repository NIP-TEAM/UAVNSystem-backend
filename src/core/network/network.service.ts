import { Injectable } from '@nestjs/common';
import { CreateNetworkDto } from './dto/create-network.dto';
import { UpdateNetworkDto } from './dto/update-network.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetNetworkDto } from './dto/get-network.dto';
import { RemoveNetworkDto } from './dto/remove-network.dto';
import { formateFilter, formateSearchKey } from './utils';

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
    { pagination: { current, pageSize }, filter }: GetNetworkDto,
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
        include: {
          creator: true,
          uavs: true,
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
      data: data.map(({ uavs, creator: { id, name }, ...rest }) => ({
        ...rest,
        uavCount: uavs.length,
        creator: {
          id,
          name,
        },
      })),
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

  async update(id: number, updateNetworkDto: UpdateNetworkDto) {
    await this.prisma.network.update({
      where: { id },
      data: {
        ...updateNetworkDto,
        lastEdit: new Date().getTime().toString(),
      },
    });
    return 'success';
  }

  async remove({ ids }: RemoveNetworkDto) {
    await Promise.all(
      ids.map((id) =>
        Promise.all([
          this.prisma.network.delete({ where: { id } }),
          this.prisma.uav.deleteMany({ where: { networkId: id } }),
        ]),
      ),
    );
    return 'success';
  }
}
