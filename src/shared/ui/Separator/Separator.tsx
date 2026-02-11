import React from 'react';
import style from './Separator.module.scss';

export const Separator: React.FC<{ children?: React.ReactNode }> = ({children}) => {
  return <div className={style.separator}><span>{children}</span></div>;
};
