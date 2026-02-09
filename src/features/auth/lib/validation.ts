import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'Имя пользователя обязательно'),
  password: z.string().min(6, 'Пароль должен содержать не менее 6 символов'),
});

export const registrationSchema = z.object({
  username: z.string().min(3, 'Имя пользователя должно содержать не менее 3 символов'),
  password: z.string().min(6, 'Пароль должен содержать не менее 6 символов'),
  email: z.string().email('Некорректный email'),
  firstName: z.string().min(2, 'Имя должно содержать не менее 2 символов'),
  lastName: z.string().min(2, 'Фамилия должна содержать не менее 2 символов'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegistrationFormValues = z.infer<typeof registrationSchema>;
