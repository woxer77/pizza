/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';

import SegmentGroup from '@/ui/segment-group';
import { Button } from '@/ui/button';
import PizzaImage from '@/elements/pizza-image';
import Image from 'next/image';
import { CircleCheck } from 'lucide-react';

import type { ClassProps } from '@/types/common';
import type { ProductWithRelations } from '@/types/product.interface';
import type { Size, SizeValues } from '@/shared/types/size.interface';
import type { DoughType, DoughTypeValues } from '@/shared/types/dough-type.interface';

import { cn, getPizzaImagePath } from '@/helpers/utils';
import useSegmentedControl from '@/hooks/useSegmentedControl';
import { IMAGE_SIZE } from '@/constants/product.constants';
import usePizzaCustomizer from '@/hooks/usePizzaCustomizer';

export interface PizzaCustomizerProps extends ClassProps {
  product: NonNullable<ProductWithRelations>;
  sizes: Size[];
  doughTypes: DoughType[];
}

const PizzaCustomizer: React.FC<PizzaCustomizerProps> = ({ className, product, sizes, doughTypes }) => {
  const {
    sizeSegments,
    doughSegments,
    activeSize,
    setActiveSize,
    activeDoughType,
    setActiveDoughType,
    ingredients,
    ingredientClick,
    totalPrice
  } = usePizzaCustomizer({
    product,
    sizes,
    doughTypes
  });

  const doughSegmentControl = useSegmentedControl();
  const sizeSegmentControl = useSegmentedControl();
  console.log(getPizzaImagePath(product.image, activeDoughType));
  return (
    <div className={cn('flex items-start gap-10', className)}>
      <PizzaImage
        src={getPizzaImagePath(product.image, activeDoughType)}
        alt={product.name}
        size={IMAGE_SIZE}
        activeSize={activeSize}
      />
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
          <div className="flex max-w-[640px] gap-2 overflow-auto px-3 pb-6">
            {product.ingredients.map((ingred) => (
              <Button
                key={ingred.id}
                noStyles
                onClick={() => ingredientClick(ingred.id)}
                className={cn(
                  'border-background relative flex min-w-32 cursor-pointer flex-col items-center rounded-2xl border-2 px-2.5 py-3 shadow-lg transition-[border-color,box-shadow] hover:shadow-sm',
                  ingredients.includes(ingred.id) && 'border-foreground'
                )}>
                <Image src={ingred.image} alt={ingred.name} width={110} height={110} className="mb-1" />
                <p className="min-h-8 text-xs">{ingred.name}</p>
                <p className="text-sm font-bold">${ingred.price}</p>
                <CircleCheck
                  size={24}
                  className={cn(
                    'invisible absolute top-2 right-2 opacity-0 transition-[opacity,visibility]',
                    ingredients.includes(ingred.id) && 'visible opacity-100'
                  )}
                />
              </Button>
            ))}
          </div>
        </div>
        <Button className="mt-5 px-7 py-5">Add to cart for ${totalPrice}</Button>
      </div>
    </div>
  );
};

export default PizzaCustomizer;
