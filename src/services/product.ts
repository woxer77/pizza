import type { Product } from '@/types/product.interface';
import axiosInstance from './api/instance';
import ApiRoutes from './api/api-routes';

export const search = async (query: string) => {
  const { data } = await axiosInstance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, { params: { query } });

  return data;
};
