import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/entities/user/model/store';
import { Input } from '@/shared/ui/Input/Input';
import { Button } from '@/shared/ui/Button/Button';
import { registrationSchema } from '@/features/auth/lib/validation';
import type { RegistrationFormValues } from '@/features/auth/lib/validation';
import {Separator} from "@/shared/ui/Separator/Separator";
import style from "@/features/auth/login/ui/login.module.scss";
import {useEffect} from "react";

export function RegistrationForm() {
  const { register: registerUser, loading, error, clearError } = useAuthStore();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    await registerUser(data);
  };
  useEffect(() => {
    clearError()
  }, [clearError]);

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.titles}>
        <h1>Добро пожаловать!</h1>
        <h2>Пожалуйста, зарегистрируйтесь</h2>
      </div>
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <Input
            id="reg-username"
            label="Имя пользователя"
            type="text"
            placeholder="Введите имя пользователя"
            error={errors.username?.message}
            {...field}
            onClear={() => field.onChange('')}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            id="reg-password"
            label="Пароль"
            type="password"
            placeholder="Введите пароль"
            error={errors.password?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            id="reg-email"
            label="Email"
            type="email"
            placeholder="Введите email"
            error={errors.email?.message}
            {...field}
            onClear={() => field.onChange('')}
          />
        )}
      />
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => (
          <Input
            id="reg-firstName"
            label="Имя"
            type="text"
            placeholder="Введите имя"
            error={errors.firstName?.message}
            {...field}
            onClear={() => field.onChange('')}
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        render={({ field }) => (
          <Input
            id="reg-lastName"
            label="Фамилия"
            type="text"
            placeholder="Введите фамилию"
            error={errors.lastName?.message}
            {...field}
            onClear={() => field.onChange('')}
          />
        )}
      />
      {error && (
        <p style={{ color: 'red', fontSize: '12px' }}>
          {error}
        </p>
      )}
      <Button type="submit" disabled={loading}>
        {loading ? 'Регистрация...' : 'Зарегистрироваться'}
      </Button>
      <Separator>или</Separator>

    </form>
  );
}
