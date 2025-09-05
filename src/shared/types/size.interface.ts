// eslint-disable-next-line
import type { Size as PrismaSize } from '@prisma/client';
import type { SIZE_VALUES } from '@/constants/size.constants';

export interface Size extends Omit<PrismaSize, 'price'> {
  price: number;
}

export type SizeValues = (typeof SIZE_VALUES)[keyof typeof SIZE_VALUES];
export type SizeKeys = keyof typeof SIZE_VALUES;
