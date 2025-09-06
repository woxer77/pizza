import React from 'react';

import { cn } from '@/helpers/utils';
import { SIZE_NAMES } from '@/constants/size.constants';
import { DOUGH_TYPE_NAMES } from '@/constants/dough-type.constants';
import type { SizeValues } from '@/shared/types/size.interface';
import type { ClassProps } from '@/types/common';
import type { DoughTypeValues } from '@/shared/types/dough-type.interface';
import type { Ingredient } from '@/shared/types/ingredient.interface';

interface CartItemInfoProps extends ClassProps {
  name: string;
  size: number | null;
  doughType: number | null;
  ingredients: Ingredient[] | null;
}

const CartItemInfo: React.FC<CartItemInfoProps> = ({ className, name, size, doughType, ingredients }) => {
  const sizeName = SIZE_NAMES[size as SizeValues];
  const doughTypeName = DOUGH_TYPE_NAMES[doughType as DoughTypeValues];

  const showDescription = size || doughType || ingredients;

  return (
    <div className={cn('flex flex-col', className)}>
      <h3 className="font-bold">{name}</h3>
      {showDescription && (
        <p className="text-description lowercase">
          {size && sizeName ? `${sizeName} pizza` : ''}
          {doughType && doughTypeName ? `, ${doughTypeName} dough` : ''}
          {ingredients ? ` + ${ingredients.map((ingred) => ingred.name).join(', ')}` : ''}
        </p>
      )}
    </div>
  );
};

export default CartItemInfo;
