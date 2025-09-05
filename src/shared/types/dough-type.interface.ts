// eslint-disable-next-line
import type { DoughType as PrismaDoughType } from '@prisma/client';
import type { DOUGH_TYPE_VALUES } from '@/constants/dough-type.constants';

export interface DoughType extends Omit<PrismaDoughType, 'price'> {
  price: number;
}

export type DoughTypeValues = (typeof DOUGH_TYPE_VALUES)[keyof typeof DOUGH_TYPE_VALUES];
export type DoughTypeKeys = keyof typeof DOUGH_TYPE_VALUES;
