'use client';

import React from 'react';

import Select from '@/ui/select';
import TopBarCategory from '@/elements/top-bar-category';
import { ChevronDown } from 'lucide-react';

import type { ClassProps } from '@/types/common';
import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';
import useCategory from '@/hooks/useCategory';
import useSegmentControl from '@/hooks/useSegmentedControl';
import type { CategoryWithProducts } from '@/shared/types/category.interface';

interface CategoryProps extends ClassProps {
  categories: CategoryWithProducts[];
  limit?: number;
}

const Categories: React.FC<CategoryProps> = ({ className, categories, limit = 5 }) => {
  const activeCategoryId = useCategoryStore((state) => state.activeId);
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

  const [shouldMoveToSelect, setShouldMoveToSelect] = React.useState(false);

  const moveableElemRef = React.useRef<HTMLDivElement>(null);
  const parentElemRef = React.useRef<HTMLDivElement>(null);
  const firstElemRef = React.useRef<HTMLButtonElement>(null);
  const selectRef = React.useRef<HTMLButtonElement>(null);

  const { displayedCategories, dropdownOptions, hasOtherBtn } = useCategory(categories, limit);
  const moveSegment = useSegmentControl(parentElemRef, moveableElemRef);

  const onCategoryClick = (categoryId: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    moveSegment(e.currentTarget);
    setActiveCategoryId(categoryId);
  };

  const onDropdownChange = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    setShouldMoveToSelect(true);
  };

  React.useLayoutEffect(() => {
    if (shouldMoveToSelect && selectRef.current) {
      moveSegment(selectRef.current);
      setShouldMoveToSelect(false);
    }
  }, [shouldMoveToSelect, moveSegment]);

  React.useEffect(() => {
    if (moveableElemRef.current && firstElemRef.current && parentElemRef.current) {
      const firstElemRect = firstElemRef.current.getBoundingClientRect();
      const parentElemRect = parentElemRef.current.getBoundingClientRect();

      moveableElemRef.current.style.transform = `translateX(${firstElemRect.x - parentElemRect.x}px)`;
      moveableElemRef.current.style.width = `${firstElemRect.width}px`;
      moveableElemRef.current.style.height = `${firstElemRect.height}px`;
    }
  }, []);

  React.useEffect(() => {
    const activeIsSelect = dropdownOptions.some((option) => option.value === activeCategoryId);

    if (activeIsSelect && selectRef.current) {
      moveSegment(selectRef.current);
    } else {
      const target = document.querySelector(`#top-bar-${activeCategoryId}`) as HTMLElement;
      if (!target) return;

      moveSegment(target);
    }
  }, [activeCategoryId, moveSegment, dropdownOptions]);

  const isSelectActive = dropdownOptions.some((option) => option.value === activeCategoryId);

  return (
    <div
      className={cn('flex-center relative gap-1 rounded-xl bg-neutral-100 p-1.5', className)}
      ref={parentElemRef}>
      {displayedCategories.map((category, idx) => (
        <TopBarCategory
          key={category.id}
          category={category}
          ref={idx === 0 ? firstElemRef : null}
          onClick={onCategoryClick(category.id)}
          isActive={category.id === activeCategoryId}
          className="z-10 rounded-xl px-4 py-2 capitalize"
        />
      ))}
      {hasOtherBtn && (
        <Select
          ref={selectRef}
          options={dropdownOptions}
          onSelect={onDropdownChange}
          postfixContent={<ChevronDown />}
          placeholder="Other"
          activeOptionValue={
            // TODO: is there another way to do this?
            dropdownOptions.map((e) => e.value).includes(activeCategoryId) ? activeCategoryId : undefined
          }
          className={cn('z-10 rounded-xl px-4 py-2 capitalize', isSelectActive && 'text-red-700')}
        />
      )}
      <div
        ref={moveableElemRef}
        className="bg-background absolute top-1/2 left-0 -translate-y-1/2 rounded-xl transition-all"
      />
    </div>
  );
};

export default Categories;
