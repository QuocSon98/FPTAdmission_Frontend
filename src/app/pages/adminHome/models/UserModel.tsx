export interface Account {
  uuid: string;
  userName: string;
  email: string;
  phone: string;
  fullName: string;
  address: string;
  role: string;
}

// Kiểu cho form thêm mới
export interface NewUser {
  userName: string;
  email: string;
  phone: string;
  password: string;
  fullName: string;
  address: string;
  role: string;
}