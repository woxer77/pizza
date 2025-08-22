'use client';

import React from 'react';

import SegmentGroup from '@/ui/segment-group';
import { Button } from '@/ui/button';
import Image from 'next/image';

import type { ClassProps } from '@/types/common';
import { cn } from '@/helpers/utils';
// import type { SegmentItem } from '@/types/common';
// import type { DoughType } from '@/shared/types/dough-type.interface';
// import type { Size } from '@/shared/types/size.interface';
import useSegmentedControl from '@/hooks/useSegmentedControl';
import type { ProductWithRelations } from '@/types/product.interface';

interface ProductCustomizerProps extends ClassProps {
  product: ProductWithRelations;
}

const ProductCustomizer: React.FC<ProductCustomizerProps> = ({ className, product }) => {
  /* const doughTypes: SegmentItem<string>[] = product.variations
    .map((variation: unknown) => {
      if (typeof variation === 'object' && variation !== null && 'doughType' in variation) {
        return variation.doughType as DoughType;
      }
    })
    .filter((item) => item !== null && item !== undefined)
    .map((item) => ({ value: item.id.toString(), name: item.name })); */
  const doughTypes = [
    {
      value: '1',
      name: 'traditional'
    },
    {
      value: '2',
      name: 'thin'
    }
  ];

  /* const sizes: SegmentItem<string>[] = product.variations
    .map((variation: unknown) => {
      if (typeof variation === 'object' && variation !== null && 'size' in variation) {
        return variation.size as Size;
      }
    })
    .filter((item) => item !== null && item !== undefined)
    .map((item) => ({ value: item.id.toString(), name: item.name })); */
  const sizes = [
    {
      value: '20',
      name: '20 cm'
    },
    {
      value: '25',
      name: '25 cm'
    },
    {
      value: '30',
      name: '30 cm'
    },
    {
      value: '35',
      name: '35 cm'
    }
  ];

  const doughSegmentControl = useSegmentedControl();
  const sizeSegmentControl = useSegmentedControl();
  const [doughType, setDoughType] = React.useState(doughTypes[0].value);
  const [size, setSize] = React.useState(sizes[0].value);

  return (
    <div className={cn('flex min-h-[500px] flex-col items-start justify-between', className)}>
      <div>
        <div className="mb-6 flex flex-col gap-3">
          <h2 className="text-4xl font-extrabold">{product?.name}</h2>
          <p className="text-description text-sm">{product?.description}</p>
        </div>
        <div className="mb-6 flex flex-col gap-5">
          <SegmentGroup
            items={doughTypes}
            refs={doughSegmentControl.refs}
            setState={setDoughType}
            moveSegment={doughSegmentControl.moveSegment}
            name="dough-type"
            activeValue={doughType}
            itemClassName="capitalize"
          />
          <SegmentGroup
            items={sizes}
            refs={sizeSegmentControl.refs}
            setState={setSize}
            moveSegment={sizeSegmentControl.moveSegment}
            name="size"
            activeValue={size}
            itemClassName="text-sm"
          />
        </div>
        <div>
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
      </div>
      <Button className="mt-5 px-7 py-5">Add to cart for ${product?.basePrice} + ...</Button>
    </div>
  );
};

export default ProductCustomizer;
