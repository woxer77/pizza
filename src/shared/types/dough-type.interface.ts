// eslint-disable-next-line
import type { DoughType as PrismaDoughType } from '@prisma/client';

export interface DoughType extends Omit<PrismaDoughType, 'price'> {
  price: number;
}
