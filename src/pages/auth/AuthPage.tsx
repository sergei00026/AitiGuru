import { useState } from 'react';
import { LoginForm } from '@/features/auth/login/ui/LoginForm';
import { RegistrationForm } from '@/features/auth/register/ui/RegistrationForm';
import   LogoIcon  from '@/assets/logo.svg?react'; // Изменяем импорт
import styles from './AuthPage.module.scss';
import {ToggleAuthButton} from "@/features/auth/ToggleAuth/ui/ToggleAuthButton.tsx";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={styles.authPage}>
      <div className={styles.formWrapper}>
        <LogoIcon className={styles.logo} />
        {isLogin ? <LoginForm /> : <RegistrationForm />}
        <ToggleAuthButton isLogin={isLogin} onClick={() => setIsLogin(!isLogin)} />
      </div>
    </div>
  );
};

export default AuthPage;
