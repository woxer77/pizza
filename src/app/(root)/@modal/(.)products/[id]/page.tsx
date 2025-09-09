import ProductModal from '@/components/elements/product-modal';
import { notFound } from 'next/navigation';

import type { ProductPageProps } from '@/shared/types/common';
import { getProductWithRelations } from '@/services/db/products';
import { serializeData } from '@/helpers/utils';
import { getSizes } from '@/services/db/sizes';
import { getDoughTypes } from '@/services/db/dough-types';

const ModalProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const { id } = await params;

  if (isNaN(parseInt(id))) return notFound();

  const productRaw = await getProductWithRelations(Number(id));

  if (!productRaw) return notFound();

  const product = serializeData(productRaw);
  const sizes = serializeData(await getSizes());
  const doughTypes = serializeData(await getDoughTypes());

  return <ProductModal product={product} sizes={sizes} doughTypes={doughTypes} />;
};

export default ModalProductPage;
