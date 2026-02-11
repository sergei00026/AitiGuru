import React from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addProductSchema } from '../../lib/validation';
import type { AddProductFormValues } from '../../lib/validation';
import { Input } from '@/shared/ui/Input/Input';
import { Button } from '@/shared/ui/Button/Button';
import styles from './AddProductForm.module.scss';

interface AddProductFormProps {
  onClose: () => void;
  onAdd: (data: AddProductFormValues) => void;
}

export const AddProductForm: React.FC<AddProductFormProps> = ({ onClose, onAdd }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddProductFormValues>({
    resolver: zodResolver(addProductSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: AddProductFormValues) => {
    onAdd(data);
    onClose();
  };

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <h2>Добавить товар</h2>
          <Input
            id="add-title"
            label="Наименование"
            type="text"
            {...register('title')}
            error={errors.title?.message}
          />
          <Input
            id="add-price"
            label="Цена"
            type="number"
            step="0.01"
            {...register('price', { valueAsNumber: true })}
            error={errors.price?.message}
          />
          <Input
            id="add-vendor"
            label="Вендор"
            type="text"
            {...register('vendor')}
            error={errors.vendor?.message}
          />
          <Input
            id="add-sku"
            label="Артикул"
            type="text"
            {...register('sku')}
            error={errors.sku?.message}
          />
          <div className={styles.buttons}>
            <Button type="button" onClick={onClose} style={{ backgroundColor: '#6c757d' }}>
              Отмена
            </Button>
            <Button type="submit">Добавить</Button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};
