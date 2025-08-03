import type { ICategory } from './category.interface';

export interface IProduct {
  id: number;
  category: ICategory;
  name: string;
  description: string;
  basePrice: number;
  image: string;
}

export enum ProductSortBy {
  POPULAR = 'popular',
  NEW = 'new',
  ASCENDING = 'ascending',
  DESCENDING = 'descending'
}
