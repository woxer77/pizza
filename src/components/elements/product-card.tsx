import React from 'react';

import Image from 'next/image';
import { Button } from '@/ui/button';
import { Plus } from 'lucide-react';

import type { ClassProps } from '@/types/common';
import type { IProduct } from '@/shared/types/product.interface';
import { cn } from '@/lib/utils';

interface ProductCardProps extends ClassProps, IProduct {}

const ProductCard: React.FC<ProductCardProps> = ({ className, name, description, image, basePrice }) => {
  return (
    <div className={cn('', className)}>
      <div className="flex-center mb-4 h-[260px] w-full rounded-2xl bg-[#FFF7EE]">
        <Image src={image} alt={name} width={212} height={212} />
      </div>
      <div className="mb-3 flex flex-col gap-2">
        <h5 className="text-2xl font-bold">{name}</h5>
        <p className="min-h-[60px] text-neutral-400">{description}</p>
      </div>
      <div className="flex-space-between">
        <span className="text-lg">
          from <strong className="text-xl font-extrabold">${basePrice}</strong>
        </span>
        <Button variant="secondary" className="flex gap-2 px-6 py-5 text-lg font-bold">
          <Plus size={20} /> Build
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
