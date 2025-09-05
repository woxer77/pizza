import type { DoughType } from '@/types/dough-type.interface';
import ApiRoutes from './api-routes';
import axiosInstance from './instance';

export const getAll = async () => {
  const { data } = await axiosInstance.get<DoughType[]>(ApiRoutes.DOUGH_TYPES);

  return data;
};
