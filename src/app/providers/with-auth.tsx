import React, { useEffect } from 'react';
import { useAuthStore } from '../../entities/user/model/store';
import { LoginForm } from '../../features/auth/login/ui/LoginForm';

export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithAuthComponent: React.FC<P> = (props) => {
    const { isAuthenticated, checkAuth, loading } = useAuthStore();

    useEffect(() => {
      checkAuth();
    }, [checkAuth]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return <LoginForm />;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};
