import React from 'react';

import ProductCard from '@/elements/product-card';
import ProductGroup from '@/elements/product-group';

import { groupProductsByCategory } from '@/lib/utils';
import type { ClassProps, IProduct } from '@/types/common';
import { cn } from '@/lib/utils';

interface ProductsProps extends ClassProps {
  products: IProduct[];
}

const Products: React.FC<ProductsProps> = ({ className, products }) => {
  const groupedProducts = React.useMemo(() => groupProductsByCategory(products), [products]);

  return (
    <main className={cn('', className)}>
      {groupedProducts.map((productsArr) => {
        return (
          <ProductGroup
            key={productsArr[0].category.id}
            title={productsArr[0].category.name}
            categoryId={productsArr[0].category.id}>
            {productsArr.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                category={product.category}
                name={product.name}
                description={product.description}
                startPrice={product.startPrice}
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
