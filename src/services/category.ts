import type { Category } from '@prisma/client';
import axiosInstance from './instance';

export const getAll = async () => {
  const { data } = await axiosInstance.get<Category[]>('/categories');

  return data;
};
