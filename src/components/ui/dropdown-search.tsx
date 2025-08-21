import React from 'react';

import type { ClassProps } from '@/types/common';
import { cn } from '@/helpers/utils';

interface DropdownSearchProps extends ClassProps {
  isActive: boolean;
  children: React.ReactNode;
}

const DropdownSearch: React.FC<DropdownSearchProps> = ({ className, isActive, children }) => {
  return (
    <ul
      className={cn(
        'invisible absolute top-[125%] left-0 flex max-h-[400px] w-full -translate-x-1 -translate-y-1 flex-col overflow-auto rounded-md bg-white py-2 opacity-0 transition-[translate,opacity,visibility]',
        isActive && 'visible translate-x-0 translate-y-1 opacity-100',
        className
      )}
      tabIndex={-1}>
      {children}
    </ul>
  );
};

export default DropdownSearch;
