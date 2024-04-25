import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetContactDto, GetContactListDto } from './dto/get-contact.dto';
import { Prisma } from '@prisma/client';
import {
  formateContactListId,
  formateOptions,
  formateSearchKey,
} from './utils';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllContactList(
    merchantId: number,
    { creatorIds = '', searchKey = '' }: GetContactListDto,
  ) {
    const where: Prisma.ContactListWhereInput = {
      AND: [
        {
          merchantId,
        },
        {
          OR: JSON.parse(creatorIds || '[]').map((creatorId: number) => ({
            creatorId,
          })),
        },
        formateSearchKey(searchKey) as Prisma.ContactListWhereInput,
      ],
    };
    const data = await this.prisma.contactList.findMany({
      where,
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
    {
      pagination: { pageSize, current },
      searchKey = '',
      selectKeys = '',
      creator = 0,
      sorter = {},
    }: GetContactDto,
  ) {
    const where: Prisma.ContactWhereInput = {
      AND: [
        {
          merchantId,
          ...(creator ? { creatorId: creator } : {}),
        },
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
