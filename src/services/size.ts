import type { Size } from '@/types/size.interface';
import axiosInstance from './instance';
import ApiRoutes from './api-routes';

export const getAll = async () => {
  const { data } = await axiosInstance.get<Size[]>(ApiRoutes.SIZES);

  return data;
};
