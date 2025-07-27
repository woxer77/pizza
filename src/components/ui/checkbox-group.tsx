import React from 'react';

import type { ClassProps } from '@/types/common';
import { cn } from '@/lib/utils';

interface CheckboxGroupProps extends ClassProps {
  children: React.ReactNode;
  title?: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ className, children, title }) => {
  return (
    <section className={cn('flex flex-col gap-2', className)}>
      {title && <h4 className="font-bold">{title}</h4>}
      <div className="flex flex-col gap-1.5">{children}</div>
    </section>
  );
};

export default CheckboxGroup;
