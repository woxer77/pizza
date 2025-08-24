import React from 'react';

import ProductCustomizer from '@/components/elements/product-customizer';

import { serializeData } from '@/helpers/utils';
import { getProductWithRelations } from '@/lib/products';
import { notFound } from 'next/navigation';
import { getSizes } from '@/lib/sizes';
import { getDoughTypes } from '@/lib/dough-types';

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
      <div className="flex items-start gap-10">
        <ProductCustomizer product={product} sizes={sizes} doughTypes={doughTypes} />
      </div>
    </div>
  );
};

export default ProductPage;
