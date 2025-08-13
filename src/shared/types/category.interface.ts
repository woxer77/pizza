import type { Category, Ingredient, ProductVariation } from '@prisma/client';
import type { Product } from './product.interface';

export type CategoryWithProducts = Category & {
  products: (Product & {
    ingredients: Ingredient[];
    variations: ProductVariation[];
  })[];
};
