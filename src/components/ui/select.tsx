import React from 'react';

import type { ClassProps, IOption } from '@/shared/types/common';
import { cn } from '@/lib/utils';
import SelectOption from './select-option';
import { useRouter } from 'next/navigation';

interface SelectProps extends ClassProps {
  contentClassName?: string;
  options: IOption[];
  onSelect?: (value: string) => void;
  prefixContent?: React.ReactNode;
  postfixContent?: React.ReactNode;
  placeholder?: string;
  ref?: React.Ref<HTMLButtonElement>;
  activeOptionValue?: string;
}

const Select: React.FC<SelectProps> = ({
  className,
  contentClassName,
  options,
  onSelect,
  prefixContent,
  postfixContent,
  placeholder,
  ref,
  activeOptionValue
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<IOption | null>(placeholder ? null : options[0]);

  const dropdownRef = React.useRef<HTMLUListElement>(null);

  const handleOptionClick = (option: IOption) => {
    setSelectedOption(option);
    onSelect?.(option.value);
    setIsOpen(false);

    if (option.href) {
      router.push(`#${option.href}`);
    }
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const onKeyDownSelect = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      toggleDropdown();
    }
  };

  const onKeyDownDropdown = (e: React.KeyboardEvent, option: IOption) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter') {
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

  return (
    // TODO: reset selectedOption on activeCategoryId change
    <button
      ref={ref}
      onClick={toggleDropdown}
      onKeyDown={onKeyDownSelect}
      className={cn('flex-center relative cursor-pointer gap-1 font-semibold', className)}>
      <span className="flex-center flex gap-1">
        {prefixContent}
        <span className={contentClassName}>{activeOptionValue || selectedOption?.content || placeholder}</span>
        {postfixContent}
      </span>
      <ul
        ref={dropdownRef}
        className={cn(
          'bg-background text-foreground invisible absolute top-full left-0 -z-10 flex w-full min-w-34 -translate-x-1 -translate-y-2 flex-col rounded-sm border p-1 opacity-0 shadow-md transition-all',
          isOpen && 'visible z-10 translate-x-0 translate-y-1 opacity-100'
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
