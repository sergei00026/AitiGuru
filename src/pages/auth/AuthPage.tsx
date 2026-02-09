import { useState } from 'react';
import { LoginForm } from '../../features/auth/login/ui/LoginForm';
import { RegistrationForm } from '../../features/auth/register/ui/RegistrationForm';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      {isLogin ? <LoginForm /> : <RegistrationForm />}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Need to register?' : 'Have an account?'}
      </button>
    </div>
  );
};

export default AuthPage;
