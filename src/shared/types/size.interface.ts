// eslint-disable-next-line
import type { Size as PrismaSize } from '@prisma/client';

export interface Size extends Omit<PrismaSize, 'price'> {
  price: number;
}
