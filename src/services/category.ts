import type { Category } from '@prisma/client';
import axiosInstance from './api/instance';
import type { CategoryWithProducts } from '@/shared/types/category.interface';
import ApiRoutes from './api/api-routes';

export const getAll = async () => {
  const { data } = await axiosInstance.get<Category[]>(ApiRoutes.CATEGORIES);

  return data;
};

export const getAllWithProducts = async () => {
  const { data } = await axiosInstance.get<CategoryWithProducts[]>(ApiRoutes.CATEGORIES, {
    params: { include: 'products' }
  });

  return data;
};
