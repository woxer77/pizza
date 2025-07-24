'use client';

import React from 'react';

import TopBarCategory from '@/elements/top-bar-category';

import type { ClassProps, ICategory } from '@/types/common';
import { cn } from '@/lib/utils';
import useSegmentedControl from '@/hooks/useSegmentedControl';

interface TopBarProps extends ClassProps {
  categories: ICategory[];
  limit?: number;
}

const TopBar: React.FC<TopBarProps> = ({
  className,
  categories,
  limit = 5
}) => {
  const [activeCategory, setActiveCategory] = React.useState('all');

  const moveableElemRef = React.useRef<HTMLDivElement>(null);
  const parentElemRef = React.useRef<HTMLDivElement>(null);
  const firstElemRef = React.useRef<HTMLButtonElement>(null);

  const { moveSegment } = useSegmentedControl(parentElemRef, moveableElemRef);

  const processedCategories = React.useMemo(() => {
    const result = [{ name: 'all' }, ...categories.slice(0, limit)];
    if (categories.length > limit) {
      result.push({ name: 'more' });
    }
    return result;
  }, [categories, limit]);

  const handleCategoryClick =
    (categoryName: string) =>
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      moveSegment(e.currentTarget);
      setActiveCategory(categoryName);
    };

  React.useEffect(() => {
    if (
      moveableElemRef.current &&
      firstElemRef.current &&
      parentElemRef.current
    ) {
      const firstElemRect = firstElemRef.current.getBoundingClientRect();
      const parentElemRect = parentElemRef.current.getBoundingClientRect();

      moveableElemRef.current.style.transform = `translateX(${firstElemRect.x - parentElemRect.x}px)`;
      moveableElemRef.current.style.width = `${firstElemRect.width}px`;
      moveableElemRef.current.style.height = `${firstElemRect.height}px`;
    }
  }, []);

  return (
    <div
      className={cn(
        'flex-space-between container mx-auto mt-10 max-h-14',
        className
      )}
    >
      <div
        ref={parentElemRef}
        className="flex-center relative gap-1 rounded-xl bg-neutral-100 p-1.5"
      >
        {processedCategories.map((category, idx) => (
          <TopBarCategory
            key={category.name}
            category={category}
            ref={idx === 0 ? firstElemRef : null}
            onClick={handleCategoryClick(category.name)}
            isActive={category.name === activeCategory}
            className="z-10 rounded-xl px-4 py-2 capitalize"
          />
        ))}
        <div
          ref={moveableElemRef}
          className="bg-background absolute top-1/2 left-0 -translate-y-1/2 rounded-xl transition-all"
        ></div>
      </div>
    </div>
  );
};

export default TopBar;
