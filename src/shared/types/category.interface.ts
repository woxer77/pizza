import type { Category, ProductVariation } from '@prisma/client';
import type { Product } from './product.interface';
import type { Ingredient } from './ingredient.interface';

export type CategoryWithProducts = Category & {
  products: (Product & {
    ingredients: Ingredient[];
    variations: ProductVariation[];
  })[];
};
