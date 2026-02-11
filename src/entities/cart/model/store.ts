import { create } from 'zustand';
import type { CartItem } from './types';
import type { Product } from '@/entities/product/model/types';

interface CartState {
  items: CartItem[];
  totalItems: number;
  addProduct: (product: Product) => void;
  removeProduct: (productId: number) => void;
  clearCart: () => void;
}

const updateTotalItems = (items: CartItem[]) =>
  items.reduce((total, item) => total + item.quantity, 0);

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  totalItems: 0,

  addProduct: (product) => {
    const { items } = get();
    const existingItem = items.find((item) => item.id === product.id);

    let updatedItems;
    if (existingItem) {
      // Если товар уже есть, увеличиваем его количество
      updatedItems = items.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // Если товара нет, добавляем его с количеством 1
      updatedItems = [...items, { ...product, quantity: 1 }];
    }

    set({
      items: updatedItems,
      totalItems: updateTotalItems(updatedItems),
    });
  },

  removeProduct: (productId) => {
    const updatedItems = get().items.filter((item) => item.id !== productId);
    set({
      items: updatedItems,
      totalItems: updateTotalItems(updatedItems),
    });
  },

  clearCart: () => {
    set({
      items: [],
      totalItems: 0,
    });
  },
}));
