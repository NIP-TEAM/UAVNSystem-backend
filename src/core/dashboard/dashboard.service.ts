import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) { }

  async getOverviewData(merchantId: number) {
    const countKeyData: ReadonlyArray<string> = [
      'uav',
      'network',
      'userInfo',
      'protocol',
      'email',
      'contact',
    ];
    const countDataPromises = countKeyData.map((item) =>
      this.prisma[item].count({ where: { OR: [{ merchantId }, (item === 'protocol' ? { isDefault: true } : {})] } }),
    );
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

    const [countResult, creators, networkStructures] = await Promise.all([
      Promise.all(countDataPromises),
      creatorsPromise,
      networkStructuresPromise,
    ]);

    return {
      data: {
        countData: countKeyData.reduce((prev, current, index) => {
          prev[current + 'Count'] = countResult?.[index] || 0;
          return prev;
        }, {}),
        creators,
        networkStructures,
      },
    };
  }
}
