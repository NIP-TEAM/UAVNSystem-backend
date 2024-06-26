import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetContactDto } from './dto/get-contact.dto';
import { Prisma } from '@prisma/client';
import {
  formateContactListId,
  formateFilter,
  formateOptions,
  formateSearchKey,
} from './utils';
import { JwtAuthReq } from 'src/utils/types';
import {
  CreateContactDto,
  CreateContactListDto,
} from './dto/create-contact.dto';
import {
  UpdateContactDto,
  UpdateContactListDto,
} from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async findContactDetail(id: number) {
    const data = await this.prisma.contact.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return {
      data,
    };
  }

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

  async createNewContactList(
    { merchantId, id: creatorId }: JwtAuthReq['user']['tenant'],
    { name }: CreateContactListDto,
  ) {
    const check = await this.prisma.contactList.findFirst({ where: { name } });
    if (check)
      throw new BadRequestException(
        JSON.stringify({
          en: 'This contact list is existed!',
          zh: '联系组名字重复!',
        }),
      );
    await this.prisma.contactList.create({
      data: {
        merchantId,
        name,
        createAt: new Date().getTime().toString(),
        creatorId,
        updateAt: new Date().getTime().toString(),
      },
    });

    return 'success';
  }

  async updateContactListInfo(id: number, data: UpdateContactListDto) {
    await this.prisma.contactList.update({
      where: { id },
      data: {
        ...data,
        updateAt: new Date().getTime().toLocaleString(),
      },
    });
    return 'success';
  }

  async updateContactInfo(id: number, data: UpdateContactDto) {
    await this.prisma.contact.update({
      where: { id },
      data: {
        ...data,
        updateAt: new Date().getTime().toString(),
      },
    });
    return 'success';
  }

  async createNewContacts(
    { merchantId, id: creatorId }: JwtAuthReq['user']['tenant'],
    contacts: CreateContactDto[],
  ) {
    await this.prisma.contact.createMany({
      data: contacts.map(
        ({
          name = `New contact ${new Date().getTime()}`,
          contactListIds = [],
          ...restField
        }) => ({
          name,
          contactListIds,
          creatorId,
          merchantId,
          createAt: new Date().getTime().toString(),
          updateAt: new Date().getTime().toString(),
          ...restField,
        }),
      ),
    });

    return 'success';
  }

  async findManyContact(merchantId: number, ids: string) {
    const idsArray = JSON.parse(ids || '[]');
    const data = await this.prisma.contact.findMany({
      where: {
        merchantId,
        id: { in: idsArray },
      },
    });
    return {
      data,
    };
  }
}
