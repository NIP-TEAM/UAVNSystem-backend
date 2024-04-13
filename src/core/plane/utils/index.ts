export const formateFilter = ({ networkId, status }) => {
  const resultFilter = [];
  if (networkId) {
    const { quantifier, content = [] } = networkId;
    if (quantifier === 'is')
      resultFilter.push({
        OR: content.map((item: string) => ({ userInfoId: item })),
      });
    else if (quantifier === 'isNot')
      resultFilter.push({
        AND: content.map((item: string) => ({ networkId: { not: item } })),
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
        AND: content.map((item: number) => ({
          status: {
            not: item,
          },
        })),
      });
  }
  return resultFilter;
};

export const formateSearchKey = (searchKey: string) =>
  searchKey
    ? {
        OR: ['name', 'createAt'].map((name) => ({
          [name]: { contains: searchKey, mode: 'insensitive' },
        })),
      }
    : {};

// model Uav {
//     id            Int     @id @default(autoincrement())
//     name          String  @db.VarChar(255)
//     networkInfo   Network @relation(fields: [networkId], references: [id])
//     networkId     Int
//     uploadSpeed   Float   @default(0.0)
//     downloadSpeed Float   @default(0.0)
//     status        Int     @default(1)
//     merchantId    Int
//     createAt      String  @db.VarChar(255)
//   }
