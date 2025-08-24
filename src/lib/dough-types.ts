import prisma from '@/prisma/prisma-client';

const getDoughTypes = async () => {
  const doughTypes = await prisma.doughType.findMany();

  return doughTypes;
};

export { getDoughTypes };
