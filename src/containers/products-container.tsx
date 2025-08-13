import React from 'react';

import Products from '@/components/elements/products';

import prisma from '@/prisma/prisma-client';

const ProductsContainer: React.FC = async () => {
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

  return <Products categories={categories} />;
};

export default ProductsContainer;
