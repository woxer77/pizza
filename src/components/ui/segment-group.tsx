'use client';

import React from 'react';

import { ChevronDown } from 'lucide-react';
import { Button } from '@/ui/button';
import Select from './select';

import type { ClassProps, IOption, SegmentItem, SegmentVariantValues } from '@/types/common';
import { cn, scrollWithOffset } from '@/helpers/utils';
import { useCategoryStore } from '@/store/category';
import { IGNORE_INTERSECTION_DELAY, PRODUCTS_SCROLL_Y_OFFSET, SegmentVariants } from '@/constants/common';

interface Refs {
  parent: React.Ref<HTMLDivElement>;
  first: React.Ref<HTMLButtonElement>;
  moveable: React.Ref<HTMLDivElement>;
}

interface SegmentGroupProps<T extends string | number> extends ClassProps {
  itemClassName?: string;
  items: SegmentItem<T>[];
  onClick?: (value: T) => void;
  moveSegment: (target: HTMLElement) => void;
  activeValue: T;
  name: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  refs: Refs;
  limit?: number;
  variant?: SegmentVariantValues;
}

const SegmentGroup = <T extends string | number>({
  className,
  itemClassName,
  items,
  onClick,
  moveSegment,
  activeValue,
  name,
  startAdornment,
  endAdornment,
  refs,
  limit,
  variant = SegmentVariants.DEFAULT
}: SegmentGroupProps<T>) => {
  const [shouldMoveToSelect, setShouldMoveToSelect] = React.useState(false);
  const selectRef = React.useRef<HTMLButtonElement>(null);

  const setIgnoreIntersection = useCategoryStore((state) => state.setIgnoreIntersection);
  const intersectionTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const stopIntersection = () => {
    setIgnoreIntersection(true);
    if (intersectionTimeoutRef.current) {
      clearTimeout(intersectionTimeoutRef.current);
    }
    intersectionTimeoutRef.current = setTimeout(() => {
      setIgnoreIntersection(false);
    }, IGNORE_INTERSECTION_DELAY);
  };

  const changeSegment = (event: React.MouseEvent<HTMLButtonElement>, value: T) => {
    const target = event.target as HTMLButtonElement;
    onClick?.(value);
    moveSegment(target);

    if (variant === SegmentVariants.SCROLL) {
      stopIntersection();
      scrollWithOffset(String(value), PRODUCTS_SCROLL_Y_OFFSET);
    }
  };

  const itemsToDisplay = items.slice(0, limit);
  const dropdownOptions: IOption<T>[] =
    limit !== undefined && items.length > limit
      ? items.slice(limit).map((item) => ({
          value: item.value,
          content: item.name,
          href: String(item.value)
        }))
      : [];
  const isDropdownOpen = dropdownOptions.some((option) => option.value === activeValue);

  const onDropdownSelect = (value: T) => {
    setShouldMoveToSelect(true);
    onClick?.(value);

    if (variant === SegmentVariants.SCROLL) {
      stopIntersection();
      scrollWithOffset(String(value), PRODUCTS_SCROLL_Y_OFFSET);
    }
  };

  React.useLayoutEffect(() => {
    if (shouldMoveToSelect && selectRef.current) {
      moveSegment(selectRef.current);
      setShouldMoveToSelect(false);
    }
  }, [shouldMoveToSelect, moveSegment]);

  React.useEffect(() => {
    if (isDropdownOpen && selectRef.current) {
      moveSegment(selectRef.current);
    } else {
      const target = document.querySelector(`#${name}-${activeValue}`) as HTMLElement | null;
      if (!target) return;

      moveSegment(target);
    }
  }, [activeValue, moveSegment, isDropdownOpen, name]);

  React.useEffect(() => {
    return () => {
      if (intersectionTimeoutRef.current) {
        clearTimeout(intersectionTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={cn('flex-center relative gap-1 rounded-xl bg-neutral-100 p-1', className)} ref={refs.parent}>
      {itemsToDisplay.map((item, idx) => (
        <Button
          key={item.value}
          noStyles
          id={`${name}-${item.value}`}
          ref={idx === 0 ? refs.first : null}
          onClick={(e) => changeSegment(e, item.value)}
          disabled={item.disabled}
          className={cn(
            'flex-center z-5 flex-1 cursor-pointer gap-2 rounded-xl px-2 py-1 font-semibold duration-300 disabled:cursor-not-allowed disabled:opacity-30',
            activeValue === item.value && 'text-red-700',
            itemClassName
          )}>
          {startAdornment && <span>{startAdornment}</span>}
          {item.name}
          {endAdornment && <span>{endAdornment}</span>}
        </Button>
      ))}
      {limit !== undefined && (
        <Select
          ref={selectRef}
          options={dropdownOptions}
          onSelect={onDropdownSelect}
          postfixContent={<ChevronDown />}
          placeholder="Other"
          activeOptionValue={dropdownOptions.find((option) => option.value === activeValue)?.value}
          className={cn('z-10 rounded-xl px-2 py-1 capitalize', isDropdownOpen && 'text-red-700', itemClassName)}
        />
      )}
      <div
        ref={refs.moveable}
        className="bg-background absolute top-1/2 left-0 -translate-y-1/2 rounded-xl shadow-md transition-all"
      />
    </div>
  );
};

export default SegmentGroup;
