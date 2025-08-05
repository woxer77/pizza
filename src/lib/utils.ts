import type { IProduct } from '@/shared/types/product.interface';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function upFirstLetter(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

export const groupProductsByCategory = (products: IProduct[]): IProduct[][] => {
  const productsMap = new Map<string, IProduct[]>();

  products.forEach((product) => {
    const categoryId = product.category.id;

    if (!productsMap.has(categoryId)) {
      productsMap.set(categoryId, []);
    }

    productsMap.get(categoryId)!.push(product);
  });

  return Array.from(productsMap.values());
};
