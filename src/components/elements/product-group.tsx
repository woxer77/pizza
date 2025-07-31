'use client';

import React from 'react';

import type { ClassProps } from '@/types/common';
import { cn } from '@/lib/utils';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/store/category';

interface ProductGroupProps extends ClassProps {
  title: string;
  children: React.ReactNode;
  categoryId: string;
}

const ProductGroup: React.FC<ProductGroupProps> = ({ className, children, title, categoryId }) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

  const intersectionRef = React.useRef<HTMLDivElement>(null);
  const intersection = useIntersection(intersectionRef as React.RefObject<HTMLElement>, {
    threshold: 0.35
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [intersection?.isIntersecting, setActiveCategoryId, categoryId]);

  return (
    <div ref={intersectionRef} id={categoryId} className={cn('mb-10', className)}>
      <h2 className="mb-6 text-3xl font-bold capitalize">{title}</h2>
      <div className="grid grid-cols-3 gap-12">{children}</div>
    </div>
  );
};

export default ProductGroup;
