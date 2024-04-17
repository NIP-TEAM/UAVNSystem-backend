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
    const where: Prisma.ProtocalWhereInput = {
      merchantId,
      ...formateCategory(category),
    };
    const [data, total] = await Promise.all([
      this.prisma.protocal.findMany({
        where,
        skip: (current - 1) * pageSize,
        take: +pageSize,
        include: {
          networks: true,
          creator: true,
        },
      }),
      this.prisma.protocal.count({
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
    return await this.prisma.protocal.findUniqueOrThrow({
      where: { id },
    });
  }

  async deleteOne(id: number) {
    await this.prisma.protocal.delete({
      where: { id },
    });
    return 'success';
  }
}
