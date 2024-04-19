import { Prisma } from '@prisma/client';

export const formateFilter = ({
  creator,
  status,
}): Prisma.NetworkWhereInput[] => {
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
  if (status) {
    const { quantifier, content = [] } = status;
    if (quantifier === 'is')
      resultFilter.push({
        OR: content.map((item: number) => ({ status: item })),
      });
    else if (quantifier === 'isNot')
      resultFilter.push({
        AND: content.map((item: number) => ({ status: { not: item } })),
      });
  }
  return resultFilter;
};

export const formateSearchKey = (
  searchKey: string,
): Prisma.NetworkWhereInput =>
  searchKey
    ? {
        OR: ['name', 'createAt', 'lastEdit'].map((name) => ({
          [name]: { contains: searchKey, mode: 'insensitive' },
        })),
      }
    : {};

export const formateOptions = (optionKeys: string): Prisma.NetworkSelect =>
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
        lastEdit: true,
        protocol: true,
      };
