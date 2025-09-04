import React from 'react';

import Search from '@/ui/search';
import Image from 'next/image';
import { Button } from '@/ui/button';
import { User } from 'lucide-react';
import Link from 'next/link';
import CartButton from '@/ui/cart-button';

import type { ClassProps } from '@/types/common';
import { cn } from '@/helpers/utils';

const Header: React.FC<ClassProps> = ({ className }) => {
  return (
    <header className={cn('w-full border-b-1 border-neutral-300', className)}>
      <div className="container mx-auto flex items-center py-10">
        <Link href="/" className="flex shrink-0 gap-x-4">
          <Image src="/icon.svg" alt="logo" width={42} height={42} priority />
          <div className="flex flex-col">
            <h1 className="text-2xl font-black">NEXT PIZZA</h1>
            <h3 className="-mt-1.5 text-neutral-500">fast. cheap. tasty.</h3>
          </div>
        </Link>
        <Search placeholder="I would like..." />
        <div className="flex gap-3">
          <Button variant="outline">
            <User size={16} />
            Sign In
          </Button>
          <CartButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
