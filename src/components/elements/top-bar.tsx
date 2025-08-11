import React from 'react';

import Sort from '@/elements/sort';
import Category from '@/elements/category';
import { ArrowDownUp } from 'lucide-react';

import type { ClassProps } from '@/types/common';
import { cn } from '@/lib/utils';
import { categories } from '@/constants/category.constants';
import { productSortOptions } from '@/constants/product.constants';
import type { ProductSortByValue } from '@/shared/types/product.interface';

const prefixSortNode = (
  <div className="flex-center flex shrink-0 gap-1">
    <ArrowDownUp size={16} />
    <p>Sort by: </p>
  </div>
);

const TopBar: React.FC<ClassProps> = ({ className }) => {
  return (
    <div className={cn('bg-background sticky top-0 p-6 shadow-lg shadow-neutral-200', className)}>
      <div className="flex-space-between container mx-auto max-h-14">
        <Category categories={categories} />
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
