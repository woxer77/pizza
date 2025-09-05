import React from 'react';

import { Sheet, SheetTrigger } from '@/ui/sheet';
import CartSheetContent from '@/elements/cart-sheet-content';

import type { ClassProps } from '@/types/common';

interface CartSheetProps extends React.PropsWithChildren, ClassProps {}

const CartSheet: React.FC<CartSheetProps> = ({ children }) => {
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <CartSheetContent />
    </Sheet>
  );
};

export default CartSheet;
