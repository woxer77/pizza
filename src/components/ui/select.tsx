'use client';

import React from 'react';

import SelectOption from '@/ui/select-option';

import type { ClassProps, IOption } from '@/shared/types/common';
import { cn, scrollWithOffset } from '@/helpers/utils';
import { PRODUCTS_SCROLL_Y_OFFSET } from '@/constants/common';
import { useCategoryStore } from '@/store/category';

interface SelectProps<T extends string> extends ClassProps {
  contentClassName?: string;
  options: IOption<T>[];
  onSelect?: (value: T) => void;
  prefixContent?: React.ReactNode;
  postfixContent?: React.ReactNode;
  placeholder?: string;
  ref?: React.Ref<HTMLButtonElement>;
  activeOptionValue?: T;
  defaultOption?: IOption<T>;
}

const Select = <T extends string>({
  className,
  contentClassName,
  options,
  onSelect,
  prefixContent,
  postfixContent,
  placeholder,
  ref,
  activeOptionValue,
  defaultOption
}: SelectProps<T>) => {
  const activeCategoryId = useCategoryStore((state) => state.activeId);

  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<IOption<T> | null>(defaultOption || null);

  const dropdownRef = React.useRef<HTMLUListElement>(null);

  const handleOptionClick = (option: IOption<T>) => {
    setSelectedOption(option);
    onSelect?.(option.value);
    setIsOpen(false);

    if (option.href) {
      scrollWithOffset(option.href, PRODUCTS_SCROLL_Y_OFFSET);
    }
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const onKeyDownSelect = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleDropdown();
    }
  };

  const onKeyDownDropdown = (e: React.KeyboardEvent, option: IOption<T>) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter' || e.key === ' ') {
      handleOptionClick(option);
      toggleDropdown();
    }
  };

  React.useEffect(() => {
    const handleClickOutside = () => {
      setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (activeCategoryId !== selectedOption?.value) {
      setSelectedOption(null);
    }
  }, [activeCategoryId]);

  return (
    <button
      ref={ref}
      onClick={toggleDropdown}
      onKeyDown={onKeyDownSelect}
      className={cn('flex-center relative cursor-pointer gap-1 font-semibold', className)}>
      <span className="flex-center flex gap-1">
        {prefixContent}
        <span className={contentClassName}>
          {activeOptionValue || selectedOption?.content || defaultOption?.content || placeholder}
        </span>
        {postfixContent}
      </span>
      <ul
        ref={dropdownRef}
        className={cn(
          'bg-background text-foreground invisible absolute top-full left-0 z-10 flex w-full min-w-34 -translate-x-1 -translate-y-2 flex-col rounded-sm border p-1 opacity-0 shadow-md transition-all',
          isOpen && 'visible translate-x-0 translate-y-1 opacity-100'
        )}>
        {options.map((option) => (
          <SelectOption
            key={option.value}
            option={option}
            onClick={() => handleOptionClick(option)}
            onKeyDown={(e) => onKeyDownDropdown(e, option)}
            tabIndex={isOpen ? 0 : -1}
          />
        ))}
      </ul>
    </button>
  );
};

export default Select;
