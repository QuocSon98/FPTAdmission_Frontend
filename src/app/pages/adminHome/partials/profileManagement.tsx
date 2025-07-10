"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { FiUser, FiMail, FiPhone, FiMapPin, FiCamera, FiEdit3, FiSave, FiX, FiLock } from "react-icons/fi"
import { motion } from "framer-motion"
import ChangePasswordModal from "./ChangePasswordModal"
import type { AccountUpdate } from "../../authentication/models/loginModel"
import { updateAccount } from "../services/accountService"

export default function ProfileManagement() {
    const [profile, setProfile] = useState<AccountUpdate>({
        uuid: "",
        userName: "",
        role: "",
        email: "",
        phone: "",
        fullName: "",
        address: "",
        image: "",
    })

    const [editMode, setEditMode] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
    const [imagePreview, setImagePreview] = useState<string>("")
    const [originalProfile, setOriginalProfile] = useState<AccountUpdate | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("account");
        if (storedUser) {
            setProfile(JSON.parse(storedUser));
            setOriginalProfile(JSON.parse(storedUser)); // Lưu bản gốc để so sánh
        }
    }, []);

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                // 5MB limit
                setError("Kích thước ảnh không được vượt quá 5MB")
                return
            }

            const reader = new FileReader()
            reader.onload = (e) => {
                const result = e.target?.result as string
                setImagePreview(result)
                setProfile((prev) => ({ ...prev, image: result }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        // Validation
        const { userName, email, phone, fullName, address } = profile
        if (!userName.trim()) {
            setError("UserName cannot be blank")
            setLoading(false)
            return
        }
        if (!/^\S+$/.test(userName)) {
            setError("Username cannot have space!")
            setLoading(false)
            return
        }

        if (!email.trim()) {
            setError("Email cannot be blank")
            setLoading(false)
            return
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Invalid Email!")
            setLoading(false)
            return
        }

        if (!phone.trim()) {
            setError("Phone cannot be blank")
            setLoading(false)
            return
        }
        if (!/^(84|0[3|5|7|8|9])(\d{8})$/.test(phone)) {
            setError("Invalid phone!")
            setLoading(false)
            return
        }

        if (!fullName.trim()) {
            setError("Name cannot be blank")
            setLoading(false)
            return
        }
        if (/\d/.test(fullName)) {
            setError("Name cannot contain numbers!")
            setLoading(false)
            return
        }

        if (!address.trim()) {
            setError("Address cannot be blank")
            setLoading(false)
            return
        }
        try {
            const response = await updateAccount(`/${profile.uuid}`, {
                email: profile.email,
                phone: profile.phone,
                fullName: profile.fullName,
                address: profile.address,
                image: profile.image,
            },
            )

            if (response.status === 200) {
                setSuccess(true)
                setEditMode(false)
                localStorage.setItem("account", JSON.stringify({ ...profile }));
                setTimeout(() => setSuccess(false), 3000)
            } else {
                setError("Không thể cập nhật thông tin. Vui lòng thử lại.")
            }
        } catch (err) {
            setError("Không thể kết nối đến server.")
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        setEditMode(false)
        setImagePreview("")
        setError("")
        // Reset form data if needed
        if (originalProfile) {
            setProfile(originalProfile);
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Thông tin cá nhân</h1>
                        <p className="text-gray-600 mt-1">Quản lý thông tin tài khoản của bạn</p>
                    </div>
                    <div className="flex space-x-3">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowChangePasswordModal(true)}
                            className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                        >
                            <FiLock className="mr-2" size={16} />
                            Đổi mật khẩu
                        </motion.button>
                        {!editMode ? (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setEditMode(true)}
                                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                            >
                                <FiEdit3 className="mr-2" size={16} />
                                Chỉnh sửa
                            </motion.button>
                        ) : (
                            <div className="flex space-x-2">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleCancel}
                                    className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                                >
                                    <FiX className="mr-2" size={16} />
                                    Hủy
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:opacity-50"
                                >
                                    <FiSave className="mr-2" size={16} />
                                    {loading ? "Đang lưu..." : "Lưu"}
                                </motion.button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Success Message */}
            {success && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg"
                >
                    Thông tin đã được cập nhật thành công!
                </motion.div>
            )}

            {/* Error Message */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg"
                >
                    {error}
                </motion.div>
            )}

            {/* Profile Form */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Avatar Section */}
                        <div className="lg:col-span-1">
                            <div className="text-center">
                                <div className="relative inline-block">
                                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                        {profile.image || imagePreview ? (
                                            <img src={imagePreview || profile.image} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <FiUser size={48} className="text-gray-400" />
                                        )}
                                    </div>
                                    {editMode && (
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="absolute bottom-0 right-0 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition"
                                        >
                                            <FiCamera size={16} />
                                        </button>
                                    )}
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                                <h3 className="mt-4 text-lg font-semibold text-gray-900">{profile.fullName}</h3>
                                <p className="text-gray-600">Quản trị viên hệ thống</p>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                                    <div className="relative">
                                        <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="text"
                                            value={profile.fullName}
                                            onChange={(e) => setProfile((prev) => ({ ...prev, fullName: e.target.value }))}
                                            disabled={!editMode}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                                            placeholder="Nhập họ và tên"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <div className="relative">
                                        <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="email"
                                            value={profile.email}
                                            onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                                            disabled={!editMode}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                                            placeholder="Nhập email"
                                        />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                                    <div className="relative">
                                        <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="tel"
                                            value={profile.phone}
                                            onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                                            disabled={!editMode}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                                            placeholder="Nhập số điện thoại"
                                        />
                                    </div>
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
                                    <div className="relative">
                                        <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="text"
                                            value={profile.address}
                                            onChange={(e) => setProfile((prev) => ({ ...prev, address: e.target.value }))}
                                            disabled={!editMode}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                                            placeholder="Nhập địa chỉ"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* Account Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin tài khoản</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ngày tạo tài khoản</label>
                        <p className="text-gray-900">15/01/2024</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lần đăng nhập cuối</label>
                        <p className="text-gray-900">{new Date().toLocaleString("vi-VN")}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            Quản trị viên
                        </span>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Hoạt động
                        </span>
                    </div>
                </div>
            </div>

            {/* Change Password Modal */}
            <ChangePasswordModal isOpen={showChangePasswordModal} onClose={() => setShowChangePasswordModal(false)} />
        </div>
    )
}
