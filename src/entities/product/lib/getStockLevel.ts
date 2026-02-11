/**
 * Преобразует количество товара на складе в уровень от 0 до 3.
 * @param stock - Количество товара.
 * @returns Уровень наличия (0 - нет, 1 - мало, 2 - средне, 3 - много).
 */
export const getStockLevel = (stock: number): 0 | 1 | 2 | 3 => {
  if (stock === 0) {
    return 0;
  }
  if (stock > 0 && stock <= 10) {
    return 1;
  }
  if (stock > 10 && stock <= 50) {
    return 2;
  }
  return 3;
};
