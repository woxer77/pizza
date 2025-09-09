import React from 'react';
import { cn } from '@/helpers/utils';
import type { ClassProps } from '@/types/common';

interface DropdownSearchProps extends ClassProps {
  isActive: boolean;
  children: React.ReactNode;
  ref?: React.RefObject<HTMLDivElement>;
}

const DropdownSearch: React.FC<DropdownSearchProps> = ({ className, isActive, children, ref }) => {
  if (!isActive) return null;

  return (
    <div
      ref={ref}
      className={cn(
        'border-border bg-popover absolute top-full right-0 left-0 mt-1 max-h-80 overflow-y-auto rounded-md border shadow-lg',
        className
      )}
      role="listbox"
      aria-label="Search results">
      {children}
    </div>
  );
};

export default DropdownSearch;
