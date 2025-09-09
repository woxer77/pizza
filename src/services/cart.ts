import type { CartWithRelations } from '@/types/cart.interface';
import axiosInstance from './instance';
import ApiRoutes from './api-routes';

export const getByToken = async () => {
  const { data } = await axiosInstance.get<CartWithRelations>(ApiRoutes.CARTS);

  return data;
};
