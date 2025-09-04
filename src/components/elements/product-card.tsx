import React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/ui/button';
import { Plus } from 'lucide-react';

import type { ClassProps } from '@/types/common';
import type { Product } from '@/shared/types/product.interface';
import { cn, getProductImagePath } from '@/helpers/utils';

interface ProductCardProps extends ClassProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ className, product }) => {
  return (
    <Link className={cn('', className)} href={`/products/${product.id}`}>
      <div className="flex-center mb-4 h-[300px] w-full rounded-2xl">
        <Image
          src={getProductImagePath(product.image)}
          alt={product.name}
          width={292}
          height={292}
          quality={100}
          className="transition-transform hover:translate-y-1.5"
        />
      </div>
      <div className="mb-3 flex flex-col gap-2">
        <h5 className="text-2xl font-bold">{product.name}</h5>
        <p className="text-description min-h-[60px]">{product.description}</p>
      </div>
      <div className="flex-space-between">
        <span className="text-lg">
          from <strong className="text-xl font-extrabold">${product.basePrice}</strong>
        </span>
        <Button variant="secondary" className="flex gap-2 px-6 py-5 text-lg font-bold">
          <Plus size={20} /> Add
        </Button>
      </div>
    </Link>
  );
};

export default ProductCard;
