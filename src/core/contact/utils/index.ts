import { Prisma } from '@prisma/client';

export const formateFilter = ({ creator }): Prisma.ContactListWhereInput[] => {
  const resultFilter = [] as Prisma.ContactListWhereInput[];
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

export const formateOptions = (optionKeys: string): Prisma.ContactListSelect =>
  optionKeys
    ? JSON.parse(optionKeys || '[]').reduce(
        (acc: Record<string, boolean>, currentValue: string) => {
          acc[currentValue] = true;
          return acc;
        },
        {},
      )
    : {
        status: true,
        createAt: true,
        creator: {
          select: {
            id: true,
            name: true,
          },
        },
        updateAt: true,
      };
