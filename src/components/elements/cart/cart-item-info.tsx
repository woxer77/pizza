'use client';

import React from 'react';

import { Trash2 } from 'lucide-react';

import { cn } from '@/helpers/utils';
import { SIZE_NAMES } from '@/constants/size.constants';
import { DOUGH_TYPE_NAMES } from '@/constants/dough-type.constants';
import { useCartStore } from '@/store/cart';
import type { SizeValues } from '@/shared/types/size.interface';
import type { ClassProps } from '@/types/common';
import type { DoughTypeValues } from '@/shared/types/dough-type.interface';
import type { CartItemState } from '@/shared/types/cart.interface';

interface CartItemInfoProps extends ClassProps, Pick<CartItemState, 'ingredients' | 'id'> {
  name: string;
  sizeId: number | null;
  doughTypeId: number | null;
}

const CartItemInfo: React.FC<CartItemInfoProps> = ({ className, id, name, sizeId, doughTypeId, ingredients }) => {
  const deleteItem = useCartStore((state) => state.deleteItem);

  const sizeName = SIZE_NAMES[sizeId as SizeValues];
  const doughTypeName = DOUGH_TYPE_NAMES[doughTypeId as DoughTypeValues];

  const showDescription = sizeId || doughTypeId || (ingredients && ingredients.length > 0);

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex-space-between">
        <h3 className="w-fit font-bold">{name}</h3>
        <button
          type="button"
          onClick={() => deleteItem(id)}
          className="cursor-pointer border-none bg-transparent stroke-neutral-400 p-0">
          <Trash2 size={20} />
        </button>
      </div>
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
