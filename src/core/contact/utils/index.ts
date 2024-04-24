import { Prisma } from '@prisma/client';

export const formateContactListId = (contactListId: number) => {
  switch (contactListId) {
    case -2:
      return {};
    case -1:
      return {
        OR: [
          {
            contactListIds: { isEmpty: true },
          },
          {
            contactListIds: { equals: [] },
          },
        ],
      };

    default:
      return {
        contactListIds: {
          has: contactListId,
        },
      };
  }
};

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

export const formateOptions = (optionKeys: string): Prisma.ContactSelect =>
  optionKeys
    ? JSON.parse(optionKeys || '[]').reduce(
        (acc: Record<string, boolean>, currentValue: string) => {
          acc[currentValue] = true;
          return acc;
        },
        {},
      )
    : {
        createAt: true,
        creator: {
          select: {
            id: true,
            name: true,
          },
        },
        updateAt: true,
      };
