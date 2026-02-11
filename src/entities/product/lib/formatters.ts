/**
 * Форматирует число в денежный формат с пробелами и двумя знаками после запятой.
 * @param price - Цена (число).
 * @returns - Отформатированная строка (например, "48 652,00").
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

/**
 * Форматирует рейтинг в формат "4.3/5".
 * @param rating - Рейтинг (число).
 * @returns - Отформатированная строка.
 */
export const formatRating = (rating: number): string => {
  return `${rating.toFixed(1)}/5`;
};
