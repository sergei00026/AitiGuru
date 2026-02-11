import React from 'react';
import styles from './Badge.module.scss';

interface BadgeProps {
  count: number;
}

export const Badge: React.FC<BadgeProps> = ({ count }) => {
  if (count === 0) return null;

  return <span className={styles.badge}>{count}</span>;
};
