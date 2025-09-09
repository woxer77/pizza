import type { DoughType } from '@/types/dough-type.interface';
import ApiRoutes from './api/api-routes';
import axiosInstance from './api/instance';

export const getAll = async () => {
  const { data } = await axiosInstance.get<DoughType[]>(ApiRoutes.DOUGH_TYPES);

  return data;
};
