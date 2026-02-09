export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string,
  image: string;
  accessToken: string;
  refreshToken: string;
}
export interface LoginType{
  username: string,
  password: string,
}



export interface MeResponse  {
  id: number,
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  gender: string,
  image: string
}

export interface RefreshResponse {
  accessToken: string
  refreshToken: string
}
