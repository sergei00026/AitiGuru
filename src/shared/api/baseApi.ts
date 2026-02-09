export const api = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const res = await fetch(`https://dummyjson.com${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error('API Error');
  }

  return res.json();
};
