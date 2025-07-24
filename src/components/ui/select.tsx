import React from 'react';

import type { ClassProps, IOption } from '@/shared/types/common';
import { cn } from '@/lib/utils';

interface SelectProps extends ClassProps {
  options: IOption[];
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isActive?: boolean;
  endAdornment?: React.ReactNode;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  className,
  options,
  onClick,
  isActive = false,
  endAdornment,
  placeholder
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [optionObj, setOptionObj] = React.useState<IOption | null>(
    placeholder ? null : options[0]
  );
  const [shouldTriggerClick, setShouldTriggerClick] = React.useState(false);

  const optionsRef = React.useRef<HTMLUListElement>(null);
  const selectRef = React.useRef<HTMLButtonElement>(null);

  const optionClickHandler = (option: IOption) => {
    setOptionObj(option);
    setShouldTriggerClick(true);
  };

  const selectClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onClick?.(e);
    setIsOpen(true);
  };

  React.useEffect(() => {
    const closeOptionsList = () => {
      if (!isOpen) return;

      setIsOpen(false);
    };

    document.addEventListener('click', closeOptionsList);

    return () => {
      document.removeEventListener('click', closeOptionsList);
    };
  }, [isOpen]);

  React.useEffect(() => {
    // TODO: refactor this and move to top-bar.tsx
    if (shouldTriggerClick && selectRef.current && onClick) {
      const syntheticEvent = new MouseEvent('click', { bubbles: true });
      const reactEvent = {
        ...syntheticEvent,
        currentTarget: selectRef.current,
        target: selectRef.current
      } as unknown as React.MouseEvent<HTMLButtonElement, MouseEvent>;
      console.log('y', reactEvent.currentTarget.innerHTML);
      onClick(reactEvent);
      setShouldTriggerClick(false);
    }
  }, [optionObj, shouldTriggerClick, onClick]);

  return (
    <button
      onClick={selectClickHandler}
      ref={selectRef}
      className={cn(
        // TODO: move focus styles to css class or tailwind <feature?>
        'flex-center focus-visible:border-ring focus-visible:ring-ring/50 relative cursor-pointer gap-1 font-semibold outline-none focus-visible:ring-[3px]',
        isActive && 'text-red-700',
        className
      )}
    >
      {placeholder && !optionObj?.content ? (
        <p>{placeholder}</p>
      ) : (
        <p>{optionObj?.content}</p>
      )}
      <ul
        ref={optionsRef}
        className={cn(
          'bg-background text-foreground invisible absolute top-full left-0 -z-10 flex min-w-34 -translate-x-1 -translate-y-2 flex-col rounded-sm border p-1 opacity-0 shadow-md transition-all',
          isOpen &&
            'visible z-10 w-full translate-x-0 translate-y-1 opacity-100'
        )}
      >
        {options.map((option) => (
          <li
            key={option.value}
            onClick={() => optionClickHandler(option)}
            tabIndex={0}
            className="rounded-sm px-3 py-1.5 text-left text-sm capitalize hover:bg-neutral-200"
          >
            {option.content}
          </li>
        ))}
      </ul>
      {endAdornment && <span>{endAdornment}</span>}
    </button>
  );
};

export default Select;
