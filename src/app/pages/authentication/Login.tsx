import { useState, type FormEvent } from 'react';
import { type AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import logoFPT from '../../assets/logo-fpt.png';
import type { AccountResponse } from './models/loginModel';
import { useAuth } from '../../hooks/AuthContext';
import { forgotPasswordAPI, loginAPI } from './services/authService';

export default function Login() {
  const [userName, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);
  const [forgotEmail, setForgotEmail] = useState<string>('');
  const [forgotMessage, setForgotMessage] = useState<string>('');
  const navigate = useNavigate();
  const { login } = useAuth();


  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userName || !password) {
      setMessage("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      const res: AxiosResponse<AccountResponse> = await loginAPI({ userName, password });
      login(res.data, res.data.token);
      const { token, ...accountInfo } = res.data;

      // Lưu token riêng biệt
      localStorage.setItem("token", token);

      // Lưu thông tin tài khoản (loại bỏ token)
      localStorage.setItem("account", JSON.stringify(accountInfo));

      // Điều hướng dựa trên role
      switch (accountInfo.role) {
        case "ADMIN":
          navigate("/admin");
          break;
        case "CONSULTANT":
          navigate("/consultant/home");
          break;
        case "USER":
          navigate("/"); // ví dụ khách hàng về home
          break;
        default:
          setMessage("Tài khoản không có quyền truy cập phù hợp");
          break;
      }
    } catch (error) {
      setMessage("Tên đăng nhập hoặc mật khẩu không đúng");
      console.error("Login error:", error);
    }
  };

  const handleForgotPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!forgotEmail) {
      setForgotMessage("Vui lòng nhập email")
      return
    }

    try {
      const res = await forgotPasswordAPI(forgotEmail)
      if(res.status === 200){
        setForgotMessage("Đã gửi link reset mật khẩu đến email của bạn!")
      setTimeout(() => {
        setShowForgotPassword(false)
        setForgotEmail("")
        setForgotMessage("")
      }, 2000)
      }
      
    } catch (err) {
      setForgotMessage("Có lỗi xảy ra khi gửi email")
      console.log("Error sending forgot password email:", err);

    }
  }

  const handleGoogleLogin = () => {
    // Redirect to Google OAuth
    window.location.href = "http://localhost:8082/api/auth/google"
  }

  return (
    <div className="h-screen overflow-hidden bg-gray-100 text-gray-900 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white shadow sm:rounded-lg flex">
        <div className="w-[70%] p-6 sm:p-8 flex flex-col justify-center">
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

                  <div className="flex justify-end mt-4">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                      Quên mật khẩu?
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="mt-8 tracking-wide font-semibold bg-orange-500 text-gray-100 w-full py-4 rounded-lg hover:bg-orange-700 transition-all duration-300 ease-in-out"
                  >
                    Đăng Nhập
                  </button>
                </form>

                {/* Divider */}
                <div className="my-8 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Hoặc đăng nhập với
                  </div>
                </div>

                {/* Google Login Button */}
                <button
                  onClick={handleGoogleLogin}
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-white text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline border border-gray-300 mx-auto"
                >
                  <div className="bg-white p-2 rounded-full">
                    <svg className="w-4" viewBox="0 0 533.5 544.3">
                      <path
                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                        fill="#4285f4"
                      />
                      <path
                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71.2 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                        fill="#34a853"
                      />
                      <path
                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                        fill="#fbbc04"
                      />
                      <path
                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.5-112.4 152.8-112.4z"
                        fill="#ea4335"
                      />
                    </svg>
                  </div>
                  <span className="ml-4">Đăng nhập với Google</span>
                </button>

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
        <div className="w-[30%] bg-indigo-100 hidden lg:flex items-center justify-center">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="w-60 h-60 bg-orange-100 rounded-full flex items-center justify-center mb-8">
              <img src={logoFPT} alt="FPT University Logo" className="" />
            </div>
            <div className="text-center mt-4">
              <h2 className="text-2xl font-bold text-orange-600">Đại học FPT</h2>
              <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
                Tham gia cộng đồng sinh viên và giảng viên Đại học FPT để khám phá những cơ hội học tập và phát triển
                tuyệt vời.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Quên mật khẩu</h3>
                <button
                  onClick={() => {
                    setShowForgotPassword(false)
                    setForgotEmail("")
                    setForgotMessage("")
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {forgotMessage && (
                <div
                  className={`px-4 py-3 mb-4 rounded ${forgotMessage.includes("Đã gửi")
                    ? "text-green-700 bg-green-100 border border-green-400"
                    : "text-red-700 bg-red-100 border border-red-400"
                    }`}
                >
                  {forgotMessage}
                </div>
              )}

              <form onSubmit={handleForgotPassword}>
                <div className="mb-4">
                  <label htmlFor="forgotEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    Nhập email để nhận link reset mật khẩu
                  </label>
                  <input
                    id="forgotEmail"
                    type="email"
                    placeholder="Nhập email của bạn"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(false)
                      setForgotEmail("")
                      setForgotMessage("")
                    }}
                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                  >
                    Gửi
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
