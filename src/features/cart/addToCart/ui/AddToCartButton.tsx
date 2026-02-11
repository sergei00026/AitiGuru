import React from 'react';
import { useCartStore } from '@/entities/cart/model/store';
import type { Product } from '@/entities/product/model/types';
import { Button } from '@/shared/ui/Button/Button';
import Plus from '@/assets/+.svg?react';


interface AddToCartButtonProps {
  product: Product;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const addProduct = useCartStore((state) => state.addProduct);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Останавливаем всплытие, чтобы не сработала сортировка
    addProduct(product);
  };

  return (
    <Button
      onClick={handleAddToCart}
      style={{ padding: '6px 10px', fontSize: '12px', width: 'auto' }}
    >
      <Plus/>
    </Button>
  );
};
