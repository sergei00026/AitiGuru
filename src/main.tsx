import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'normalize.css'; // Импортируем normalize.css
import './index.css';
import App from '@/App';
import { useAuthStore } from '@/entities/user/model/store';

// Вызываем checkAuth() до первого рендеринга
useAuthStore.getState().checkAuth().finally(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
