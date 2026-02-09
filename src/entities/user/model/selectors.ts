import { useAuthStore } from './store';

export const useAuthUser = () =>
  useAuthStore((s) => s.user);

export const useAuthLoading = () =>
  useAuthStore((s) => s.loading);

export const useIsAuth = () =>
  useAuthStore((s) => Boolean(s.token));
