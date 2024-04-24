import { Prisma } from '@prisma/client';

export const formateSearchKey = (
  searchKey: string,
): Prisma.ContactListWhereInput =>
  searchKey
    ? {
        OR: ['name', 'createAt', 'updateAt'].map((name) => ({
          [name]: { contains: searchKey, mode: 'insensitive' },
        })),
      }
    : {};
