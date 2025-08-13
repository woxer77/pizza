// eslint-disable-next-line
import type { Product as PrismaProduct } from '@prisma/client';

export const ProductSortBy = {
  POPULAR: 'popular',
  NEW: 'new',
  ASCENDING: 'ascending',
  DESCENDING: 'descending'
} as const;

export type ProductSortByValue = (typeof ProductSortBy)[keyof typeof ProductSortBy];

export interface Product extends Omit<PrismaProduct, 'basePrice'> {
  basePrice: number;
}
