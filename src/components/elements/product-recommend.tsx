import React from 'react';

import type { ClassProps } from '@/types/common';
import { cn } from '@/helpers/utils';
import ProductCard from './product-card';
import prisma from '@/prisma/prisma-client';

interface ProductRecommendProps extends ClassProps {
  limit?: number;
}

const ProductRecommend: React.FC<ProductRecommendProps> = async ({ className, limit = 4 }) => {
  const products = await prisma.product.findMany({
    // TODO: take products by current category
    take: limit
  });

  if (products.length <= 0) return null;

  return (
    <section className={cn('container mx-auto', className)}>
      <h3 className="mb-7 text-2xl font-bold">Recommendations</h3>
      <ul className="grid grid-cols-4 gap-5">
        {products.map(({ name, id, description, image, basePrice }) => (
          <ProductCard
            key={id}
            name={name}
            id={id}
            description={description}
            image={image}
            basePrice={basePrice}
          />
        ))}
      </ul>
    </section>
  );
};

export default ProductRecommend;
