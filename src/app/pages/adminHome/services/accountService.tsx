import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8082/api/users',
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Lấy page đầu của tất cả account (ADMIN only)
// GET /api/account?page=0&size=10
export const getAllAccounts = ({ page = 0, size = 10 }) =>{
  return api.get('/account', { params: { page, size } });
}

// Tìm theo name với paging (ADMIN only)
// GET /api/accounts/search?name=abc&page=0&size=10
export const searchAccounts = ({ name = '', page = 0, size = 10 }) => {
  return api.get('/search', { params: { name, page, size } });
}

// Cập nhật account theo id
// PUT /api/account/{id}
export const updateAccount = (id: any, data: any) =>{
  return api.put(`/account/${id}`, data);
}

// Xóa account theo id (ADMIN only)
// DELETE /api/{id}
export const deleteAccount = (id: any) =>{
  return api.delete(`/${id}`);
}

export const register = (data: any) =>{
  return api.post('/register', data);
}
