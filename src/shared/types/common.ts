export interface ClassProps {
  className?: string;
}

export interface IOption {
  value: string;
  content: string;
}

export interface ICategory {
  id: string;
  name: string;
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

export interface IProduct {
  id: number;
  categoryId: string;
  name: string;
  description: string;
  startPrice: number;
  image: string;
}
