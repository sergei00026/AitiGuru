import { useAuthStore } from '@/entities/user/model/store';

const BASE_URL = 'https://dummyjson.com';

const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const state = useAuthStore.getState();
  let accessToken = state.accessToken;

  const isAuthEndpoint = url.includes('/auth/login') || url.includes('/auth/register');

  if (accessToken && !isAuthEndpoint) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  let response = await fetch(url, options);

  if (response.status === 401 && !isAuthEndpoint) {
    const refreshToken = state.refreshToken;
    if (refreshToken) {
      try {
        const refreshResponse = await fetch(`${BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken, expiresInMins: 30 }),
        });

        if (!refreshResponse.ok) {
          console.error('Refresh token failed');
        }

        const newTokens = await refreshResponse.json();
        // Логика сохранения токенов уже есть в сторе, здесь просто обновляем состояние
        useAuthStore.setState({
          accessToken: newTokens.accessToken,
          refreshToken: newTokens.refreshToken,
        });
        accessToken = newTokens.accessToken;

        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
        };
        response = await fetch(url, options);
      } catch (error) {
        console.error(error)
        state.logout();
        // Перевыбрасываем оригинальную ошибку, чтобы её поймал следующий catch
        throw error;
      }
    } else {
      state.logout();
      throw new Error('Unauthorized. Please log in.');
    }
  }

  return response;
};

export const api = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const fullUrl = `${BASE_URL}${url}`;

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  const response = await fetchWithAuth(fullUrl, defaultOptions);

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || 'API Error');
  }

  if (response.status === 204 || response.headers.get('content-length') === '0') {
    return {} as T;
  }

  return response.json();
};
