export interface ILoginModel {
    username: string,
    password: string
}

export interface UserGoogle {
    email: string;
    name: string;
    picture: string;
  }

export interface RegisterFormData {
  userName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  fullName: string
  address: string
  role: string
}

export interface AccountResponse {
  uuid: string,
  userName: string,
  fullName: string,
  phone: string,
  email: string,
  address: string,
  role: 'USER' | 'ADMIN' | 'CONSULTANT' | string,
  token: string,
  image: string
}

export interface AccountUpdate {
  uuid: string,
  userName: string,
  fullName: string,
  phone: string,
  email: string,
  role: 'USER' | 'ADMIN' | 'CONSULTANT' | string,
  address: string,
  image: string
}