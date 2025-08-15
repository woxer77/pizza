import type { Ingredient } from '@/types/ingredient.interface';
import axiosInstance from './instance';
import ApiRoutes from './api-routes';

export const getAll = async () => {
  const { data } = await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS);

  return data;
};
