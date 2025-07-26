import type { ICategory } from '@/shared/types/common';

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

  const displayedCategories = [{ name: 'all' } as ICategory, ...categories.slice(0, limit)];
  if (categories.length > limit) {
    displayedCategories.push({ name: 'more' } as ICategory);
  }

  const dropdownOptions =
    categories.length <= limit
      ? []
      : categories.slice(limit).map((category) => ({
          value: category.name,
          content: category.name
        }));

  return { moveSegment, displayedCategories, dropdownOptions };
};

export default useCategory;
