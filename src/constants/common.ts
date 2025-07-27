import type { IOption } from '@/shared/types/common';

enum ProductSortOptions {
  POPULAR = 'popular',
  NEW = 'new',
  ASCENDING = 'ascending',
  DESCENDING = 'descending'
}

export const productSortOptions: IOption[] = Object.values(ProductSortOptions).map((value) => ({
  value,
  content: value
}));
