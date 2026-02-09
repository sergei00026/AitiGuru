import type {AuthResponse, LoginType, MeResponse, RefreshResponse} from '../model/types';
import {api} from "../../../shared/api/baseApi.ts";

export const authApi = {
  login: (data: LoginType) =>
    api<AuthResponse>('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),

  me: (token: string) =>
    api<MeResponse>('/auth/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include'
    }),
  refresh: ()=>
    api<RefreshResponse>('/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refreshToken: '/* YOUR_REFRESH_TOKEN_HERE */', // Optional, if not provided, the server will use the cookie
      }),
      credentials: 'include' // Include cookies (e.g., accessToken) in the request

    })
};
