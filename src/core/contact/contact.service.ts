import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetContactListDto } from './dto/get-contact.dto';
import { Prisma } from '@prisma/client';
import { formateSearchKey } from './utils';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    merchantId: number,
    { searchKey = '', creatorId = 0 }: GetContactListDto,
  ) {
    const where: Prisma.ContactListWhereInput = {
      AND: [
        {
          merchantId,
        },
        { ...(creatorId ? { creatorId } : {}) },
        formateSearchKey(searchKey) as Prisma.ContactListWhereInput,
      ],
    };
    const [data, total] = await Promise.all([
      this.prisma.contactList.findMany({
        where,
        select: {
          id: true,
          name: true,
          contactInfo: true,
        },
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
}
