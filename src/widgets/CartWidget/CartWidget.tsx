import React from 'react';
import { useCartStore } from '@/entities/cart/model/store';
import { Badge } from '@/shared/ui/Badge/Badge';
import CartIcon from '@/assets/cart-icon.svg?react'; // Исправляем импорт
import styles from './CartWidget.module.scss';

export const CartWidget: React.FC = () => {
  const totalItems = useCartStore((state) => state.totalItems);

  return (
    <div className={styles.widget}>
      <CartIcon className={styles.icon} />
      <Badge count={totalItems} />
    </div>
  );
};
