import type { CartWithRelations } from '@/types/cart.interface';
import axiosInstance from './api/instance';
import ApiRoutes from './api/api-routes';

export const getByToken = async () => {
  const { data } = await axiosInstance.get<CartWithRelations>(ApiRoutes.CARTS);

  return data;
};

export const updateItemQuantity = async (id: number, quantity: number) => {
  const { data } = await axiosInstance.patch<CartWithRelations>(`${ApiRoutes.CARTS_ITEMS}/${id}`, { quantity });

  return data;
};

export const deleteItem = async (id: number) => {
  const { data } = await axiosInstance.delete<CartWithRelations>(`${ApiRoutes.CARTS_ITEMS}/${id}`);

  return data;
};
