'use client';

import React from 'react';

import { ChevronDown } from 'lucide-react';
import TopBarCategory from '@/elements/top-bar-category';
import Select from '@/ui/select';
import Sort from '@/elements/sort';

import type { ClassProps, ICategory } from '@/types/common';
import { cn } from '@/lib/utils';
import useCategory from '@/hooks/useCategory';
import { useCategoryStore } from '@/store/category';

interface TopBarProps extends ClassProps {
  categories: ICategory[];
  limit?: number;
}

const TopBar: React.FC<TopBarProps> = ({ className, categories, limit = 5 }) => {
  const activeCategoryId = useCategoryStore((state) => state.activeId);
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

  const [shouldMoveToSelect, setShouldMoveToSelect] = React.useState(false);

  const moveableElemRef = React.useRef<HTMLDivElement>(null);
  const parentElemRef = React.useRef<HTMLDivElement>(null);
  const firstElemRef = React.useRef<HTMLButtonElement>(null);
  const selectRef = React.useRef<HTMLButtonElement>(null);
  const { moveSegment, displayedCategories, dropdownOptions } = useCategory(
    parentElemRef,
    moveableElemRef,
    categories,
    limit
  );

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
    <div className="bg-background sticky top-0 p-6 shadow-lg shadow-neutral-200">
      <div className={cn('flex-space-between container mx-auto max-h-14', className)}>
        <div ref={parentElemRef} className="flex-center relative gap-1 rounded-xl bg-neutral-100 p-1.5">
          {displayedCategories.map((category, idx) => {
            if (category.id === 'other') {
              return (
                <Select
                  key={category.id}
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
              );
            } else {
              return (
                <TopBarCategory
                  key={category.id}
                  category={category}
                  ref={idx === 0 ? firstElemRef : null}
                  onClick={onCategoryClick(category.id)}
                  isActive={category.id === activeCategoryId}
                  className="z-10 rounded-xl px-4 py-2 capitalize"
                />
              );
            }
          })}
          <div
            ref={moveableElemRef}
            className="bg-background absolute top-1/2 left-0 -translate-y-1/2 rounded-xl transition-all"></div>
        </div>
        <Sort />
      </div>
    </div>
  );
};

export default TopBar;
