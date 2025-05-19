import { useState, type FormEvent } from 'react';
import { type AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import logoFPT from '../../../app/assets/logo-fpt.png';
import type { LoginResponse } from './models/loginModel';
import { login } from './services/authService';

export default function Login() {
  const [userName, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userName || !password) {
      setMessage('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    try {
      const res: AxiosResponse<LoginResponse> = await login({ userName, password });

      const token = res.data.token;
      localStorage.setItem('token', token);

      switch (res.data.role) {
        case 'ADMIN':
          navigate('/admin');
          break;
        case 'CONSULTANT':
          navigate('/consultant/home');
          break;
        default:
          setMessage('Tài khoản không có quyền truy cập phù hợp');
          break;
      }
    } catch (err) {
      setMessage('Tên đăng nhập hoặc mật khẩu không đúng');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-lg m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-[70%] sm:p-14">
          <div className="mt-8 flex flex-col items-center">
            <h1 className="text-3xl xl:text-4xl font-extrabold mb-8">Đăng nhập</h1>
            <div className="w-full flex-1">
              <div className="mx-auto max-w-lg">
                {message && (
                  <div className="px-4 py-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
                    {message}
                  </div>
                )}
                <form onSubmit={handleLogin}>
                  <input
                    className="w-full px-8 py-4 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Tên đăng nhập"
                    value={userName}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <div className="relative">
                    <input
                      className="w-full px-8 py-4 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-lg focus:outline-none focus:border-gray-400 focus:bg-white mt-8"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Mật khẩu"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-[65%] transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <span className={showPassword ? 'text-red-500 font-medium' : 'text-blue-500 font-medium'}>
                        {showPassword ? 'Ẩn' : 'Hiện'}
                      </span>
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="mt-8 tracking-wide font-semibold bg-orange-500 text-gray-100 w-full py-4 rounded-lg hover:bg-orange-700 transition-all duration-300 ease-in-out"
                  >
                    Đăng Nhập
                  </button>
                </form>
                <p className="mt-8 text-sm text-gray-600 text-center">
                  Chưa có tài khoản?{' '}
                  <button
                    onClick={() => navigate('/register')}
                    className="border-b border-gray-500 border-dotted text-blue-600 hover:text-blue-800"
                  >
                    Đăng ký tại đây
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[30%] bg-indigo-100 text-center hidden lg:flex">
          <div className="flex flex-col items-center justify-center w-full">
            <img
              src={logoFPT}
              alt="FPT University Logo"
              className="w-60 h-60 object-contain"
            />
            <div className="text-center mt-4">
              <h2 className="text-2xl font-bold text-orange-600"></h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
