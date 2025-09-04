import React from 'react';

import { MoveLeft } from 'lucide-react';
import { Button } from '@/ui/button';
import { SheetHeader, SheetTitle, SheetDescription, SheetClose } from '@/ui/sheet';
import Image from 'next/image';

import type { ClassProps } from '@/types/common';
import { cn } from '@/helpers/utils';

const EmptyCart: React.FC<ClassProps> = ({ className }) => {
  return (
    <div className={cn('flex-center mx-auto h-full w-3/5 flex-col', className)}>
      <div className="flex-center mb-5 flex-col">
        <Image src="/empty-cart.png" alt="empty cart" width={150} height={150} />
        <SheetHeader className="text-center">
          <SheetTitle className="text-2xl font-semibold">The cart is empty</SheetTitle>
          <SheetDescription className="text-description text-base">
            Add at least one pizza to place an order
          </SheetDescription>
        </SheetHeader>
      </div>
      <SheetClose asChild>
        <Button className="group h-10 w-full">
          <div className="transition-transform duration-300 group-hover:-translate-x-2">
            <MoveLeft />
          </div>
          Go back
        </Button>
      </SheetClose>
    </div>
  );
};

export default EmptyCart;
