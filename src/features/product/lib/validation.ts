import { z } from 'zod';

export const addProductSchema = z.object({
  title: z.string().min(3, 'Наименование должно содержать не менее 3 символов'),
  price: z.number().min(0.01, 'Цена должна быть больше 0'),
  vendor: z.string().min(2, 'Вендор должен содержать не менее 2 символов'),
  sku: z.string().min(3, 'Артикул должен содержать не менее 3 символов'),
});

export type AddProductFormValues = z.infer<typeof addProductSchema>;
