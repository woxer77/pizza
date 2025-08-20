import React from 'react';

import type { ClassProps } from '@/types/common';
import { cn } from '@/lib/utils';
import type { Product } from '@/shared/types/product.interface';
import Image from 'next/image';

interface DropdownSearchItemProps extends ClassProps {
  product: Product;
}

const DropdownSearchItem: React.FC<DropdownSearchItemProps> = ({ className, product }) => {
  return (
    <div className={cn('flex cursor-pointer items-center gap-4 px-4 py-2 hover:bg-neutral-100', className)}>
      <Image src={product.image} alt={product.name} width={40} height={40} />
      <p>{product.name}</p>
      <p className="text-sm text-neutral-400">${product.basePrice}</p>
    </div>
  );
};

export default DropdownSearchItem;
