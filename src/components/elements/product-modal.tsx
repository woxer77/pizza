'use client';

import React from 'react';

import PizzaImage from '@/elements/pizza-image';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/ui/dialog';
import SegmentGroup from '@/ui/segment-group';
import Image from 'next/image';
import { CircleCheck } from 'lucide-react';
import { Button } from '@/ui/button';

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
      <DialogContent className={cn('flex h-[580px] !max-w-[1000px] rounded-3xl p-0', className)}>
        <PizzaImage
          src={getProductImagePath(product.image, activeDoughType)}
          alt={product.name}
          size={IMAGE_SIZE}
          activeSize={activeSize}
          // className="translate-1"
        />
        <div className="flex w-1/2 flex-col items-start justify-between overflow-auto bg-[#F6F7F8] p-10">
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
          <div className="grid max-h-[200px] w-full grid-cols-3 gap-2">
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
          <Button className="mt-5 w-full px-7 py-5">Add to cart for ${totalPrice}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
