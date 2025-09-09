import type { CartWithRelations } from '@/types/cart.interface';
import axiosInstance from './api/instance';
import ApiRoutes from './api/api-routes';

export const getByToken = async () => {
  const { data } = await axiosInstance.get<CartWithRelations>(ApiRoutes.CARTS);

  return data;
};
