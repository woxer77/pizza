import type { ICategory } from './category.interface';

export interface IProduct {
  id: number;
  category: ICategory;
  name: string;
  description: string;
  basePrice: number;
  image: string;
}

export const ProductSortBy = {
  POPULAR: 'popular',
  NEW: 'new',
  ASCENDING: 'ascending',
  DESCENDING: 'descending'
} as const;

export type ProductSortByValue = (typeof ProductSortBy)[keyof typeof ProductSortBy];
