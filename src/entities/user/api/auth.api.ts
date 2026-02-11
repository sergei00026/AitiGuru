import type { AuthResponse, LoginType, User, RegisterType } from '@/entities/user/model/types';
import { api } from '@/shared/api/baseApi';

export const authApi = {
  login: (data: LoginType) =>
    api<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  register: (data: RegisterType) =>
    api<AuthResponse>('/users/add', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  me: () => api<User>('/auth/me'),
};
