'use client';

import React from 'react';

import type { ClassProps } from '@/types/common';
import { cn } from '@/helpers/utils';
import { useCategoryStore } from '@/store/category';

interface ProductGroupProps extends ClassProps {
  title: string;
  children: React.ReactNode;
  categoryId: string;
}

const ProductGroup: React.FC<ProductGroupProps> = ({ className, children, title, categoryId }) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const ignoreIntersection = useCategoryStore((state) => state.ignoreIntersection);

  const intersectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const element = intersectionRef.current;
    if (!element) return;

    const intersection = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !ignoreIntersection) {
            setActiveCategoryId(categoryId);
          }
        });
      },
      {
        threshold: 0.6
      }
    );

    intersection.observe(element);

    return () => {
      intersection.unobserve(element);
      intersection.disconnect();
    };
  }, [setActiveCategoryId, categoryId, ignoreIntersection]);

  return (
    <div ref={intersectionRef} id={categoryId} className={cn('mb-10', className)}>
      <h2 className="mb-6 text-3xl font-bold capitalize">{title}</h2>
      <ul className="grid grid-cols-3 gap-12">{children}</ul>
    </div>
  );
};

export default ProductGroup;
