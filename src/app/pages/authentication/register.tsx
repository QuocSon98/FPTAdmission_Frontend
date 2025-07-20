import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import logoFPT from '../../../app/assets/logo-fpt.png'
import { registerAPI } from "./services/authService"
import type { RegisterFormData } from "./models/loginModel"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiLoader } from "react-icons/bi"
import toast from "react-hot-toast"

export default function Register() {
  const [data, setData] = useState<RegisterFormData>({
    userName: "",
    email: "",
    phone: "",
    password: "",
    fullName: "",
    address: "",
    role: "USER",
  })

  const [message, setMessage] = useState<string | null>(null)
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (field: keyof RegisterFormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }))
    setMessage(null)
  }

  const validateForm = (): boolean => {
    if (
      !data.userName ||
      !data.email ||
      !data.phone ||
      !data.password ||
      !data.fullName ||
      !data.address ||
      !data.role
    ) {
      setMessage("Vui lòng nhập đầy đủ thông tin")
      setMessageType("error")
      return false
    }

    if (data.userName.length < 3) {
      setMessage("Tên đăng nhập phải có ít nhất 5 ký tự")
      setMessageType("error")
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      setMessage("Email không hợp lệ")
      setMessageType("error")
      return false
    }

    const phoneRegex = /^0[0-9]{9,10}$/
    if (!phoneRegex.test(data.phone)) {
      setMessage("Số điện thoại phải bắt đầu bằng số 0 và có 10-11 chữ số")
      setMessageType("error")
      return false
    }

    if (data.password.length < 6) {
      setMessage("Mật khẩu phải có ít nhất 6 ký tự")
      setMessageType("error")
      return false
    }

    return true
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validateForm()) return
    setIsLoading(true)
    try {
      const res = await registerAPI(data)
      if (res.status === 201) {
        setMessage("Đăng ký thành công!")
        toast.success("Đăng ký thành công! Vui lòng đăng nhập.")
        setMessageType("success")
        setTimeout(() => navigate("/login"), 1500)
      }
    } catch (error) {
      setMessage("Đăng ký thất bại! Vui lòng thử lại.")
      toast.error("Đăng ký thất bại! Vui lòng thử lại.")
      setMessageType("error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-lg m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-[70%] p-6 sm:p-10">
          <div className="mt-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">Tạo Tài Khoản</h1>
            <div className="w-full flex-1">
              <div className="mx-auto max-w-sm">
                {message && (
                  <div
                    className={`px-4 py-3 rounded mb-5 ${messageType === "success"
                      ? "bg-green-100 border border-green-400 text-green-700"
                      : "bg-red-100 border border-red-400 text-red-700"
                      }`}
                  >
                    {message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { id: 'userName', label: 'Tên Đăng Nhập', type: 'text' },
                    { id: 'fullName', label: 'Họ và Tên', type: 'text' },
                    { id: 'email', label: 'Email', type: 'email' },
                    { id: 'phone', label: 'Số Điện Thoại', type: 'tel' },
                    { id: 'address', label: 'Địa Chỉ', type: 'text' },
                  ].map(({ id, label, type }) => (
                    <div key={id}>
                      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                        {label} *
                      </label>
                      <input
                        id={id}
                        type={type}
                        placeholder={`Nhập ${label.toLowerCase()}`}
                        value={data[id as keyof RegisterFormData]}
                        onChange={(e) => handleInputChange(id as keyof RegisterFormData, e.target.value)}
                        className="w-full px-5 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  ))}

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Mật Khẩu *
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu"
                        value={data.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="w-full px-5 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <span className={showPassword ? "text-red-500 font-medium" : "text-blue-500 font-medium"}>
                          {showPassword ? (
                            <AiOutlineEyeInvisible className="h-5 w-5 transition-colors" />
                          ) : (
                            <AiOutlineEye className="h-5 w-5 transition-colors" />
                          )}
                        </span>
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-4 tracking-wide font-semibold bg-orange-500 text-white w-full py-3 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <BiLoader className="animate-spin h-5 w-5 mr-2" />
                        Đang xử lí...
                      </div>
                    ) : (
                      "Đăng Ký"
                    )}

                  </button>
                </form>

                <p className="mt-5 text-sm text-gray-600 text-center">
                  Đã có tài khoản?{" "}
                  <button
                    onClick={() => navigate('/login')}
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    Đăng nhập tại đây
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Logo Section */}
        <div className="w-[30%] bg-indigo-100 text-center hidden lg:flex">
          <div className="flex flex-col items-center justify-center w-full px-4 py-8">
            <div className="w-52 h-52 bg-orange-100 rounded-full flex items-center justify-center mb-6">
              <img src={logoFPT} alt="FPT University Logo" className="" />
            </div>
            <div className="text-center mt-2">
              <h2 className="text-2xl font-bold text-orange-600 mb-2">Đại học FPT</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Tham gia cộng đồng sinh viên và giảng viên Đại học FPT để khám phá những cơ hội học tập và phát triển tuyệt vời.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
