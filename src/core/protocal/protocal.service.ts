import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetProtocalDto } from './dto/get-protocal.dto';
import { formateCategory } from './utils';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProtocalService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    merchantId: number,
    { pagination: { current, pageSize }, category }: GetProtocalDto,
  ) {
    const where: Prisma.ProtocolWhereInput = {
      merchantId,
      ...formateCategory(category),
    };
    const [data, total] = await Promise.all([
      this.prisma.protocol.findMany({
        where,
        skip: (current - 1) * pageSize,
        take: +pageSize,
        include: {
          networks: true,
          creator: true,
        },
      }),
      this.prisma.protocol.count({
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
