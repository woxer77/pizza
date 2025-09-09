/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';

import SegmentGroup from '@/ui/segment-group';
import { Button } from '@/ui/button';
import PizzaImage from '@/elements/pizza-image';
import IngredientCard from '@/components/elements/ingredient-card';

import type { ClassProps } from '@/types/common';
import type { ProductWithRelations } from '@/types/product.interface';
import type { Size, SizeValues } from '@/shared/types/size.interface';
import type { DoughType, DoughTypeValues } from '@/shared/types/dough-type.interface';

import { cn, getProductImagePath } from '@/helpers/utils';
import useSegmentedControl from '@/hooks/use-segmented-control';
import { IMAGE_SIZE } from '@/constants/product.constants';
import usePizzaCustomizer from '@/hooks/use-pizza-customizer';

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

  return (
    <div className={cn('grid grid-cols-[3fr_5fr] gap-10', className)}>
      <PizzaImage
        src={getProductImagePath(product.image, activeDoughType)}
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
            {product.ingredients.map((ingredient) => (
              <IngredientCard
                key={ingredient.id}
                ingredient={ingredient}
                isActive={ingredients.includes(ingredient.id)}
                onClick={() => ingredientClick(ingredient.id)}
              />
            ))}
          </div>
        </div>
        <Button className="mt-5 px-7 py-5">Add to cart for ${totalPrice}</Button>
      </div>
    </div>
  );
};

export default PizzaCustomizer;
