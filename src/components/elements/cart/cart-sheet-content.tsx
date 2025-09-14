'use client';

import React from 'react';

import { Button } from '@/ui/button';
import { SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/ui/sheet';
import Link from 'next/link';
import EmptyCart from '@/components/elements/cart/empty-cart';
// @ts-ignore
import CartItem from '@/components/elements/cart/cart-item';

import { cn } from '@/helpers/utils';
import { useCartStore } from '@/store/cart';
import type { ClassProps } from '@/types/common';

const CartSheetContent: React.FC<ClassProps> = ({ className }) => {
  const fetchCartItems = useCartStore((state) => state.fetchItems);
  const cartItems = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const loading = useCartStore((state) => state.loading);

  React.useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const itemsNumber = cartItems.length || 0;
  const moreThanOne = cartItems && cartItems.length > 1;

  return (
    <SheetContent
      className={cn('bg-background-second flex flex-col gap-0', className)}
      showX={itemsNumber > 0}
      sizeX="medium">
      {itemsNumber > 0 ? (
        <>
          <SheetHeader className="flex flex-row items-end">
            <SheetTitle className="text-lg">Cart -</SheetTitle>
            <SheetDescription className="text-foreground text-lg">
              {itemsNumber} {moreThanOne ? 'items' : 'item'}
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-1 flex-col gap-2 overflow-auto">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.image}
                sizeId={item.sizeId}
                doughTypeId={item.doughTypeId}
                ingredients={item.ingredients}
                quantity={item.quantity}
                price={item.price}
              />
            ))}
          </div>
          <SheetFooter className="bg-background mt-4">
            <section className="mt-auto flex flex-col gap-5">
              <div className="flex items-end gap-2">
                <p className="leading-none">Total:</p>
                <span className="w-full border-b border-dashed border-neutral-400" />
                <p className={cn('text-lg leading-none font-bold', loading && 'animate-pulse')}>${totalPrice}</p>
              </div>
              <div className="flex items-end gap-2">
                <p className="leading-none">Taxes:</p>
                <span className="w-full border-b border-dashed border-neutral-400" />
                <p className={cn('text-lg leading-none font-bold', loading && 'animate-pulse')}>
                  ${(totalPrice * 0.04).toFixed(2)}
                </p>
              </div>
              <Button asChild type="submit" className="py-5">
                <Link href="/checkout">Place an order</Link>
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

export default CartSheetContent;
