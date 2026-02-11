import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Toast.module.scss';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className={styles.toast}>{message}</div>,
    document.body
  );
};
