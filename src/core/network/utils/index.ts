export const formateFilter = ({ creator, status }) => {
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

export const formateSearchKey = (searchKey: string) =>
  searchKey
    ? {
        OR: ['name', 'createAt', 'lastEdit'].map((name) => ({
          [name]: { contains: searchKey, mode: 'insensitive' },
        })),
      }
    : {};
