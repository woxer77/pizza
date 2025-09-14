'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import QuantityControl from './quantity-control';
import CartItemInfo from './cart-item-info';

import { cn, getProductImagePath } from '@/helpers/utils';
import { MIN_CART_QUANTITY, MAX_CART_QUANTITY } from '@/constants/common';
import { useCartStore } from '@/store/cart';
import useDebounce from '@/hooks/use-debounce';
import type { ClassProps } from '@/types/common';
import type { CartItem, CartItemState, QuantityControlType } from '@/shared/types/cart.interface';
import type { ButtonStates } from '@/shared/types/cart.interface';

interface CartItemProps extends ClassProps, CartItemState {}

const CartItem: React.FC<CartItemProps> = ({
  className,
  id,
  name,
  sizeId,
  doughTypeId,
  quantity: initialQuantity,
  image,
  ingredients,
  price
}) => {
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
  const loading = useCartStore((state) => state.loading);
  const [quantity, setQuantity] = useState(initialQuantity);
  const debouncedQuantity = useDebounce(quantity, 300);

  useEffect(() => {
    if (debouncedQuantity !== initialQuantity) {
      updateItemQuantity(id, debouncedQuantity);
    }
  }, [debouncedQuantity, id, updateItemQuantity, initialQuantity]);

  const quantityControlHandler = (type: QuantityControlType) => {
    switch (type) {
      case 'decrease':
        if (quantity - 1 >= MIN_CART_QUANTITY) {
          setQuantity(quantity - 1);
        }
        break;
      case 'increase':
        if (quantity + 1 <= MAX_CART_QUANTITY) {
          setQuantity(quantity + 1);
        }
        break;
      default:
        const _exhaustiveCheck: never = type;
        throw new Error(`Unhandled case: ${_exhaustiveCheck}`);
    }
  };

  const buttonStates: ButtonStates = {
    decrease: quantity <= MIN_CART_QUANTITY || loading,
    increase: quantity >= MAX_CART_QUANTITY || loading
  };

  return (
    <section className={cn('bg-background flex w-full gap-6 p-5', className)}>
      <Image src={getProductImagePath(image)} alt={name} width={65} height={65} className="mr-6 size-[65px]" />
      <div className="flex w-full flex-col">
        <CartItemInfo id={id} name={name} sizeId={sizeId} doughTypeId={doughTypeId} ingredients={ingredients} />
        <hr className="my-3" />
        <div className="flex-space-between">
          <div className="flex items-center gap-2">
            <QuantityControl
              onClick={quantityControlHandler}
              quantity={quantity}
              disabled={buttonStates}
              loading={loading}
            />
          </div>
          <p className={cn('font-bold', loading && 'animate-pulse')}>${price}</p>
        </div>
      </div>
    </section>
  );
};

export default CartItem;
