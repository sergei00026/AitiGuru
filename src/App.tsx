import './App.css';
import { useAuthStore } from '@/entities/user/model/store';
import AuthPage from '@/pages/auth/AuthPage';
import ProductsPage from '@/pages/products/ProductsPage';

function App() {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Загрузка...</div>;
  }

  return (
    <div className="App">
      {isAuthenticated ? <ProductsPage /> : <AuthPage />}
    </div>
  );
}

export default App;
