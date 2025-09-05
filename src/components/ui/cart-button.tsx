import React from 'react';

import { Button } from '@/ui/button';
import { MoveRight, ShoppingCart } from 'lucide-react';
import CartSheet from '@/elements/cart-sheet';

import type { ClassProps } from '@/types/common';
import { cn } from '@/helpers/utils';

const CartButton: React.FC<ClassProps> = ({ className }) => {
  const TEMP_SUM = 150;
  const TEMP_PRODUCT_COUNT = 3;

  return (
    <CartSheet>
      <Button asChild className={cn('group flex gap-3.5', className)}>
        <div>
          <p className="font-bold">{`$${TEMP_SUM}`}</p>
          <span className="h-full w-[1px] bg-neutral-500" />
          <div className="relative">
            <div className="flex items-center justify-center gap-1.5 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-0">
              <ShoppingCart size={16} />
              <p className="font-bold">{TEMP_PRODUCT_COUNT}</p>
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
