'use client';

import React from 'react';

import { Button } from '@/ui/button';
import { MoveRight, ShoppingCart } from 'lucide-react';
import CartSheet from '@/elements/cart/cart-sheet';

import type { ClassProps } from '@/types/common';
import { cn } from '@/helpers/utils';
import { useCartStore } from '@/store/cart';

const CartButton: React.FC<ClassProps> = ({ className }) => {
  const totalPrice = useCartStore((state) => state.totalPrice);
  const items = useCartStore((state) => state.items);
  const loading = useCartStore((state) => state.loading);

  return (
    <CartSheet>
      <Button asChild className={cn('group flex gap-3.5', className)}>
        <div>
          <p className={cn('font-bold', loading && 'animate-pulse')}>{`$${totalPrice}`}</p>
          <span className="h-full w-[1px] bg-neutral-500" />
          <div className="relative">
            <div className="transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-0">
              <div className={cn('flex-center gap-1.5', loading && 'animate-pulse')}>
                <ShoppingCart size={16} />
                <p className="font-bold">{items.length}</p>
              </div>
            </div>
            <div className="absolute top-1/2 -left-3 -translate-y-1/2 opacity-0 transition-all duration-300 group-hover:translate-x-4 group-hover:opacity-100">
              <MoveRight size={24} />
            </div>
          </div>
        </div>
      </Button>
    </CartSheet>
  );
};

export default CartButton;
