import prisma from '@/prisma/prisma-client';

const getProductWithRelations = async (id: number) => {
  return await prisma.product.findUnique({
    where: { id },
    include: {
      ingredients: true,
      variations: {
        include: {
          size: true,
          doughType: true
        }
      }
    }
  });
};

export { getProductWithRelations };
