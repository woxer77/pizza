'use client';

import React from 'react';

import Image from 'next/image';
import { Button } from '@/ui/button';

import type { ClassProps } from '@/types/common';
import { cn } from '@/helpers/utils';
import { MIN_CART_QUANTITY, MAX_CART_QUANTITY } from '@/constants/common';

const CartItem: React.FC<ClassProps> = ({ className }) => {
  const [quantity, setQuantity] = React.useState(1); // by default - from props

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

  return (
    <section className={cn('bg-background flex w-full gap-6 p-5', className)}>
      <Image
        src="/pizza/traditional/four-cheese.png"
        alt="pizza image"
        width={65}
        height={65}
        className="mr-6 size-[65px]"
      />
      <div className="flex w-full flex-col">
        <div className="flex flex-col">
          <h3 className="font-bold">Test pizza</h3>
          <p className="text-description">Description test</p>
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
          <p className="font-bold">$54</p>
        </div>
      </div>
    </section>
  );
};

export default CartItem;
