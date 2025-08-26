import { DOUGH_TYPES } from '@/constants/dough-type.constants';
import type { CalculatePriceArgs, SegmentItem } from '@/shared/types/common';
import type { DoughTypeValues } from '@/shared/types/dough-type.interface';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const scrollWithOffset = (id: string, offset: number) => {
  const targetElem = document.getElementById(id);
  if (targetElem) {
    const y = targetElem.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

export const serializeData = <T extends object>(data: T): T => {
  return JSON.parse(JSON.stringify(data));
};

export const convertToSegmentItems = <T extends { id: string; name: string }>(
  inputObjects: T[]
): SegmentItem<string>[] => {
  const segmentItems = inputObjects.map((item) => ({ value: item.id, name: item.name }));
  return segmentItems;
};

export const calculatePrice = ({
  product,
  sizeId,
  sizes,
  doughTypeId,
  doughTypes,
  ingredientIds
}: CalculatePriceArgs): string => {
  const sizePrice = sizes.find((size) => size.id === sizeId)?.price ?? 0;
  const doughTypePrice = doughTypes.find((doughType) => doughType.id === doughTypeId)?.price ?? 0;
  const ingredientsPrice = product.ingredients.reduce((acc, ingred) => {
    if (ingredientIds.includes(ingred.id)) {
      return acc + ingred.price;
    }
    return acc;
  }, 0);

  const total = product.basePrice + sizePrice + doughTypePrice + ingredientsPrice;
  return total.toFixed(2);
};

export const getProductImagePath = (
  baseName: string,
  doughType: DoughTypeValues = DOUGH_TYPES.TRADITIONAL
): string => {
  if (baseName.includes('/pizza/')) {
    const doughTypeName = doughType === DOUGH_TYPES.THIN ? 'thin' : 'traditional';

    const cleanName = baseName
      .replace(/^\//, '')
      .replace(/^pizza\//, '')
      .replace(/\.(png|jpg|jpeg)$/i, '');

    return `/pizza/${doughTypeName}/${cleanName}.png`;
  }
  return baseName;
};
