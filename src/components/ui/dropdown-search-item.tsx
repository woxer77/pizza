import React from 'react';

import Link from 'next/link';
import Image from 'next/image';

import type { ClassProps } from '@/types/common';
import { cn, getProductImagePath } from '@/helpers/utils';
import type { Product } from '@/shared/types/product.interface';

interface DropdownSearchItemProps extends ClassProps {
  product: Product;
  isSelected?: boolean;
  onMouseEnter?: () => void;
}

const DropdownSearchItem: React.FC<DropdownSearchItemProps> = ({
  className,
  product,
  isSelected = false,
  onMouseEnter
}) => {
  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className={cn(
        'hover:bg-accent focus-visible:bg-accent block cursor-pointer px-4 py-2 transition-colors',
        isSelected && 'bg-accent',
        className
      )}
      onMouseEnter={onMouseEnter}
      onMouseDown={handleMouseDown}
      tabIndex={-1}>
      <div className="flex items-center gap-4 rounded-sm">
        <Image
          src={getProductImagePath(product.image)}
          alt={product.name}
          width={40}
          height={40}
          className="rounded-sm object-cover"
        />
        <div className="flex-1">
          <p className="text-foreground font-medium">{product.name}</p>
        </div>
        <p className="text-muted-foreground text-sm">${product.basePrice}</p>
      </div>
    </Link>
  );
};

export default DropdownSearchItem;
