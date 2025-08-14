import React from 'react';

import { Button } from '@/ui/button';

import type { ClassProps } from '@/types/common';
import { cn } from '@/lib/utils';
import type { CategoryWithProducts } from '@/shared/types/category.interface';
import { PRODUCTS_SCROLL_Y_OFFSET } from '@/constants/common';

interface TopBarCategoryProps extends ClassProps {
  category: CategoryWithProducts;
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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const targetElem = document.getElementById(category.id);
    if (targetElem) {
      const y = targetElem.getBoundingClientRect().top + window.scrollY - PRODUCTS_SCROLL_Y_OFFSET;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    onClick?.(e);
  };

  return (
    <Button
      noStyles
      className={cn('flex cursor-pointer gap-2 font-semibold duration-300', isActive && 'text-red-700', className)}
      id={buttonId}
      ref={ref}
      onClick={handleClick}>
      {startAdornment && <span>{startAdornment}</span>}
      {category.name}
      {endAdornment && <span>{endAdornment}</span>}
    </Button>
  );
};

export default TopBarCategory;
