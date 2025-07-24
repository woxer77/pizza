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
        'focus-visible:border-ring focus-visible:ring-ring/50 flex cursor-pointer gap-2 font-semibold duration-300 outline-none focus-visible:ring-[3px]',
        isActive && 'text-red-700',
        className
      )}
      ref={ref}
      onClick={onClick}
    >
      {startAdornment && <span>{startAdornment}</span>}
      {category.name}
      {endAdornment && <span>{endAdornment}</span>}
    </button>
  );
};

export default TopBarCategory;
