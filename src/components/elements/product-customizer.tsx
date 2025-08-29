import React from 'react';

import Image from 'next/image';
import { Button } from '@/ui/button';

import { cn } from '@/helpers/utils';
import { IMAGE_SIZE } from '@/constants/product.constants';
import type { ClassProps } from '@/types/common';
import type { ProductWithRelations } from '@/shared/types/product.interface';
import { IMAGE_SCALE } from '@/constants/common';

interface ProductCustomizerProps extends ClassProps {
  product: NonNullable<ProductWithRelations>;
}

const ProductCustomizer: React.FC<ProductCustomizerProps> = ({ className, product }) => {
  return (
    <div className={cn('flex items-start gap-10', className)}>
      <Image
        src={product.image}
        alt={product.name}
        width={IMAGE_SIZE * IMAGE_SCALE.LARGE}
        height={IMAGE_SIZE * IMAGE_SCALE.LARGE}
      />
      <div className={cn('flex flex-col items-start justify-between', className)}>
        <div className="mb-6 flex flex-col gap-3">
          <h2 className="text-4xl font-extrabold">{product.name}</h2>
          <p className="text-description text-sm">{product.description}</p>
        </div>
        <Button className="px-7 py-5">Add to cart for ${product.basePrice}</Button>
      </div>
    </div>
  );
};

export default ProductCustomizer;
