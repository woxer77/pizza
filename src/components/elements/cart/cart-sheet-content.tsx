'use client';

import React from 'react';

import { Button } from '@/ui/button';
import { SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/ui/sheet';
import Link from 'next/link';
import EmptyCart from '@/components/elements/cart/empty-cart';
// @ts-ignore
import CartItem from '@/components/elements/cart/cart-item';

import { cn } from '@/helpers/utils';
import useFetch from '@/hooks/useFetch';
import Api from '@/services/api-client';
import type { ClassProps } from '@/types/common';

const CartSheetContent: React.FC<ClassProps> = ({ className }) => {
  const cart = useFetch({ fetchFunc: Api.cart.getByToken, args: [123] });

  const itemsNumber = cart.data?.items.length || 0;
  const moreThanOne = cart.data?.items && cart.data?.items.length > 1;

  return (
    <SheetContent
      className={cn('bg-background-second flex flex-col gap-0', className)}
      showX={itemsNumber > 0}
      sizeX="medium">
      {cart && cart.data ? (
        <>
          <SheetHeader className="flex flex-row items-end">
            <SheetTitle className="text-lg">Cart -</SheetTitle>
            <SheetDescription className="text-foreground text-lg">
              {itemsNumber} {moreThanOne ? 'items' : 'item'}
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-1 flex-col gap-2 overflow-auto">
            {cart.data.items.map((item) => (
              <CartItem
                key={item.id}
                name={item.productVariation?.product?.name}
                image={item.productVariation?.product?.image}
                size={item.productVariation?.sizeId}
                doughType={item.productVariation?.doughTypeId}
                ingredients={item.ingredients.length > 0 ? item.ingredients : null}
                quantity={item.quantity}
                totalPrice={item.totalPrice}
              />
            ))}
          </div>
          <SheetFooter className="bg-background mt-4">
            <section className="mt-auto flex flex-col gap-5">
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
