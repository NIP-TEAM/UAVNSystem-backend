import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetContactListDto } from './dto/get-contact.dto';
import { Prisma } from '@prisma/client';
import { formateFilter, formateOptions, formateSearchKey } from './utils';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    merchantId: number,
    {
      pagination: { current, pageSize },
      filter,
      selectKeys,
    }: GetContactListDto,
  ) {
    const {
      searchKey = '',
      filters = {},
      sorter = {},
    } = JSON.parse(filter || '{}');
    const where: Prisma.ContactListWhereInput = {
      AND: [
        {
          merchantId,
        },
        ...(formateFilter(filters) as Prisma.ContactListWhereInput[]),
        formateSearchKey(searchKey) as Prisma.ContactListWhereInput,
      ],
    };
    const [data, total] = await Promise.all([
      this.prisma.contactList.findMany({
        where,
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              networkInfo: true,
              contactInfo: true,
            },
          },
          ...formateOptions(selectKeys),
        },
        skip: (current - 1) * pageSize,
        take: +pageSize,
        orderBy: sorter,
      }),
      this.prisma.contactList.count({
        where,
      }),
    ]);

    return {
      data,
      meta: {
        pagination: {
          total,
        },
      },
    };
  }

  async findOne(id: number) {
    return await this.prisma.contactList.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        name: true,
        creator: {
          select: {
            id: true,
            name: true,
          },
        },
        networkInfo: true,
        createAt: true,
        updateAt: true,
      },
    });
  }
}
