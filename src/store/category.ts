import { create } from 'zustand';

interface CategoryState {
  activeId: string;
  setActiveId: (id: string) => void;
  ignoreIntersection: boolean;
  setIgnoreIntersection: (value: boolean) => void;
}

export const useCategoryStore = create<CategoryState>()((set) => ({
  activeId: 'pizza',
  setActiveId: (id: string) => set({ activeId: id }),
  ignoreIntersection: false,
  setIgnoreIntersection: (value: boolean) => set({ ignoreIntersection: value })
}));
