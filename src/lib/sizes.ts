import prisma from '@/prisma/prisma-client';

const getSizes = async () => {
  const sizes = await prisma.size.findMany();

  return sizes;
};

export { getSizes };
