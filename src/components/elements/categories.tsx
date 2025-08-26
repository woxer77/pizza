'use client';

import React from 'react';

import SegmentGroup from '@/ui/segment-group';

import type { ClassProps } from '@/types/common';
import { cn, convertToSegmentItems } from '@/helpers/utils';
import { useCategoryStore } from '@/store/category';
import useSegmentControl from '@/hooks/useSegmentedControl';
import type { CategoryWithProducts } from '@/shared/types/category.interface';

interface CategoryProps extends ClassProps {
  categories: CategoryWithProducts[];
  limit?: number;
}

const Categories: React.FC<CategoryProps> = ({ className, categories, limit = 5 }) => {
  const activeCategoryId = useCategoryStore((state) => state.activeId);
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

  const { moveSegment, refs } = useSegmentControl();

  const filteredCategories = categories.filter((category) => category.products.length > 0);
  const segmentItems = convertToSegmentItems(filteredCategories);

  return (
    <SegmentGroup
      items={segmentItems}
      moveSegment={moveSegment}
      refs={refs}
      name="top-bar"
      onClick={setActiveCategoryId}
      activeValue={activeCategoryId}
      variant="scroll"
      limit={limit}
      itemClassName={cn('capitalize px-5 py-2.5', className)}
    />
  );
};

export default Categories;
