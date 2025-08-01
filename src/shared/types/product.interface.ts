import type { ICategory } from './category.interface';

export interface IProduct {
  id: number;
  category: ICategory;
  name: string;
  description: string;
  startPrice: number;
  image: string;
}
