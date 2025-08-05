import type { IOption } from '@/shared/types/common';
import type { ICategory } from '@/shared/types/category.interface';

const useCategory = (categories: ICategory[], limit: number) => {
  const displayedCategories = [...categories.slice(0, limit)];
  if (categories.length > limit) {
    displayedCategories.push({ id: 'other', name: 'other' });
  }

  const dropdownOptions: IOption<string>[] =
    categories.length <= limit
      ? []
      : categories.slice(limit).map((category) => ({
          value: category.id,
          content: category.name,
          href: category.id
        }));

  return { displayedCategories, dropdownOptions };
};

export default useCategory;
