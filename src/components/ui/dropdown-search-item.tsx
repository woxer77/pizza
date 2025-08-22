import React from 'react';

import Link from 'next/link';
import Image from 'next/image';

import type { ClassProps } from '@/types/common';
import { cn } from '@/helpers/utils';
import type { Product } from '@/shared/types/product.interface';

interface DropdownSearchItemProps extends ClassProps {
  product: Product;
}

const DropdownSearchItem: React.FC<DropdownSearchItemProps> = ({ className, product }) => {
  return (
    <Link href={`/products/${product.id}`} className={cn('hover:bg-accent cursor-pointer px-4 py-2', className)}>
      <div className="focus-outline flex items-center gap-4 rounded-sm" tabIndex={0}>
        <Image src={product.image} alt={product.name} width={40} height={40} />
        <p>{product.name}</p>
        <p className="text-sm text-neutral-400">${product.basePrice}</p>
      </div>
    </Link>
  );
};

export default DropdownSearchItem;
