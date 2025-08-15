import type { Product } from '@/types/product.interface';
import axiosInstance from './instance';
import ApiRoutes from './api-routes';

export const search = async (query: string) => {
  const { data } = await axiosInstance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, { params: { query } });

  return data;
};
