export interface ClassProps {
  className?: string;
}

export interface IOption<T> {
  value: T;
  content: string;
  href?: string;
}

export interface ChoiceItemProps extends ClassProps {
  value: string;
  text: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export interface FilterItem {
  value: string;
  text: string;
}
