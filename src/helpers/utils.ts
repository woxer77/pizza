import { DOUGH_TYPE_VALUES } from '@/constants/dough-type.constants';
import type { SegmentItem } from '@/shared/types/common';
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

export const getProductImagePath = (
  baseName: string,
  doughType: DoughTypeValues = DOUGH_TYPE_VALUES.TRADITIONAL
): string => {
  if (baseName.includes('/pizza/')) {
    const doughTypeName = doughType === DOUGH_TYPE_VALUES.THIN ? 'thin' : 'traditional';

    const cleanName = baseName
      .replace(/^\//, '')
      .replace(/^pizza\//, '')
      .replace(/\.(png|jpg|jpeg)$/i, '');

    return `/pizza/${doughTypeName}/${cleanName}.png`;
  }
  return baseName;
};
