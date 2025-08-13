import type { CategoryWithProducts } from '@/shared/types/category.interface';
import type { IOption } from '@/shared/types/common';

const useCategory = (categories: CategoryWithProducts[], limit: number) => {
  const displayedCategories = categories.slice(0, limit).filter((category) => category.products.length > 0);
  const hasOtherBtn = categories.length > limit;

  const dropdownOptions: IOption<string>[] =
    categories.length <= limit
      ? []
      : categories
          .slice(limit)
          .filter((category) => category.products.length > 0)
          .map((category) => ({
            value: category.id,
            content: category.name,
            href: category.id
          }));

  return { displayedCategories, dropdownOptions, hasOtherBtn };
};

export default useCategory;
