import React from 'react';

import { SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/ui/sheet';
import { Button } from '@/ui/button';
import EmptyCart from '@/elements/empty-cart';

import type { ClassProps } from '@/types/common';
import { cn } from '@/helpers/utils';
import CartItem from './cart-item';

const CartSheet: React.FC<ClassProps> = ({ className }) => {
  const items_number = 2;
  const moreThanOne = items_number > 1;

  return (
    <SheetContent className={cn('bg-background-second gap-0', className)} showX={items_number > 0} sizeX="medium">
      {items_number > 0 ? (
        <>
          <SheetHeader>
            <SheetTitle className="text-xl">
              Cart -
              <strong className="font-extrabold">
                {' '}
                {items_number} {moreThanOne ? 'items' : 'item'}
              </strong>
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-2 overflow-auto">
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
          </div>
          <SheetFooter className="bg-background mt-4">
            <section className="flex flex-col gap-5">
              <div className="flex items-end gap-2">
                <p className="leading-none">Total:</p>
                <span className="w-full border-b border-dashed border-neutral-400" />
                <p className="text-lg leading-none font-bold">$84</p>
              </div>
              <div className="flex items-end gap-2">
                <p className="leading-none">Taxes:</p>
                <span className="w-full border-b border-dashed border-neutral-400" />
                <p className="text-lg leading-none font-bold">$4</p>
              </div>
              <Button type="submit" className="py-5">
                Save changes
              </Button>
            </section>
          </SheetFooter>
        </>
      ) : (
        <EmptyCart />
      )}
    </SheetContent>
  );
};

export default CartSheet;
