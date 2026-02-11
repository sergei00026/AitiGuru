import React from 'react';
import styles from './Checkbox.module.scss';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, id, ...props }) => {
  return (
    <label htmlFor={id} className={styles.wrapper}>
      <input type="checkbox" id={id} className={styles.input} {...props} />
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};
