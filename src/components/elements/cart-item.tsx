'use client';

import React from 'react';

import Image from 'next/image';
import { Button } from '@/ui/button';

import { cn, getProductImagePath } from '@/helpers/utils';
import { SIZE_NAMES } from '@/constants/size.constants';
import { MIN_CART_QUANTITY, MAX_CART_QUANTITY } from '@/constants/common';
import { DOUGH_TYPE_NAMES } from '@/constants/dough-type.constants';
import type { ClassProps } from '@/types/common';
import type { CartItem } from '@/shared/types/cart.interface';
import type { Ingredient } from '@/shared/types/ingredient.interface';
import type { SizeValues } from '@/shared/types/size.interface';
import type { DoughTypeValues } from '@/shared/types/dough-type.interface';

interface CartItemProps extends ClassProps {
  name: string;
  size?: number | null;
  doughType?: number | null;
  quantity: number;
  image: string;
  ingredients?: Ingredient[];
  totalPrice: number;
}

const CartItem: React.FC<CartItemProps> = ({
  className,
  name,
  size,
  doughType,
  quantity: initialQuantity,
  image,
  ingredients,
  totalPrice
}) => {
  const [quantity, setQuantity] = React.useState(initialQuantity);

  const decreaseQuantity = () => {
    setQuantity((prev) => {
      if (prev - 1 >= MIN_CART_QUANTITY) return prev - 1;
      return prev;
    });
  };

  const increaseQuantity = () => {
    setQuantity((prev) => {
      if (prev + 1 <= MAX_CART_QUANTITY) return prev + 1;
      return prev;
    });
  };

  const sizeName = SIZE_NAMES[size as SizeValues];
  const doughTypeName = DOUGH_TYPE_NAMES[doughType as DoughTypeValues];

  return (
    <section className={cn('bg-background flex w-full gap-6 p-5', className)}>
      <Image src={getProductImagePath(image)} alt={name} width={65} height={65} className="mr-6 size-[65px]" />
      <div className="flex w-full flex-col">
        <div className="flex flex-col">
          <h3 className="font-bold">{name}</h3>
          <p className="text-description lowercase">
            {size && sizeName ? `${sizeName} pizza` : ''}
            {doughType && doughTypeName ? `, ${doughTypeName} dough` : ''}
            {ingredients ? ` + ${ingredients.map((ingred) => ingred.name).join(', ')}` : ''}
          </p>
        </div>
        <hr className="my-3" />
        <div className="flex-space-between">
          <div className="flex items-center gap-2">
            <Button onClick={decreaseQuantity} variant="outline" size="sm" className="text-xl font-bold">
              -
            </Button>
            <p className="font-bold">{quantity}</p>
            <Button onClick={increaseQuantity} variant="outline" size="sm" className="text-xl font-bold">
              +
            </Button>
          </div>
          <p className="font-bold">${totalPrice.toFixed(2)}</p>
        </div>
      </div>
    </section>
  );
};

export default CartItem;
