import type { SegmentVariants } from '@/constants/common';

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
