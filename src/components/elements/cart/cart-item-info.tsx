import React from 'react';

import { cn } from '@/helpers/utils';
import { SIZE_NAMES } from '@/constants/size.constants';
import { DOUGH_TYPE_NAMES } from '@/constants/dough-type.constants';
import type { SizeValues } from '@/shared/types/size.interface';
import type { ClassProps } from '@/types/common';
import type { DoughTypeValues } from '@/shared/types/dough-type.interface';
import type { CartItemState } from '@/shared/types/cart.interface';

interface CartItemInfoProps extends ClassProps, Pick<CartItemState, 'ingredients'> {
  name: string;
  sizeId: number | null;
  doughTypeId: number | null;
}

const CartItemInfo: React.FC<CartItemInfoProps> = ({ className, name, sizeId, doughTypeId, ingredients }) => {
  const sizeName = SIZE_NAMES[sizeId as SizeValues];
  const doughTypeName = DOUGH_TYPE_NAMES[doughTypeId as DoughTypeValues];

  const showDescription = sizeId || doughTypeId || (ingredients && ingredients.length > 0);

  return (
    <div className={cn('flex flex-col', className)}>
      <h3 className="font-bold">{name}</h3>
      {showDescription && (
        <p className="text-description lowercase">
          {sizeId && sizeName ? `${sizeName} pizza` : ''}
          {doughTypeId && doughTypeName ? `, ${doughTypeName} dough` : ''}
          {ingredients ? ` + ${ingredients.map((ingred) => ingred.name).join(', ')}` : ''}
        </p>
      )}
    </div>
  );
};

export default CartItemInfo;
