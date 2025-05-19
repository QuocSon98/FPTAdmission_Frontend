import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8082/api',
  headers: { 'Content-Type': 'application/json' }
});

// auto‐attach token nếu có
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const register = (data: any) =>
  api.post('/register', data);                     // POST /api/register

export const login = (data: any) =>
  api.post('/login', data);                        // POST /api/login

export const forgotPassword = (data: any) =>
  api.post('/forgot-password', data);               // POST /api/forgot-password

export const resetPassword = (data: any) =>
  api.post('/reset-password', data);                // POST /api/reset-password

export const changePassword = (data: any) =>
  api.post('/change-password', data);               // POST /api/change-password
