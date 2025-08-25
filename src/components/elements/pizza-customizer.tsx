/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';

import SegmentGroup from '@/ui/segment-group';
import { Button } from '@/ui/button';
import PizzaImage from '@/elements/pizza-image';
import Image from 'next/image';

import type { ClassProps } from '@/types/common';
import type { ProductWithRelations } from '@/types/product.interface';
import type { Size, SizeValues } from '@/shared/types/size.interface';
import type { DoughType, DoughTypeValues } from '@/shared/types/dough-type.interface';

import { cn } from '@/helpers/utils';
import useSegmentedControl from '@/hooks/useSegmentedControl';
import { IMAGE_SIZE } from '@/constants/product.constants';
import usePizzaCustomizer from '@/hooks/usePizzaCustomizer';

export interface PizzaCustomizerProps extends ClassProps {
  product: NonNullable<ProductWithRelations>;
  sizes: Size[];
  doughTypes: DoughType[];
}

const PizzaCustomizer: React.FC<PizzaCustomizerProps> = ({ className, product, sizes, doughTypes }) => {
  const { sizeSegments, doughSegments, activeSize, setActiveSize, activeDoughType, setActiveDoughType } =
    usePizzaCustomizer({
      product,
      sizes,
      doughTypes
    });

  const doughSegmentControl = useSegmentedControl();
  const sizeSegmentControl = useSegmentedControl();

  return (
    <div className={cn('flex items-start gap-10', className)}>
      <PizzaImage src={product.image} alt={product.name} size={IMAGE_SIZE} activeSize={activeSize} />

      <div className="flex min-h-[500px] flex-col items-start justify-between">
        <div>
          <div className="mb-6 flex flex-col gap-3">
            <h2 className="text-4xl font-extrabold">{product.name}</h2>
            <p className="text-description text-sm">{product.description}</p>
          </div>
          <div className="mb-6 flex flex-col gap-2">
            <SegmentGroup
              items={sizeSegments}
              refs={sizeSegmentControl.refs}
              onClick={(value: number) => setActiveSize(value as SizeValues)}
              moveSegment={sizeSegmentControl.moveSegment}
              name="size"
              activeValue={activeSize}
              itemClassName="text-sm"
            />
            <SegmentGroup
              items={doughSegments}
              refs={doughSegmentControl.refs}
              onClick={(value: number) => setActiveDoughType(value as DoughTypeValues)}
              moveSegment={doughSegmentControl.moveSegment}
              name="dough-type"
              activeValue={activeDoughType}
              itemClassName="capitalize text-sm"
            />
          </div>
          <h4 className="mb-4 text-lg font-bold">Ingredients</h4>
          <div className="flex max-w-[640px] gap-4 overflow-auto">
            {product.ingredients.map((ingred) => (
              <Button
                key={ingred.id}
                noStyles
                className="hover:bg-accent flex min-w-32 cursor-pointer flex-col items-center rounded-2xl px-2.5 py-3">
                <Image src={ingred.image} alt={ingred.name} width={110} height={110} className="mb-1" />
                <p className="min-h-8 text-xs">{ingred.name}</p>
                <p className="text-sm font-bold">${ingred.price}</p>
              </Button>
            ))}
          </div>
        </div>
        <Button className="mt-5 px-7 py-5">Add to cart for ${product.basePrice} + ...</Button>
      </div>
    </div>
  );
};

export default PizzaCustomizer;
