/* eslint-disable */
import type { Prisma, Cart as PrismaCart, ProductVariation } from '@prisma/client';
import type { CartItem as PrismaCartItem } from '@prisma/client';
import type { getCartByToken } from '@/lib/carts';

export interface Cart extends Omit<PrismaCart, 'totalPrice'> {
  totalPrice: number;
}

export interface CartItem extends Omit<PrismaCartItem, 'totalPrice'> {
  totalPrice: number;
}

export type CartWithRelations = Prisma.PromiseReturnType<typeof getCartByToken>;
