import React from 'react';
import { useAuthStore } from '../../entities/user/model/store';

const HomePage: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <div>
      <h1>Welcome, {user?.firstName}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default HomePage;
