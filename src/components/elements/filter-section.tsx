import React from 'react';

import type { ClassProps } from '@/types/common';
import { cn } from '@/helpers/utils';

interface FilterSectionProps extends ClassProps {
  title?: string;
  children: React.ReactNode;
  titleClassName?: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({ className, title, titleClassName, children }) => {
  return (
    <div className={cn('mb-6', className)}>
      {title && <h3 className={cn('mb-4 pl-1 text-lg font-bold', titleClassName)}>{title}</h3>}
      {children}
    </div>
  );
};

export default React.memo(FilterSection);
