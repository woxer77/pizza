'use client';

import React from 'react';

import PizzaImage from '@/elements/pizza-image';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/ui/dialog';
import SegmentGroup from '@/ui/segment-group';
import { Button } from '@/ui/button';
import IngredientCart from '@/elements/ingredient-cart';

import { useRouter } from 'next/navigation';
import { cn, getProductImagePath } from '@/helpers/utils';
import usePizzaCustomizer from '@/hooks/usePizzaCustomizer';
import useSegmentedControl from '@/hooks/useSegmentedControl';
import { IMAGE_SIZE } from '@/constants/product.constants';

import type { ClassProps } from '@/types/common';
import type { ProductWithRelations } from '@/shared/types/product.interface';
import type { Size, SizeValues } from '@/shared/types/size.interface';
import type { DoughType, DoughTypeValues } from '@/shared/types/dough-type.interface';

interface ProductModalProps extends ClassProps {
  product: NonNullable<ProductWithRelations>;
  sizes: Size[];
  doughTypes: DoughType[];
}

const ProductModal: React.FC<ProductModalProps> = ({ className, product, sizes, doughTypes }) => {
  const router = useRouter();

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
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn('grid h-[580px] !max-w-[1000px] grid-cols-[5fr_4fr] rounded-3xl border-0 p-0', className)}>
        <PizzaImage
          src={getProductImagePath(product.image, activeDoughType)}
          alt={product.name}
          size={IMAGE_SIZE}
          activeSize={activeSize}
        />
        <div className="flex flex-col items-start justify-between overflow-hidden rounded-r-3xl bg-[#F6F7F8] pt-10">
          <div className="w-full overflow-auto px-10">
            <div className="mb-6 flex flex-col gap-3">
              <DialogTitle className="text-4xl font-extrabold">{product.name}</DialogTitle>
              <DialogDescription className="text-sm text-neutral-500">{product.description}</DialogDescription>
            </div>
            <div className="mb-6 flex w-full flex-col gap-2">
              <SegmentGroup
                items={sizeSegments}
                refs={sizeSegmentControl.refs}
                onClick={(value: number) => setActiveSize(value as SizeValues)}
                moveSegment={sizeSegmentControl.moveSegment}
                name="size"
                activeValue={activeSize}
                itemClassName="text-sm"
                className="bg-[#ECECEC]"
              />
              <SegmentGroup
                items={doughSegments}
                refs={doughSegmentControl.refs}
                onClick={(value: number) => setActiveDoughType(value as DoughTypeValues)}
                moveSegment={doughSegmentControl.moveSegment}
                name="dough-type"
                activeValue={activeDoughType}
                itemClassName="capitalize text-sm"
                className="bg-[#ECECEC]"
              />
            </div>
            <h4 className="mb-4 text-lg font-bold">Ingredients</h4>
            <div className="mb-3 grid grid-cols-3 gap-2">
              {product.ingredients.map((ingredient) => (
                <IngredientCart
                  key={ingredient.id}
                  ingredient={ingredient}
                  onClick={() => ingredientClick(ingredient.id)}
                  isActive={ingredients.includes(ingredient.id)}
                />
              ))}
            </div>
          </div>
          <div className="flex-center w-full px-10">
            <Button className="m-5 w-full py-5">Add to cart for ${totalPrice}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
