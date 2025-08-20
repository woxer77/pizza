import prisma from '@/prisma/prisma-client';
import type { CategoryWithProducts } from '@/shared/types/category.interface';

const getCategories = async () => {
  const categories: CategoryWithProducts[] = await prisma.category.findMany({
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
