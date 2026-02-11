import { create } from 'zustand';
import { authApi } from '@/entities/user/api/auth.api';
import type { User, RegisterType } from '@/entities/user/model/types';

// --- Helper-функции для управления хранилищем ---

const saveTokens = (accessToken: string, refreshToken: string, rememberMe: boolean) => {
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem('accessToken', accessToken);
  storage.setItem('refreshToken', refreshToken);
};

const loadTokens = () => {
  const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');
  return { accessToken, refreshToken };
};

const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('refreshToken');
};

// --- Store ---

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  rememberMe: boolean;
  error: string | null;
  setRememberMe: (value: boolean) => void;
  clearError: () => void;
  login: (username: string, password: string) => Promise<void>;
  register: (data: RegisterType) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: true,
  isAuthenticated: false,
  rememberMe: false,
  error: null,

  setRememberMe: (value) => set({ rememberMe: value }),
  clearError: () => set({ error: null }),

  login: async (username, password) => {
    const { rememberMe } = get();
    set({ loading: true, error: null });
    try {
      const res = await authApi.login({ username, password });
      saveTokens(res.accessToken, res.refreshToken, rememberMe);
      set({
        user: res,
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } catch (error) {
      clearTokens();
      const errorMessage = error instanceof Error ? error.message : 'Произошла неизвестная ошибка';
      set({ error: errorMessage, loading: false });
    }
  },

  register: async (data) => {
    set({ loading: true, error: null });
    try {
      // Сначала регистрируемся
      await authApi.register(data);
      // Затем сразу логинимся, используя ту же логику, что и в login
      const { rememberMe } = get();
      const res = await authApi.login({ username: data.username, password: data.password });
      saveTokens(res.accessToken, res.refreshToken, rememberMe);
      set({
        user: res,
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } catch (error) {
      clearTokens();
      const errorMessage = error instanceof Error ? error.message : 'Произошла неизвестная ошибка';
      set({ error: errorMessage, loading: false });
    }
  },

  logout: () => {
    clearTokens();
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      error: null,
    });
  },

  checkAuth: async () => {
    set({ loading: true });
    const { accessToken, refreshToken } = loadTokens();

    if (accessToken && refreshToken) {
      set({ accessToken, refreshToken });
      try {
        const user = await authApi.me();
        set({ user, isAuthenticated: true, loading: false });
      } catch {
        clearTokens();
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          loading: false,
        });
      }
    } else {
      set({ isAuthenticated: false, loading: false });
    }
  },
}));
