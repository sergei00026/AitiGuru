import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/entities/user/model/store';
import { Input } from '@/shared/ui/Input/Input';
import { Button } from '@/shared/ui/Button/Button';
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox';
import { loginSchema } from '@/features/auth/lib/validation';
import type { LoginFormValues } from '@/features/auth/lib/validation';
import style from'./login.module.scss'
import {Separator} from "@/shared/ui/Separator/Separator";

export function LoginForm() {
  const { login, loading, rememberMe, setRememberMe, error } = useAuthStore();
  console.log(error)
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });


  const onSubmit = async (data: LoginFormValues) => {
    await login(data.username, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <div className={style.titles}>
        <h1>Добро пожаловать!</h1>
        <h2>Пожалуйста, авторизируйтесь</h2>
      </div>
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <Input
            id="username"
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
            id="password"
            label="Пароль"
            type="password"
            placeholder="Введите пароль"
            error={errors.password?.message}
            {...field}
          />
        )}
      />
      <Checkbox
        id="rememberMe"
        label="Запомнить меня"
        checked={rememberMe}
        onChange={(e) => setRememberMe(e.target.checked)}
      />
      {error && (
        <p style={{ color: 'red', fontSize: '12px' }}>
          {error}
        </p>
      )}
      <Button type="submit" disabled={loading}>
        {loading ? 'Вход...' : 'Войти'}
      </Button>
      <Separator>или</Separator>
    </form>
  );
}
