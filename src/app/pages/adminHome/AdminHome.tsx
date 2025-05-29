import { useState } from 'react';
import { FiMenu, FiBell, FiSearch, FiUser, FiLogOut, FiHome, FiMessageSquare, FiFileText, FiLock, FiKey, FiMail } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import { AnimatePresence, motion } from 'framer-motion';
import logoFPT from '../../../app/assets/logo-fpt.png';
import ManageUsers from './partials/ManageUsers';
import DashboardStats from './partials/DashboardStats';
import QuickActions from './partials/QuickAction';
import RecentActivity from './partials/RecentActivities';
import ForgotPasswordModal from './partials/ForgotPasswordModal';
import ResetPasswordModal from './partials/ResetPasswordModal';
import ChangePasswordModal from './partials/ChangePasswordModal';

interface MenuItem {
  key: "dashboard" | "users" | "consultations" | "reports" | "password-management"
  label: string
  icon: IconType
}

const menuItems: MenuItem[] = [
  { key: "dashboard", label: "Tổng quan", icon: FiHome },
  { key: 'users', label: 'Users', icon: FiUser },
  { key: 'reports', label: 'Reports', icon: FiBell },
  { key: "consultations", label: "Tư vấn", icon: FiMessageSquare },
  { key: "reports", label: "Báo cáo", icon: FiFileText },
  { key: "password-management", label: "Quản lý mật khẩu", icon: FiLock },
];

export default function AdminHome() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [active, setActive] = useState<"dashboard" | "users" | "consultations" | "reports" | "password-management">(
    "dashboard",
  )
  const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false)
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState<boolean>(false)
  const [showResetPasswordModal, setShowResetPasswordModal] = useState<boolean>(false)
  const [showChangePasswordModal, setShowChangePasswordModal] = useState<boolean>(false)

  const renderContent = () => {
    switch (active) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Tổng quan hệ thống</h1>
                <p className="text-gray-600 mt-1">Chào mừng bạn đến với hệ thống tư vấn tuyển sinh FPT</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Hôm nay</p>
                <p className="text-lg font-semibold text-gray-900">{new Date().toLocaleDateString("vi-VN")}</p>
              </div>
            </div>

            <DashboardStats />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <QuickActions onAddUser={() => setShowAddUserModal(true)} />
              <RecentActivity />
            </div>
          </div>
        )
      case "users":
        return <ManageUsers showModal={showAddUserModal} setShowModal={setShowAddUserModal} />
      case "consultations":
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Quản lý tư vấn</h2>
            <div className="text-center py-12">
              <FiMessageSquare className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600">Module tư vấn đang được phát triển</p>
              <p className="text-sm text-gray-500 mt-2">Sẽ có sớm trong phiên bản tiếp theo</p>
            </div>
          </div>
        )
      case "reports":
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Báo cáo thống kê</h2>
            <div className="text-center py-12">
              <FiFileText className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600">Module báo cáo đang được phát triển</p>
              <p className="text-sm text-gray-500 mt-2">Sẽ có sớm trong phiên bản tiếp theo</p>
            </div>
          </div>
        )
      case "password-management":
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Quản lý mật khẩu</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowForgotPasswordModal(true)}
                className="p-6 border-2 border-orange-200 rounded-xl hover:border-orange-300 transition-colors group"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                    <FiMail className="text-orange-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Quên mật khẩu</h3>
                  <p className="text-sm text-gray-600">Gửi email đặt lại mật khẩu cho người dùng</p>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowResetPasswordModal(true)}
                className="p-6 border-2 border-blue-200 rounded-xl hover:border-blue-300 transition-colors group"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                    <FiKey className="text-blue-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Đặt lại mật khẩu</h3>
                  <p className="text-sm text-gray-600">Đặt lại mật khẩu bằng token xác thực</p>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowChangePasswordModal(true)}
                className="p-6 border-2 border-green-200 rounded-xl hover:border-green-300 transition-colors group"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                    <FiLock className="text-green-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Đổi mật khẩu</h3>
                  <p className="text-sm text-gray-600">Thay đổi mật khẩu hiện tại của bạn</p>
                </div>
              </motion.button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-72 bg-gradient-to-b from-orange-500 to-orange-600 text-white shadow-xl">
        <div className="flex items-center justify-center h-20 border-b border-orange-400 bg-white shadow-sm">
          <img src={logoFPT || "/placeholder.svg"} alt="FPT" className="h-12" />
        </div>
        <nav className="flex-1 p-6">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = active === item.key
              return (
                <motion.button
                  key={item.key}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActive(item.key)}
                  className={`
                    flex items-center w-full p-4 rounded-xl transition-all duration-200
                    ${
                      isActive
                        ? "bg-white bg-opacity-20 shadow-lg backdrop-blur-sm"
                        : "hover:bg-white hover:bg-opacity-10"
                    }
                  `}
                >
                  <Icon className="mr-3 text-black" size={20} />
                  <span className="font-medium text-black">{item.label}</span>
                </motion.button>
              )
            })}
          </div>
        </nav>
        <div className="p-6 border-t border-orange-400">
          <div className="text-center text-white">
            <p className="text-sm opacity-90">Hệ thống tư vấn tuyển sinh</p>
            <p className="text-xs opacity-75 mt-1">Đại học FPT</p>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed inset-y-0 left-0 w-72 bg-gradient-to-b from-orange-500 to-orange-600 text-white z-50 lg:hidden shadow-xl"
            >
              <div className="flex items-center justify-between h-20 px-6 border-b border-orange-400">
                <img src={logoFPT || "/placeholder.svg"} alt="FPT" className="h-10" />
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition"
                >
                  <FiMenu size={24} />
                </button>
              </div>
              <nav className="p-6">
                <div className="space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon
                    const isActive = active === item.key
                    return (
                      <button
                        key={item.key}
                        onClick={() => {
                          setActive(item.key)
                          setSidebarOpen(false)
                        }}
                        className={`
                          flex items-center w-full p-4 rounded-xl transition-all duration-200
                          ${isActive ? "bg-white bg-opacity-20 shadow-lg" : "hover:bg-white hover:bg-opacity-10"}
                        `}
                      >
                        <Icon className="mr-3" size={20} />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    )
                  })}
                </div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center">
            <button
              className="lg:hidden text-gray-600 mr-4 p-2 hover:bg-gray-100 rounded-lg transition"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu size={24} />
            </button>
            <div className="relative">
              <FiSearch className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-gray-100 transition relative"
            >
              <FiBell size={20} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </motion.button>
            <div className="relative group">
              <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <FiUser size={16} className="text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">Admin</p>
                  <p className="text-xs text-gray-500">Quản trị viên</p>
                </div>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                <button className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-50 transition">
                  <FiUser className="mr-3" size={16} />
                  Thông tin cá nhân
                </button>
                <button className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-50 transition">
                  <FiLock className="mr-3" size={16} />
                  Đổi mật khẩu
                </button>
                <hr className="my-1" />
                <button className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 transition">
                  <FiLogOut className="mr-3" size={16} />
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
      </div>

      {/* Modals */}
      <ForgotPasswordModal isOpen={showForgotPasswordModal} onClose={() => setShowForgotPasswordModal(false)} />
      <ResetPasswordModal isOpen={showResetPasswordModal} onClose={() => setShowResetPasswordModal(false)} />
      <ChangePasswordModal isOpen={showChangePasswordModal} onClose={() => setShowChangePasswordModal(false)} />
    </div>
  )
}
