import prisma from '@/prisma/prisma-client';

const getCategories = async () => {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          variations: true
        }
      }
    }
  });
  return categories;
};

export { getCategories };
