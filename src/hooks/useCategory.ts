import type { IOption } from '@/shared/types/common';
import type { ICategory } from '@/shared/types/category.interface';

const useCategory = (
  parentElemRef: React.RefObject<HTMLDivElement | null>,
  moveableElemRef: React.RefObject<HTMLDivElement | null>,
  categories: ICategory[],
  limit: number
) => {
  const moveSegment = (target: EventTarget) => {
    if (parentElemRef.current && moveableElemRef.current) {
      const targetElem = target as HTMLDivElement;
      const targetRect = targetElem.getBoundingClientRect();
      const parentRect = parentElemRef.current.getBoundingClientRect();

      moveableElemRef.current.style.transform = `translateX(${targetRect.x - parentRect.x}px)`;
      moveableElemRef.current.style.width = `${targetRect.width}px`;
    }
  };

  const displayedCategories = [...categories.slice(0, limit)];
  if (categories.length > limit) {
    displayedCategories.push({ id: 'other', name: 'other' });
  }

  const dropdownOptions =
    categories.length <= limit
      ? []
      : (categories.slice(limit).map((category) => ({
          value: category.id,
          content: category.name,
          href: category.id
        })) as IOption[]);

  return { moveSegment, displayedCategories, dropdownOptions };
};

export default useCategory;
