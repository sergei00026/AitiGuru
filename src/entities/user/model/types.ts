// Базовый тип пользователя
export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

// Ответ при логине (пользователь + токены)
export interface AuthResponse extends User {
  accessToken: string;
  refreshToken: string;
}


export interface LoginType {
  username: string;
  password: string;
}

export interface RegisterType {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;

}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}
