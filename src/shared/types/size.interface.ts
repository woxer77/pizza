// eslint-disable-next-line
import type { Size as PrismaSize } from '@prisma/client';
import type { SIZES } from '@/constants/size.constants';

export interface Size extends Omit<PrismaSize, 'price'> {
  price: number;
}

export type SizeValues = (typeof SIZES)[keyof typeof SIZES];
