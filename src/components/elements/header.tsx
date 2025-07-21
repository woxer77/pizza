import React from 'react';

import Image from 'next/image';
import { Button } from '@/ui/button';
import { User, ShoppingCart, MoveRight } from 'lucide-react';

import type { ClassProps } from '@/types/common';
import { cn } from '@/lib/utils';

const Header: React.FC<ClassProps> = ({ className }) => {
  const TEMP_SUM = 150;
  const TEMP_PRODUCT_COUNT = 3;

  return (
    <header
      className={cn('container mx-auto flex items-center py-10', className)}
    >
      <div className="flex shrink-0 gap-x-4">
        <Image src="/icon.svg" alt="logo" width={42} height={42}></Image>
        <div className="flex flex-col">
          <h1 className="text-2xl font-black">NEXT PIZZA</h1>
          <h3 className="-mt-1.5 text-neutral-500">fast. cheap. tasty.</h3>
        </div>
      </div>
      <div className="flex gap-3">
        <Button variant="outline">
          <User size={16} />
          Sign In
        </Button>
        <Button className="group flex gap-3.5">
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
        </Button>
      </div>
    </header>
  );
};

export default Header;
