import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const protocolName = ['AODV', 'DSR', 'OLSR', 'GPSR', 'DSDV'];

async function main() {
  await prisma.protocol.createMany({
    data: protocolName.map((name) => ({
      name,
      isDefault: true,
      createAt: new Date().getTime().toString(),
      updateAt: new Date().getTime().toString(),
      script: name,
    })),
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
