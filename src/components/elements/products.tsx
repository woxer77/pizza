import React from 'react';

import ProductCard from '@/elements/product-card';
import ProductGroup from '@/elements/product-group';

import type { ClassProps } from '@/types/common';
import { cn } from '@/lib/utils';
import type { CategoryWithProducts } from '@/shared/types/category.interface';

interface ProductsProps extends ClassProps {
  categories: CategoryWithProducts[];
}

const Products: React.FC<ProductsProps> = ({ className, categories }) => {
  return (
    <main className={cn('', className)}>
      {categories
        .filter((category) => category.products.length > 0)
        .map((category) => {
          return (
            <ProductGroup key={category.id} title={category.name} categoryId={category.id}>
              {category.products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  basePrice={product.basePrice}
                  image={product.image}
                />
              ))}
            </ProductGroup>
          );
        })}
    </main>
  );
};

export default Products;
