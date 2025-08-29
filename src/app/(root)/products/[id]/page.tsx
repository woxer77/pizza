import React from 'react';

import PizzaCustomizer from '@/components/elements/pizza-customizer';

import { serializeData } from '@/helpers/utils';
import { getProductWithRelations } from '@/lib/products';
import { notFound } from 'next/navigation';
import { getSizes } from '@/lib/sizes';
import { getDoughTypes } from '@/lib/dough-types';
import ProductCustomizer from '@/components/elements/product-customizer';
import type { ProductPageProps } from '@/shared/types/common';

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const { id } = await params;

  if (isNaN(parseInt(id))) return notFound();

  const productRaw = await getProductWithRelations(parseInt(id));

  if (!productRaw) return notFound();

  const product = serializeData(productRaw);
  const sizes = serializeData(await getSizes());
  const doughTypes = serializeData(await getDoughTypes());

  return (
    <div className="container mx-auto">
      {product.variations[0].size ? (
        <PizzaCustomizer product={product} sizes={sizes} doughTypes={doughTypes} />
      ) : (
        <ProductCustomizer product={product} />
      )}
    </div>
  );
};

export default ProductPage;
