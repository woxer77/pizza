import React from 'react';

import { Button } from '@/ui/button';
import Link from 'next/link';

import type { ClassProps } from '@/types/common';
import type { ICategory } from '@/shared/types/category.interface';
import { cn } from '@/lib/utils';

interface TopBarCategoryProps extends ClassProps {
  category: ICategory;
  isActive?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

type ButtonIdType = `top-bar-${string}`;

const TopBarCategory: React.FC<TopBarCategoryProps> = ({
  className,
  category,
  isActive = false,
  ref,
  onClick,
  startAdornment,
  endAdornment
}) => {
  const buttonId: ButtonIdType = `top-bar-${category.id}`;

  return (
    <Button
      noStyles
      asChild
      className={cn('flex cursor-pointer gap-2 font-semibold duration-300', isActive && 'text-red-700', className)}
      id={buttonId}
      ref={ref}
      onClick={onClick}>
      <Link href={`#${category.id}`}>
        {startAdornment && <span>{startAdornment}</span>}
        {category.name}
        {endAdornment && <span>{endAdornment}</span>}
      </Link>
    </Button>
  );
};

export default TopBarCategory;
