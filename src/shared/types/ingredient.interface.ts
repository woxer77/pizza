// eslint-disable-next-line
import type { Ingredient as PrismaIngredient } from '@prisma/client';

export interface Ingredient extends Omit<PrismaIngredient, 'price'> {
  price: number;
}
