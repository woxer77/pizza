/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';

import SegmentGroup from '@/ui/segment-group';
import { Button } from '@/ui/button';
import Image from 'next/image';
import DashedCircle from '@/elements/dashed-circle';

import type { ClassProps } from '@/types/common';
import type { SegmentItem } from '@/types/common';
import type { ProductWithRelations } from '@/types/product.interface';
import type { Size, SizeValues } from '@/shared/types/size.interface';
import type { DoughType, DoughTypeValues } from '@/shared/types/dough-type.interface';

import { cn } from '@/helpers/utils';
import useSegmentedControl from '@/hooks/useSegmentedControl';
import { DOUGH_TYPES } from '@/constants/dough-type.constants';
import { SIZES } from '@/constants/size.constants';
import { IMAGE_SIZE } from '@/constants/product.constants';

interface ProductCustomizerProps extends ClassProps {
  product: NonNullable<ProductWithRelations>;
  sizes: Size[];
  doughTypes: DoughType[];
}

interface AvailableOptions {
  sizes: Partial<Record<SizeValues, DoughTypeValues[]>> & { ids: SizeValues[] };
  doughTypes: Partial<Record<DoughTypeValues, SizeValues[]>> & { ids: DoughTypeValues[] };
}

const ProductCustomizer: React.FC<ProductCustomizerProps> = ({ className, product, sizes, doughTypes }) => {
  // const variationsExist = product.variations.length > 0;

  const availableOptions = product.variations.reduce(
    (acc: AvailableOptions, variation) => {
      const sizeId = variation.size?.id as SizeValues;
      const doughTypeId = variation.doughType?.id as DoughTypeValues;

      if (sizeId !== undefined && !isNaN(sizeId)) {
        if (!acc.sizes[sizeId]) {
          acc.sizes[sizeId] = [];
          acc.sizes.ids.push(sizeId);
        }

        if (doughTypeId !== undefined && !acc.sizes[sizeId].includes(doughTypeId)) {
          acc.sizes[sizeId] = [...acc.sizes[sizeId], doughTypeId];
        }
      }

      if (doughTypeId !== undefined && !isNaN(doughTypeId)) {
        if (!acc.doughTypes[doughTypeId]) {
          acc.doughTypes[doughTypeId] = [];
          acc.doughTypes.ids.push(doughTypeId);
        }

        if (sizeId !== undefined && !acc.doughTypes[doughTypeId].includes(sizeId)) {
          acc.doughTypes[doughTypeId] = [...acc.doughTypes[doughTypeId], sizeId];
        }
      }
      return acc;
    },
    { sizes: { ids: [] }, doughTypes: { ids: [] } }
  );

  const sizeSegItems: SegmentItem<number>[] = sizes.map((size) => ({
    value: size.id,
    name: size.name,
    disabled: !availableOptions.sizes[size.id as SizeValues]?.length
  }));

  const defaultActiveSize = availableOptions.sizes.ids.includes(SIZES.LARGE)
    ? SIZES.LARGE
    : (availableOptions.sizes.ids.at(-1) ?? SIZES.SMALL); // delete ?? SIZES.SMALL when page with no variations be ready
  const [activeSize, setActiveSize] = React.useState<SizeValues>(defaultActiveSize);
  const [activeDoughType, setActiveDoughType] = React.useState<DoughTypeValues>(DOUGH_TYPES.TRADITIONAL);

  const doughSegItems: SegmentItem<number>[] = doughTypes.map((dough) => ({
    value: dough.id,
    name: dough.name,
    disabled: !availableOptions.sizes[activeSize]?.includes(dough.id as DoughTypeValues)
  }));

  const doughSegmentControl = useSegmentedControl();
  const sizeSegmentControl = useSegmentedControl();

  React.useEffect(() => {
    const availableDoughTypes = availableOptions.sizes[activeSize];
    if (availableDoughTypes && !availableDoughTypes.includes(activeDoughType)) {
      switch (activeDoughType) {
        case DOUGH_TYPES.TRADITIONAL:
          setActiveDoughType(DOUGH_TYPES.THIN);
          break;
        case DOUGH_TYPES.THIN:
          setActiveDoughType(DOUGH_TYPES.TRADITIONAL);
          break;
        default:
          const _exhaustiveCheck: never = activeDoughType;
          throw new Error(`Unexpected dough type: ${_exhaustiveCheck}`);
      }
    }
  }, [activeSize, availableOptions.sizes, activeDoughType]);

  return (
    <>
      <div className="relative">
        <Image
          src={product.image}
          alt={product.name}
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          className={cn(
            `size-[${IMAGE_SIZE}px] translate-1.5 transition-transform`,
            (activeSize === SIZES.SMALL && 'scale-[0.54]') ||
              (activeSize === SIZES.MEDIUM && 'scale-[0.70]') ||
              (activeSize === SIZES.LARGE && 'scale-[0.85]') ||
              (activeSize === SIZES.EXTRA_LARGE && 'scale-100')
          )}
        />
        <DashedCircle variant="outer" size={IMAGE_SIZE * 0.78} activeSize={activeSize} />
        <DashedCircle variant="inner" size={IMAGE_SIZE * 0.64} activeSize={activeSize} />
      </div>

      <div className={cn('flex min-h-[500px] flex-col items-start justify-between', className)}>
        <div>
          <div className="mb-6 flex flex-col gap-3">
            <h2 className="text-4xl font-extrabold">{product?.name}</h2>
            <p className="text-description text-sm">{product?.description}</p>
          </div>
          <div className="mb-6 flex flex-col gap-2">
            <SegmentGroup
              items={sizeSegItems}
              refs={sizeSegmentControl.refs}
              onClick={(value: number) => setActiveSize(value as SizeValues)}
              moveSegment={sizeSegmentControl.moveSegment}
              name="size"
              activeValue={activeSize}
              itemClassName="text-sm"
            />
            <SegmentGroup
              items={doughSegItems}
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
            {product?.ingredients.map((ingred) => (
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
        <Button className="mt-5 px-7 py-5">Add to cart for ${product?.basePrice} + ...</Button>
      </div>
    </>
  );
};

export default ProductCustomizer;
