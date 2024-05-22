export const formateCategory = (category: number) =>
  category === 1
    ? { isDefault: { equals: true } }
    : { idDefault: { not: true } };
