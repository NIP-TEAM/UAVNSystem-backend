import { Prisma } from '@prisma/client';
import * as ping from 'ping';

export const formateFilter = ({
  creator,
  onSchedule,
}): Prisma.EmailWhereInput[] => {
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
  if (onSchedule) {
    const { quantifier, content = [] } = onSchedule;
    if (quantifier === 'is')
      resultFilter.push({
        OR: content.map((item: number) => ({ onSchedule: { equals: item } })),
      });
    else if (quantifier === 'isNot')
      resultFilter.push({
        AND: content.map((item: number) => ({ onSchedule: { not: item } })),
      });
  }

  return resultFilter;
};

export const formateSearchKey = (searchKey: string): Prisma.EmailWhereInput =>
  searchKey
    ? {
        OR: ['name', 'createAt', 'updateAt'].map((name) => ({
          [name]: { contains: searchKey, mode: 'insensitive' },
        })),
      }
    : {};

// export const formateOptions = (optionKeys: string): Prisma.EmailSelect =>
//   optionKeys
//     ? JSON.parse(optionKeys || '[]').reduce(
//         (acc: Record<string, boolean>, currentValue: string) => {
//           acc[currentValue] = true;
//           return acc;
//         },
//         {},
//       )
//     : {
//         onSchedule: true,
//         createAt: true,
//         creator: {
//           select: {
//             id: true,
//             name: true,
//           },
//         },
//       };

export const compareResult = (
  quantifier: number,
  target: number,
  value: number,
) => {
  switch (quantifier) {
    case 1:
      return value < target;
    case 2:
      return value === target;
    case 3:
      return value > target;

    default:
      return false;
  }
};

export const excutePingIp = async (ip: string | undefined) => {
  if (!ip) return false;
  try {
    return (await ping.promise.probe(ip, { timeout: 10 })).alive;
  } catch {
    return false;
  }
};
