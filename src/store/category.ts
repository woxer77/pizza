import { create } from 'zustand';

interface CategoryState {
  activeId: string;
  setActiveId: (id: string) => void;
}

export const useCategoryStore = create<CategoryState>()((set) => ({
  activeId: 'pizza',
  setActiveId: (id: string) => set({ activeId: id })
}));
