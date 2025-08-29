import React from 'react';

import Link from 'next/link';
import Image from 'next/image';

import type { ClassProps } from '@/types/common';
import { cn, getProductImagePath } from '@/helpers/utils';
import type { Product } from '@/shared/types/product.interface';

interface DropdownSearchItemProps extends ClassProps {
  product: Product;
}

const DropdownSearchItem: React.FC<DropdownSearchItemProps> = ({ className, product }) => {
  return (
    <Link
      href={`/products/${product.id}`}
      className={cn('hover:bg-accent cursor-pointer px-4 py-2', className)}
      tabIndex={0}>
      <li className="focus-outline flex items-center gap-4 rounded-sm">
        <Image src={getProductImagePath(product.image)} alt={product.name} width={40} height={40} />
        <p>{product.name}</p>
        <p className="text-sm text-neutral-400">${product.basePrice}</p>
      </li>
    </Link>
  );
};

export default DropdownSearchItem;
