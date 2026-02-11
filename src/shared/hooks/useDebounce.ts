import { useState, useEffect } from 'react';

/**
 * Кастомный хук для получения значения с задержкой (debounce).
 * @param value - Значение, которое нужно "отложить".
 * @param delay - Задержка в миллисекундах.
 * @returns - Отложенное значение.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Очистка таймера при размонтировании или изменении value/delay
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
