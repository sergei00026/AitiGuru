import React from 'react';
import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const MAX_PAGE_BUTTONS = 5; // Максимальное количество кнопок страниц для отображения

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const getPaginationButtons = () => {
    const buttons = [];
    const startPage = Math.max(1, currentPage - Math.floor(MAX_PAGE_BUTTONS / 2));
    const endPage = Math.min(totalPages, startPage + MAX_PAGE_BUTTONS - 1);

    if (startPage > 1) {
      buttons.push(
        <button key="1" className={styles.paginationButton} onClick={() => onPageChange(1)}>
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis-start" className={styles.ellipsis}>
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`${styles.paginationButton} ${i === currentPage ? styles.active : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis-end" className={styles.ellipsis}>
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          className={styles.paginationButton}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  const currentRangeStart = (currentPage - 1) * itemsPerPage + 1;
  const currentRangeEnd = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalItems === 0) return null; // Не показываем пагинацию, если нет товаров

  return (
    <div className={styles.pagination}>
      <span>
        Показано <b>{currentRangeStart}-{currentRangeEnd}</b> из <b>{totalItems}</b>
      </span>
      <div className={styles.paginationButtons}>
        <button
          className={styles.paginationButton}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          {'<'}
        </button>
        {getPaginationButtons()}
        <button
          className={styles.paginationButton}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};
