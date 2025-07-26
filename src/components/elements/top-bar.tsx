'use client';

import React from 'react';

import { ChevronDown } from 'lucide-react';
import TopBarCategory from '@/elements/top-bar-category';
import Select from '@/ui/select';
import Sort from '@/elements/sort';

import type { ClassProps, ICategory } from '@/types/common';
import { cn } from '@/lib/utils';
import useCategory from '@/hooks/useCategory';

interface TopBarProps extends ClassProps {
  categories: ICategory[];
  limit?: number;
}

const TopBar: React.FC<TopBarProps> = ({ className, categories, limit = 5 }) => {
  const [activeCategory, setActiveCategory] = React.useState('all');
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

  const onCategoryClick = (categoryName: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    moveSegment(e.currentTarget);
    setActiveCategory(categoryName);
  };

  const onDropdownChange = (categoryName: string) => {
    setActiveCategory(categoryName);
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

  const isSelectActive = dropdownOptions.some((opt) => opt.value === activeCategory);

  return (
    <div className={cn('flex-space-between container mx-auto mt-10 max-h-14', className)}>
      <div ref={parentElemRef} className="flex-center relative gap-1 rounded-xl bg-neutral-100 p-1.5">
        {displayedCategories.map((category, idx) => {
          if (category.name === 'other') {
            return (
              <Select
                key={category.name}
                ref={selectRef}
                options={dropdownOptions}
                onSelect={onDropdownChange}
                postfixContent={<ChevronDown />}
                placeholder="Other"
                className={cn('z-10 rounded-xl px-4 py-2 capitalize', isSelectActive && 'text-red-700')}
              />
            );
          } else {
            return (
              <TopBarCategory
                key={category.name}
                category={category}
                ref={idx === 0 ? firstElemRef : null}
                onClick={onCategoryClick(category.name)}
                isActive={category.name === activeCategory}
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
  );
};

export default TopBar;
