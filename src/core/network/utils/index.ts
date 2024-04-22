import { Prisma } from '@prisma/client';

export const formateFilter = ({
  creator,
  status,
  uavs,
  connectMap,
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
  if (uavs) {
    const { quantifier, content = [] } = uavs;
    if (quantifier === 'is')
      resultFilter.push({
        OR: content.map((item: string) => {
          if (item === 'empty') return { uavs: { none: {} } };
        }),
      });
    else if (quantifier === 'isNot')
      resultFilter.push({
        AND: content.map((item: string) => {
          if (item === 'empty') return { uavs: { some: {} } };
        }),
      });
  }
  if (connectMap) {
    const { quantifier, content = [] } = connectMap;
    if (quantifier === 'is')
      resultFilter.push({
        OR: content.map((item: string) => {
          if (item === 'empty')
            return {
              OR: [
                { connectMap: { equals: Prisma.AnyNull } },
                { connectMap: { equals: [''] } },
              ],
            };
          else return {};
        }),
      });
    else if (quantifier === 'isNot')
      resultFilter.push({
        AND: content.map((item: string) => {
          if (item === 'empty')
            return {
              AND: [
                { connectMap: { not: Prisma.AnyNull } },
                { connectMap: { not: { equals: [''] } } },
              ],
            };
          else return {};
        }),
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
