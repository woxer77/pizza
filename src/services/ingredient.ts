import type { Ingredient } from '@/types/ingredient.interface';
import axiosInstance from './api/instance';
import ApiRoutes from './api/api-routes';

export const getAll = async () => {
  const { data } = await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS);

  return data;
};
