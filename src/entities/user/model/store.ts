import { create } from 'zustand';
import { authApi } from '../api/auth.api';
import type { AuthResponse, RegisterType } from './types';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';

// Проверка на доступность localStorage
const getLocalStorage = (): StateStorage | undefined => {
  try {
    return localStorage;
  } catch (e) {
    return undefined;
  }
};

const storage = createJSONStorage(() => getLocalStorage() || {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
});

interface AuthState {
  user: AuthResponse | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (data: RegisterType) => Promise<void>;
  logout: () => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      loading: false,
      isAuthenticated: false,
      error: null,
      login: async (username, password) => {
        set({ loading: true, error: null });
        try {
          const res = await authApi.login({ username, password });
          set({
            user: res,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
            isAuthenticated: true,
            error: null,
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          set({ isAuthenticated: false, error: errorMessage });
        } finally {
          set({ loading: false });
        }
      },
      register: async (data) => {
        set({ loading: true, error: null });
        try {
          const res = await authApi.register(data);
          // Immediately log in the user after registration
          await get().login(data.username, data.password);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          set({ isAuthenticated: false, error: errorMessage });
        } finally {
          set({ loading: false });
        }
      },
      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          error: null,
        });
      },
      setTokens: (accessToken, refreshToken) => {
        set({ accessToken, refreshToken });
      },
      checkAuth: async () => {
        set({ loading: true });
        const { accessToken } = get();
        try {
          if (accessToken) {
            const user = await authApi.me();
            set({ user, isAuthenticated: true, error: null });
          } else {
            set({ isAuthenticated: false });
          }
        } catch (error) {
          set({
            isAuthenticated: false,
            user: null,
            accessToken: null,
            refreshToken: null,
          });
        } finally {
          set({ loading: false });
        }
      },
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      storage: storage,
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
