import React from 'react';
import styles from './ToggleAuthButton.module.scss';

interface ToggleAuthButtonProps {
  isLogin: boolean;
  onClick: () => void;
}

export const ToggleAuthButton: React.FC<ToggleAuthButtonProps> = ({ isLogin, onClick }) => {
  return (
    <button className={styles.toggleButton} onClick={onClick}>
      {isLogin ? <>Нет аккаунта? <span>Создать</span></> : <>Уже есть аккаунт? <span>Войдите</span></>}
    </button>
  );
};
