export const formateFilter = ({ creator, status }) => {
  const resultFilter = [];
  if (creator) {
    const { quantifier, content } = creator;
    if (quantifier === 'is') resultFilter.push({ userInfoId: content });
    else if (quantifier === 'isNot')
      resultFilter.push({ userInfoId: { not: content } });
  }
  if (status) {
    const { quantifier, content } = status;
    if (quantifier === 'is') resultFilter.push({ status: content });
    else if (quantifier === 'isNot')
      resultFilter.push({ status: { not: content } });
  }
  return resultFilter;
};

export const formateSearchKey = (searchKey: string) =>
  searchKey
    ? {
        OR: ['name', 'createAt', 'lastEdit'].map((name) => ({
          [name]: { contains: searchKey, mode: 'insensitive' },
        })),
      }
    : {};
