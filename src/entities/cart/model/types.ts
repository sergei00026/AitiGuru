import type { Product } from '@/entities/product/model/types';

/**
 * Элемент корзины, расширяющий продукт полем "количество".
 */
export interface CartItem extends Product {
  quantity: number;
}
