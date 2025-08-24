// eslint-disable-next-line
import type { DoughType as PrismaDoughType } from '@prisma/client';
import type { DOUGH_TYPES } from '@/constants/dough-type.constants';

export interface DoughType extends Omit<PrismaDoughType, 'price'> {
  price: number;
}

export type DoughTypeValues = (typeof DOUGH_TYPES)[keyof typeof DOUGH_TYPES];
