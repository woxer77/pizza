import React from 'react';

import type { ClassProps } from '@/types/common';
import { cn } from '@/lib/utils';

interface ProductGroupProps extends ClassProps {
  title: string;
  children: React.ReactNode;
}

const ProductGroup: React.FC<ProductGroupProps> = ({ className, title, children }) => {
  return (
    <div className={cn('mb-10', className)}>
      <h2 className="mb-6 text-3xl font-bold capitalize">{title}</h2>
      <div className="grid grid-cols-3 gap-12">{children}</div>
    </div>
  );
};

export default ProductGroup;
