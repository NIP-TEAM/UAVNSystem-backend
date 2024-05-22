import { Prisma } from "@prisma/client";

export const formateFilter = ({
  creator,
  defualt,
}): Prisma.ProtocolWhereInput[] => {
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
  if (defualt) {
    const { quantifier, content = [] } = defualt;
    if (quantifier === 'is')
      resultFilter.push({
        OR: content.map((item: number) => ({ isDefualt: item === 1 ? true : false })),
      });
    else if (quantifier === 'isNot')
      resultFilter.push({
        AND: content.map((item: number) => ({ isDefualt: { not: item === 1 ? true : false } })),
      });
  }

  return resultFilter;
};

export const formateSearchKey = (
  searchKey: string,
): Prisma.ProtocolWhereInput =>
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
      isDefualt: true,
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
