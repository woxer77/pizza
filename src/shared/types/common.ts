export interface ClassProps {
  className?: string;
}

export interface IOption<T> {
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

export interface SegmentItem<T extends string> {
  name: string;
  value: T;
}
