import React, { useState } from 'react';
import styles from './Input.module.scss';
import ClearIcon from '@/assets/clear-icon.svg?react';
import EyeOpenIcon from '@/assets/eye-open-icon.svg?react';
import EyeClosedIcon from '@/assets/eye-closed-icon.svg?react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  id: string;
  onClear?: () => void;
}

export const Input: React.FC<InputProps> = ({ label, error, id, type, value, onClear, ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleClear = () => {
    if (onClear) {
      onClear();
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const inputType = type === 'password' && isPasswordVisible ? 'text' : type;

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <input id={id} type={inputType} value={value} className={styles.input} {...props} />
      
      {type !== 'password' && value && onClear && (
        <ClearIcon className={styles.icon} onClick={handleClear} />
      )}

      {type === 'password' && (
        isPasswordVisible 
          ? <EyeOpenIcon className={styles.icon} onClick={togglePasswordVisibility} />
          : <EyeClosedIcon className={styles.icon} onClick={togglePasswordVisibility} />
      )}

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
