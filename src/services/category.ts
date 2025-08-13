import type { Category } from '@prisma/client';
import axiosInstance from './instance';
import type { CategoryWithProducts } from '@/shared/types/category.interface';

export const getAll = async () => {
  const { data } = await axiosInstance.get<Category[]>('/categories');

  return data;
};

export const getAllWithProducts = async () => {
  const { data } = await axiosInstance.get<CategoryWithProducts[]>('/categories', {
    params: { include: 'products' }
  });

  return data;
};
