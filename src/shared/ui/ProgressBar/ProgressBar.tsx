import React from 'react';
import styles from './ProgressBar.module.scss';

export const ProgressBar: React.FC = () => {
  return (
    <div className={styles.progressBar}>
      <div className={styles.progressBarInner} />
    </div>
  );
};
