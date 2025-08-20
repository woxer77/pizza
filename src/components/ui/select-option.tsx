'use client';

import React from 'react';

import type { ClassProps, IOption } from '@/types/common';
import { cn } from '@/helpers/utils';

interface SelectOptionProps<T> extends ClassProps {
  option: IOption<T>;
  onClick?: () => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLLIElement>;
  tabIndex?: number;
}

const SelectOption = <T extends string>({
  className,
  option,
  onClick,
  onKeyDown,
  tabIndex
}: SelectOptionProps<T>) => {
  return (
    <li
      className={cn(
        'cursor-pointer rounded-sm px-3 py-1.5 text-left text-sm capitalize hover:bg-neutral-200',
        className
      )}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex}>
      {option.content}
    </li>
  );
};

export default SelectOption;
