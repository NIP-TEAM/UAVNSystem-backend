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

export const formateFilter = ({ creator }): Prisma.NetworkWhereInput[] => {
  const resultFilter = [];
  if (creator) {
    const { quantifier, content = [] } = creator;
    if (quantifier === 'is')
      resultFilter.push({
        OR: content.map((item: number) => ({ userInfoId: item })),
      });
    else if (quantifier === 'isNot')
      resultFilter.push({
        AND: content.map((item: number) => ({ userInfoId: { not: item } })),
      });
  }

  return resultFilter;
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
