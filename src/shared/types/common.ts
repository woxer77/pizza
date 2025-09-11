import type { SegmentVariants } from '@/constants/common';
import type { Product } from './product.interface';
import type { Size } from './size.interface';
import type { DoughType } from './dough-type.interface';
import type { Ingredient } from './ingredient.interface';

export interface ClassProps {
  className?: string;
}

export interface IOption<T extends string | number> {
  value: T;
  content: string;
  href?: string;
}

export interface FilterItem {
  value: string;
  text: string;
}

export interface PriceRange<T> {
  from: T;
  to: T;
}

export interface SegmentItem<T extends string | number> {
  name: string;
  value: T;
  disabled?: boolean;
}

export type SegmentVariantValues = (typeof SegmentVariants)[keyof typeof SegmentVariants];

export interface CalcCartItemPriceArgs {
  product: Product;
  size: Size | null;
  doughType: DoughType | null;
  ingredients: Ingredient[];
  quantity: number;
}

export interface ProductPageProps {
  params: {
    id: string;
  };
}
