import { Prisma } from '@prisma/client';

export const formateContactListId = (contactListId: number) => {
  switch (contactListId) {
    case -1:
      return {};
    case -2:
      return {
        contactListIds: { equals: [] },
      };

    default:
      return {
        contactListIds: {
          has: contactListId,
        },
      };
  }
};

export const formateFilter = ({
  creator,
  phone,
}): Prisma.ContactWhereInput[] => {
  const resultFilter = [];
  if (creator) {
    const { quantifier, content = [] } = creator;
    if (quantifier === 'is')
      resultFilter.push({
        OR: content.map((item: number) => ({ creatorId: item })),
      });
    else if (quantifier === 'isNot')
      resultFilter.push({
        AND: content.map((item: number) => ({ creatorId: { not: item } })),
      });
  }
  if (phone) {
    const { quantifier } = phone;
    if (quantifier === 'is')
      resultFilter.push({
        OR: [{ phone: null }, { phone: '' }],
      });
    else if (quantifier === 'isNot')
      resultFilter.push({
        AND: [{ phone: { not: null } }, { phone: { not: '' } }],
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
        email: true,
        phone: true,
        creator: {
          select: {
            id: true,
            name: true,
          },
        },
        updateAt: true,
      };
