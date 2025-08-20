import React from 'react';

import Sort from '@/elements/sort';
import { ArrowDownUp } from 'lucide-react';
import Categories from '@/elements/categories';

import type { ClassProps } from '@/types/common';
import { cn } from '@/helpers/utils';
import { productSortOptions } from '@/constants/product.constants';
import type { ProductSortByValue } from '@/shared/types/product.interface';
import type { CategoryWithProducts } from '@/shared/types/category.interface';

const prefixSortNode = (
  <div className="flex-center flex shrink-0 gap-1">
    <ArrowDownUp size={16} />
    <p>Sort by: </p>
  </div>
);

interface TopBarProps extends ClassProps {
  categories: CategoryWithProducts[];
}

const TopBar: React.FC<TopBarProps> = ({ className, categories }) => {
  return (
    <div className={cn('bg-background sticky top-0 p-6 shadow-lg shadow-neutral-200', className)}>
      <div className="flex-space-between container mx-auto max-h-14">
        <Categories categories={categories} />
        <Sort<ProductSortByValue>
          options={productSortOptions}
          prefixContent={prefixSortNode}
          className="rounded-xl bg-neutral-100 p-1.5"
        />
      </div>
    </div>
  );
};

export default TopBar;
