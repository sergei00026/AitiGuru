import { api } from '@/shared/api/baseApi';
import type { GetProductsResponse } from '../model/types';

export const productsApi = {
  getProducts: (limit: number, skip: number) =>
    api<GetProductsResponse>(`/products?limit=${limit}&skip=${skip}`),

  searchProducts: (query: string, limit: number, skip: number) =>
    api<GetProductsResponse>(`/products/search?q=${query}&limit=${limit}&skip=${skip}`),
};
