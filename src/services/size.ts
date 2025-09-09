import type { Size } from '@/types/size.interface';
import axiosInstance from './api/instance';
import ApiRoutes from './api/api-routes';

export const getAll = async () => {
  const { data } = await axiosInstance.get<Size[]>(ApiRoutes.SIZES);

  return data;
};
