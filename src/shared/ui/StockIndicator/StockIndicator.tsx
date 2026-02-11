import React from 'react';
import styles from './StockIndicator.module.scss';

interface StockIndicatorProps {
  level: 0 | 1 | 2 | 3;
}

export const StockIndicator: React.FC<StockIndicatorProps> = ({ level }) => {
  return (
    <div className={styles.indicator}>
      <span className={`${styles.dot} ${level >= 1 ? styles.filled : ''}`} />
      <span className={`${styles.dot} ${level >= 2 ? styles.filled : ''}`} />
      <span className={`${styles.dot} ${level >= 3 ? styles.filled : ''}`} />
    </div>
  );
};
