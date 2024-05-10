import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getOverviewData(merchantId: number) {
    const countDataPromises = [
      'uav',
      'network',
      'userInfo',
      'protocol',
      'contact',
    ].map((item) => this.prisma[item].count({ where: { merchantId } }));
    const creatorsPromise = this.prisma.userInfo.findMany({
      where: { merchantId },
      take: 3,
      select: {
        id: true,
        name: true,
        active: true,
        lastLogin: true,
        email: true,
      },
      orderBy: {
        lastLogin: 'desc',
      },
    });
    const networkStructuresPromise = this.prisma.network.findMany({
      where: {
        merchantId,
        uavs: { some: {} },
        AND: [
          { connectMap: { not: Prisma.AnyNull } },
          { connectMap: { not: { equals: [''] } } },
        ],
      },
      select: {
        id: true,
        name: true,
        uavs: true,
        connectMap: true,
      },
      take: 8,
    });

    const [
      [uavCount, networkCount, creatorCount, protocolCount, contactCount],
      creators,
      networkStructures,
    ] = await Promise.all([
      Promise.all(countDataPromises),
      creatorsPromise,
      networkStructuresPromise,
    ]);

    return {
      data: {
        countData: {
          uavCount,
          networkCount,
          creatorCount,
          protocolCount,
          contactCount,
        },
        creators,
        networkStructures,
      },
    };
  }
}
