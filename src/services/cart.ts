import type { CartWithRelations } from '@/types/cart.interface';
import axiosInstance from './instance';
import ApiRoutes from './api-routes';

export const getById = async (userId: number) => {
  const { data } = await axiosInstance.get<CartWithRelations>(ApiRoutes.CARTS, { params: { userId } });

  return data;
};

export const getByToken = async (token: string) => {
  const { data } = await axiosInstance.get<CartWithRelations>(ApiRoutes.CARTS, { params: { token } });

  return data;
};
