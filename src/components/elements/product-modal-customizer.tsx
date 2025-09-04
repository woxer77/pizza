'use client';

import React from 'react';

import Image from 'next/image';
import { DialogDescription, DialogTitle } from '@/ui/dialog';
import { Button } from '@/ui/button';

import type { ProductModalProps } from './product-modal';
import { IMAGE_SIZE } from '@/constants/product.constants';

type ProductModalCustomizerProps = Pick<ProductModalProps, 'product'>;

const ProductModalCustomizer: React.FC<ProductModalCustomizerProps> = ({ product }) => {
  return (
    <>
      <div className="relative">
        <Image
          src={product.image}
          alt={product.name}
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          className="absolute top-1/2 left-1/2 mt-[1%] ml-[1%] -translate-1/2 scale-[0.85] select-none"
        />
      </div>
      <div className="bg-background-second flex flex-col items-start justify-between overflow-hidden rounded-r-3xl pt-10">
        <div className="w-full overflow-auto px-10">
          <div className="mb-6 flex flex-col gap-3">
            <DialogTitle className="text-4xl font-extrabold">{product.name}</DialogTitle>
            <DialogDescription className="text-sm text-neutral-500">{product.description}</DialogDescription>
          </div>
        </div>
        <div className="flex-center w-full px-10">
          <Button className="m-5 w-full py-5">Add to cart for ${product.basePrice}</Button>
        </div>
      </div>
    </>
  );
};

export default ProductModalCustomizer;
