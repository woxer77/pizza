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

export type QuantityControlType = 'decrease' | 'increase';

export type ButtonStates = Record<QuantityControlType, boolean>;

export interface CartItemState {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
  sizeId: number | null;
  doughTypeId: number | null;
  ingredients: Array<{ name: string; price: number }> | null;
}

export interface CartState {
  totalPrice: number;
  items: CartItemState[];
  loading: boolean;
  error: boolean;

  fetchItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  createItem: () => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
}
