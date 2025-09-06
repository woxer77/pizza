'use client';

import React from 'react';

import Image from 'next/image';
import QuantityControl from './quantity-control';

import { cn, getProductImagePath } from '@/helpers/utils';
import { MIN_CART_QUANTITY, MAX_CART_QUANTITY } from '@/constants/common';
import type { ClassProps } from '@/types/common';
import type { CartItem, QuantityControlType } from '@/shared/types/cart.interface';
import type { Ingredient } from '@/shared/types/ingredient.interface';
import type { ButtonStates } from '@/shared/types/cart.interface';
import CartItemInfo from './cart-item-info';

interface CartItemProps extends ClassProps {
  name: string;
  size: number | null;
  doughType: number | null;
  quantity: number;
  image: string;
  ingredients: Ingredient[] | null;
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

  const quantityControlHandler = (type: QuantityControlType) => {
    switch (type) {
      case 'decrease':
        setQuantity((prev) => {
          if (prev - 1 >= MIN_CART_QUANTITY) return prev - 1;
          return prev;
        });
        break;
      case 'increase':
        setQuantity((prev) => {
          if (prev + 1 <= MAX_CART_QUANTITY) return prev + 1;
          return prev;
        });
        break;
      default:
        const _exhaustiveCheck: never = type;
        throw new Error(`Unhandled case: ${_exhaustiveCheck}`);
    }
  };

  const buttonStates: ButtonStates = {
    decrease: quantity <= MIN_CART_QUANTITY,
    increase: quantity >= MAX_CART_QUANTITY
  };

  return (
    <section className={cn('bg-background flex w-full gap-6 p-5', className)}>
      <Image src={getProductImagePath(image)} alt={name} width={65} height={65} className="mr-6 size-[65px]" />
      <div className="flex w-full flex-col">
        <CartItemInfo name={name} size={size} doughType={doughType} ingredients={ingredients} />
        <hr className="my-3" />
        <div className="flex-space-between">
          <div className="flex items-center gap-2">
            <QuantityControl onClick={quantityControlHandler} quantity={quantity} disabled={buttonStates} />
          </div>
          <p className="font-bold">${(totalPrice * quantity).toFixed(2)}</p>
        </div>
      </div>
    </section>
  );
};

export default CartItem;
