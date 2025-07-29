import React from 'react';

import ProductCard from '@/elements/product-card';

import type { ClassProps } from '@/types/common';
import { cn } from '@/lib/utils';
import { products } from '@/constants/common';
import ProductGroup from './product-group';

const Products: React.FC<ClassProps> = ({ className }) => {
  const GLOBAL_STATE_CATEGORY = 'all';

  return (
    <main className={cn('', className)}>
      <ProductGroup title={GLOBAL_STATE_CATEGORY}>
        {products.map(({ id, name, description, startPrice, image }) => (
          <ProductCard
            key={id}
            id={id}
            name={name}
            description={description}
            startPrice={startPrice}
            image={image}
          />
        ))}
      </ProductGroup>
      <ProductGroup title="meat">
        {products.map(({ id, name, description, startPrice, image }) => (
          <ProductCard
            key={id}
            id={id}
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
