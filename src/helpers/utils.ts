import type { SegmentItem } from '@/shared/types/common';
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
