"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import axios from "axios"

export default function ResetPassword() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setMessage("Token không hợp lệ")
      setMessageType("error")
    }
  }, [token])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!password || !confirmPassword) {
      setMessage("Vui lòng nhập đầy đủ thông tin")
      setMessageType("error")
      return
    }

    if (password.length < 6) {
      setMessage("Mật khẩu phải có ít nhất 6 ký tự")
      setMessageType("error")
      return
    }

    if (password !== confirmPassword) {
      setMessage("Mật khẩu không khớp")
      setMessageType("error")
      return
    }

    setIsLoading(true)
    try {
      await axios.post("http://localhost:8082/api/reset-password", {
        password: password,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Đặt lại mật khẩu thành công!")
      setMessageType("success")
      setTimeout(() => navigate("/login"), 2000)
    } catch (error) {
      setMessage("Có lỗi xảy ra. Vui lòng thử lại.")
      setMessageType("error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-lg m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-8 flex flex-col items-center">
            <h1 className="text-3xl xl:text-4xl font-extrabold mb-8">Đặt lại mật khẩu</h1>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-md">
                {message && (
                  <div
                    className={`px-4 py-3 rounded relative mb-6 ${messageType === "success"
                      ? "bg-green-100 border border-green-400 text-green-700"
                      : "bg-red-100 border border-red-400 text-red-700"
                      }`}
                  >
                    {message}
                  </div>
                )}

                <form onSubmit={handleResetPassword} className="space-y-5">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Mật khẩu mới *
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu mới"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <span className={showPassword ? "text-red-500 font-medium" : "text-blue-500 font-medium"}>
                          {showPassword ? "Ẩn" : "Hiện"}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Xác nhận mật khẩu *
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Nhập lại mật khẩu mới"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        <span
                          className={showConfirmPassword ? "text-red-500 font-medium" : "text-blue-500 font-medium"}
                        >
                          {showConfirmPassword ? "Ẩn" : "Hiện"}
                        </span>
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !token}
                    className="w-full tracking-wide font-semibold bg-orange-500 text-gray-100 py-4 rounded-lg hover:bg-orange-700 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
                  </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                  <a href="/login" className="text-orange-500 hover:text-orange-600 font-medium">
                    Quay lại đăng nhập
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="w-60 h-60 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <div className="text-6xl font-bold text-orange-500">FPT</div>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-orange-600">Đại học FPT</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
