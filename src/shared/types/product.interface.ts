// eslint-disable-next-line
import type { Prisma, Product as PrismaProduct } from '@prisma/client';
import type { getProductWithRelations } from '@/services/db/products';

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

export type ProductWithRelations = Prisma.PromiseReturnType<typeof getProductWithRelations>;
