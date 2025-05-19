export interface ILoginModel {
    username: string,
    password: string
}

export interface UserGoogle {
    email: string;
    name: string;
    picture: string;
  }

export interface LoginResponse {
  token: string;
  role: 'ADMIN' | 'CONSULTANT' | string;
}