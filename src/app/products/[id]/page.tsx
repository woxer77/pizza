import React from 'react';

import Image from 'next/image';

import ProductCustomizer from '@/components/elements/product-customizer';
import { serializeData } from '@/helpers/utils';
import { getProductWithRelations } from '@/lib/products';

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const { id } = await params;

  const productRaw = await getProductWithRelations(parseInt(id));

  if (!productRaw) return <div>Product not found.</div>;

  const product = serializeData(productRaw);

  return (
    <div className="container mx-auto">
      <div className="my-10 text-sm">breadcrumbs {product.basePrice}</div>
      <div className="flex items-start gap-10">
        <Image src={product.image} alt={product.name} width={400} height={400} />
        <ProductCustomizer product={product} />
      </div>
    </div>
  );
};

export default ProductPage;
