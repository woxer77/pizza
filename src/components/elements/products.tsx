import React from 'react';

import ProductCard from '@/elements/product-card';
import ProductGroup from '@/elements/product-group';

import type { ClassProps } from '@/types/common';
import { cn } from '@/lib/utils';
import { products } from '@/constants/common';
import { TEMP_CATEGORIES } from '@/constants/common';

const Products: React.FC<ClassProps> = ({ className }) => {
  return (
    <main className={cn('', className)}>
      <ProductGroup title={TEMP_CATEGORIES[0].name} categoryId={TEMP_CATEGORIES[0].id}>
        {products
          .filter((e) => e.categoryId === TEMP_CATEGORIES[0].id)
          .map(({ id, categoryId, name, description, startPrice, image }) => (
            <ProductCard
              key={id}
              id={id}
              categoryId={categoryId}
              name={name}
              description={description}
              startPrice={startPrice}
              image={image}
            />
          ))}
      </ProductGroup>
      <ProductGroup title={TEMP_CATEGORIES[7].name} categoryId={TEMP_CATEGORIES[7].id}>
        {products
          .filter((e) => e.categoryId === TEMP_CATEGORIES[7].id)
          .map(({ id, categoryId, name, description, startPrice, image }) => (
            <ProductCard
              key={id}
              id={id}
              categoryId={categoryId}
              name={name}
              description={description}
              startPrice={startPrice}
              image={image}
            />
          ))}
      </ProductGroup>
    </main>
  );
};

export default Products;
