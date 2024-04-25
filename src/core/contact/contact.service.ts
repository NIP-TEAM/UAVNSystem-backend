import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetContactDto } from './dto/get-contact.dto';
import { Prisma } from '@prisma/client';
import {
  formateContactListId,
  formateFilter,
  formateOptions,
  formateSearchKey,
} from './utils';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllContactList(merchantId: number) {
    const data = await this.prisma.contactList.findMany({
      where: {
        merchantId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return {
      data,
    };
  }

  async findOneContactList(id: number) {
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
        createAt: true,
        updateAt: true,
        networkInfo: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findAllContact(
    merchantId: number,
    contactListId: number,
    { pagination: { current, pageSize }, filter, selectKeys }: GetContactDto,
  ) {
    const {
      searchKey = '',
      filters = {},
      sorter = {},
    } = JSON.parse(filter || '{}');
    const where: Prisma.ContactWhereInput = {
      AND: [
        {
          merchantId,
        },
        ...(formateFilter(filters) as Prisma.ContactWhereInput[]),
        formateSearchKey(searchKey) as Prisma.ContactWhereInput,
        formateContactListId(contactListId) as Prisma.ContactWhereInput,
      ],
    };
    const [data, total] = await Promise.all([
      this.prisma.contact.findMany({
        where,
        select: {
          id: true,
          name: true,
          ...formateOptions(selectKeys),
        },
        skip: (current - 1) * pageSize,
        take: +pageSize,
        orderBy: sorter,
      }),
      this.prisma.contact.count({
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
}
