import React from 'react';

import PizzaCustomizer from '@/components/elements/pizza-customizer';

import { serializeData } from '@/helpers/utils';
import { getProductWithRelations } from '@/lib/products';
import { notFound } from 'next/navigation';
import { getSizes } from '@/lib/sizes';
import { getDoughTypes } from '@/lib/dough-types';
import ProductCustomizer from '@/components/elements/product-customizer';

interface ProductPageProps {
  params: {
    id: string;
  };
}

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
      <div className="my-10 text-sm">breadcrumbs {product.basePrice}</div>
      {product.variations[0].size ? (
        <PizzaCustomizer product={product} sizes={sizes} doughTypes={doughTypes} />
      ) : (
        <ProductCustomizer product={product} />
      )}
    </div>
  );
};

export default ProductPage;
