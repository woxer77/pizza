'use client';

import React from 'react';

import { Dialog, DialogContent } from '@/ui/dialog';
import ProductModalCustomizer from '@/elements/product-modal-customizer';
import PizzaModalCustomizer from '@/elements/pizza-modal-customizer';

import { useRouter } from 'next/navigation';
import { cn } from '@/helpers/utils';

import type { ClassProps } from '@/types/common';
import type { ProductWithRelations } from '@/shared/types/product.interface';
import type { Size } from '@/shared/types/size.interface';
import type { DoughType } from '@/shared/types/dough-type.interface';

export interface ProductModalProps extends ClassProps {
  product: NonNullable<ProductWithRelations>;
  sizes: Size[];
  doughTypes: DoughType[];
}

const ProductModal: React.FC<ProductModalProps> = ({ className, product, sizes, doughTypes }) => {
  const router = useRouter();
  console.log(product.name, product.variations);
  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn('grid h-[580px] !max-w-[1000px] grid-cols-[5fr_4fr] rounded-3xl border-0 p-0', className)}>
        {product.variations[0].size ? (
          <PizzaModalCustomizer product={product} sizes={sizes} doughTypes={doughTypes} />
        ) : (
          <ProductModalCustomizer product={product} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
