import { useState, useEffect } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { FiTrash2,FiEdit3, FiSearch, FiPlus, FiX, FiUser, FiMail, FiPhone, FiMapPin,FiEye,FiEyeOff,FiUsers, FiFilter,} from "react-icons/fi"
import { motion, AnimatePresence } from "framer-motion"
import { register, searchAccounts, deleteAccount, getAllAccounts } from "../services/accountService"
import type { Account, NewUser } from "../models/UserModel"

interface ManageUsersProps {
  showModal?: boolean
  setShowModal?: (show: boolean) => void
}

export default function ManageUsers({ showModal = false, setShowModal }: ManageUsersProps) {
  const [query, setQuery] = useState<string>("")
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [totalElements, setTotalElements] = useState<number>(0)

  const [showAddModal, setShowAddModal] = useState<boolean>(showModal)
  const [newUser, setNewUser] = useState<NewUser>({
    userName: "",
    email: "",
    phone: "",
    password: "",
    fullName: "",
    address: "",
    role: "ADMIN",
  })
  const [adding, setAdding] = useState<boolean>(false)
  const [addError, setAddError] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [selectedRole, setSelectedRole] = useState<string>("ALL")

  // Sync with parent modal state
  useEffect(() => {
    setShowAddModal(showModal)
  }, [showModal])

  const loadAccounts = async (page = 0) => {
    setLoading(true)
    try {
      const response = await getAllAccounts({ page, size: 10 })
      setAccounts(response.data.listData || [])
      setTotalPages(response.data.totalPages || 0)
      setTotalElements(response.data.totalElements || 0)
      setCurrentPage(page)
    } catch (err) {
      console.error("Error loading accounts:", err)
      setAccounts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAccounts()
  }, [])

  const handleSearch = async () => {
    if (!query.trim()) {
      loadAccounts()
      return
    }

    setLoading(true)
    try {
      const response = await searchAccounts({ name: query, page: 0, size: 50 })
      setAccounts(response.data.listData || [])
      setTotalPages(response.data.totalPages || 0)
      setTotalElements(response.data.totalElements || 0)
      setCurrentPage(0)
    } catch (err) {
      console.error("Error searching accounts:", err)
      setAccounts([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, userName: string) => {
    if (!window.confirm(`Bạn có chắc muốn xóa người dùng "${userName}"?`)) return

    try {
      await deleteAccount(id)
      await loadAccounts(currentPage)
    } catch (error) {
      console.error("Error deleting account:", error)
      alert("Xóa thất bại. Vui lòng thử lại.")
    }
  }

  const handleNewUserChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAdding(true)
    setAddError("")

    try {
      await register(newUser)
      setShowAddModal(false)
      if (setShowModal) setShowModal(false)
      setNewUser({
        userName: "",
        email: "",
        phone: "",
        password: "",
        fullName: "",
        address: "",
        role: "ADMIN",
      })
      await loadAccounts(currentPage)
    } catch (err: any) {
      console.error("Error adding user:", err)
      setAddError(err.response?.data?.message || "Thêm người dùng thất bại")
    } finally {
      setAdding(false)
    }
  }

  const handleCloseModal = () => {
    setShowAddModal(false)
    if (setShowModal) setShowModal(false)
    setAddError("")
    setNewUser({
      userName: "",
      email: "",
      phone: "",
      password: "",
      fullName: "",
      address: "",
      role: "ADMIN",
    })
  }

  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      loadAccounts(page)
    }
  }

  const filteredAccounts =
    selectedRole === "ALL" ? accounts : accounts.filter((account) => account.role === selectedRole)

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-100 text-red-800 border-red-200"
      case "USER":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quản lý người dùng</h2>
          <p className="text-gray-600 mt-1">Tổng cộng {totalElements} người dùng</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
        >
          <FiPlus className="mr-2" size={18} />
          Thêm người dùng
        </motion.button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <FiFilter className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" size={18} />
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none bg-white"
              >
                <option value="ALL">Tất cả vai trò</option>
                <option value="ADMIN">Admin</option>
                <option value="CONSULTANT">Consultant</option>
              </select>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSearch}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Tìm kiếm
            </motion.button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Người dùng
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thông tin liên hệ
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vai trò
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Địa chỉ
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                      <span className="ml-3 text-gray-600">Đang tải...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredAccounts.length > 0 ? (
                filteredAccounts.map((account, index) => (
                  <motion.tr
                    key={account.uuid}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <FiUser className="text-orange-600" size={18} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{account.fullName}</div>
                          <div className="text-sm text-gray-500">@{account.userName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-900">
                          <FiMail className="mr-2 text-gray-400" size={14} />
                          {account.email}
                        </div>
                        {account.phone && (
                          <div className="flex items-center text-sm text-gray-500">
                            <FiPhone className="mr-2 text-gray-400" size={14} />
                            {account.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getRoleBadgeColor(account.role)}`}
                      >
                        {account.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <FiMapPin className="mr-2 text-gray-400" size={14} />
                        <span className="truncate max-w-32">{account.address || "Chưa cập nhật"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Chỉnh sửa"
                        >
                          <FiEdit3 size={16} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(account.uuid, account.userName)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Xóa"
                        >
                          <FiTrash2 size={16} />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <FiUsers className="text-gray-400 mb-4" size={48} />
                      <p className="text-gray-500 text-lg">Không tìm thấy người dùng nào</p>
                      <p className="text-gray-400 text-sm mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Hiển thị {currentPage * 10 + 1} - {Math.min((currentPage + 1) * 10, totalElements)} trong tổng số{" "}
                {totalElements} kết quả
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Trước
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = currentPage < 3 ? i : currentPage - 2 + i
                  if (page >= totalPages) return null
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 text-sm rounded-lg ${
                        page === currentPage ? "bg-orange-500 text-white" : "border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {page + 1}
                    </button>
                  )
                })}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sau
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Thêm người dùng mới</h2>
                  <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <FiX size={20} />
                  </button>
                </div>

                {addError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">{addError}</div>
                )}

                <form onSubmit={handleAddSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tên đăng nhập <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="userName"
                        type="text"
                        required
                        value={newUser.userName}
                        onChange={handleNewUserChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Nhập tên đăng nhập"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Họ và tên <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="fullName"
                        type="text"
                        required
                        value={newUser.fullName}
                        onChange={handleNewUserChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Nhập họ và tên"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        value={newUser.email}
                        onChange={handleNewUserChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Nhập email"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                      <input
                        name="phone"
                        type="tel"
                        value={newUser.phone}
                        onChange={handleNewUserChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Nhập số điện thoại"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mật khẩu <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          name="password"
                          type={showPassword ? "text" : "password"}
                          required
                          value={newUser.password}
                          onChange={handleNewUserChange}
                          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          placeholder="Nhập mật khẩu"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vai trò <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="role"
                        required
                        value={newUser.role}
                        onChange={handleNewUserChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="ADMIN">Admin</option>
                        <option value="CONSULTANT">Consultant</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Địa chỉ <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="address"
                      type="text"
                      required
                      value={newUser.address}
                      onChange={handleNewUserChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Nhập địa chỉ"
                    />
                  </div>

                  <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      disabled={adding}
                    >
                      Hủy
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
                      disabled={adding}
                    >
                      {adding ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Đang thêm...
                        </div>
                      ) : (
                        "Thêm người dùng"
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
