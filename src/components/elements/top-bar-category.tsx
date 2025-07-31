import React from 'react';

import type { ClassProps, ICategory } from '@/types/common';
import { cn } from '@/lib/utils';

interface TopBarCategoryProps extends ClassProps {
  category: ICategory;
  isActive?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

const TopBarCategory: React.FC<TopBarCategoryProps> = ({
  className,
  category,
  isActive = false,
  ref,
  onClick,
  startAdornment,
  endAdornment
}) => {
  return (
    <button
      className={cn(
        'focus-ring flex cursor-pointer gap-2 font-semibold duration-300',
        isActive && 'text-red-700',
        className
      )}
      id={`top-bar-${category.id}`}
      ref={ref}
      onClick={onClick}>
      {startAdornment && <span>{startAdornment}</span>}
      {category.name}
      {endAdornment && <span>{endAdornment}</span>}
    </button>
  );
};

export default TopBarCategory;
