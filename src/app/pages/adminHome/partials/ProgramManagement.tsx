import type React from "react"

import { useEffect, useState } from "react"
import type { Campus, Major, Specialization } from "../models/ProgramModel"
import { api } from "../services/programService"
import toast, { Toaster } from "react-hot-toast"

export default function ProgramManagement() {
    // State management
    const [majors, setMajors] = useState<Major[]>([])
    const [campuses, setCampuses] = useState<Campus[]>([])
    const [specializations, setSpecializations] = useState<Specialization[]>([])

    // Active tab
    const [activeTab, setActiveTab] = useState("majors")

    // Modal states
    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [modalType, setModalType] = useState<"major" | "campus" | "specialization">("major")
    const [editingItem, setEditingItem] = useState<any>(null)
    const [deleteItem, setDeleteItem] = useState<any>(null)

    // Form states
    const [formData, setFormData] = useState<any>({})

    // Search state
    const [searchTerm, setSearchTerm] = useState("")

    const fetchAllData = async () => {
        try {
            const [majorsRes, campusesRes, SpecializationRes] = await Promise.all([
                api.get("/major", { params: { page: 0, size: 100 } }),
                api.get("/campus/get", { params: { page: 0, size: 100 } }),
                api.get("/specialization", { params: { page: 0, size: 100 } }),
            ])

            setMajors(majorsRes.data.listData || majorsRes.data)
            setCampuses(campusesRes.data.listData || campusesRes.data)
            setSpecializations(SpecializationRes.data.listData || SpecializationRes.data)
            // console.log(majorsRes.data, campusesRes.data, SpecializationRes.data);

        } catch (error) {
            console.error("Lỗi khi load dữ liệu:", error)
            toast.error("Không thể tải danh sách dữ liệu!")
        }
    }

    useEffect(() => {
        fetchAllData()
    }, [])

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        if (name === "major") {
        const selectedMajor = majors.find((m) => m.id === value);
        setFormData((prev: any) => ({ ...prev, major: selectedMajor || null }));
    } else {
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
    }

    // Open modal for adding/editing
    const openModal = (type: typeof modalType, item?: any) => {
        setModalType(type)
        setEditingItem(item)
        setFormData(item || {})
        setShowModal(true)
    }

    // Close modal
    const closeModal = () => {
        setShowModal(false)
        setEditingItem(null)
        setFormData({})
    }

    // Open delete confirmation
    const openDeleteModal = (item: any, type: typeof modalType) => {
        setDeleteItem(item)
        setModalType(type)
        setShowDeleteModal(true)
    }

    // Close delete modal
    const closeDeleteModal = () => {
        setShowDeleteModal(false)
        setDeleteItem(null)
    }


    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!modalType || !formData) return

        try {
            let payload: any = {}

            // Tùy loại dữ liệu mà xử lý
            switch (modalType) {
                case "major":
                    payload = { ...formData }
                    break

                case "campus":
                    payload = { ...formData }
                    break

                case "specialization":
                    payload = { ...formData, major:{id: formData.major.id} }
                    break
            }

            if (editingItem) {
                // Cập nhật
                const idToDelete = getIdFromItem(editingItem)
                if(!idToDelete) return
                await api.put(`/${modalType}/${idToDelete}`, payload)
                toast.success("Cập nhật thành công")
                // Optionally update UI state
            } else {
                // Tạo mới
                await api.post(`/${modalType}`, payload)
                toast.success("Thêm thành công")
                // Optionally update UI state
            }

            // Option 1: Gọi lại API để load mới toàn bộ (gợi ý nếu dữ liệu phụ thuộc lẫn nhau)
            await fetchAllData()

            // Option 2: Có thể setState thủ công nếu bạn chắc chắn đúng
            // setMajors([...majors, response.data]) etc...

            closeModal()
        } catch (error) {
            console.error("Submit failed:", error)
            toast.error("Thất bại!")
        }
    }

    const getIdFromItem = (item: any) => {
        return item?.id || item?.specializationId
    }
    // Handle delete
    const handleDelete = async () => {
        if (!deleteItem || !modalType) return
        const idToDelete = getIdFromItem(deleteItem)
        if(!idToDelete) return
        try {
            await api.delete(`/${modalType}/${idToDelete}`)

            switch (modalType) {
                case "major":
                    setMajors(majors.filter((m) => m.id !== idToDelete))
                    break
                case "campus":
                    setCampuses(campuses.filter((c) => c.id !== idToDelete))
                    break
                case "specialization":
                    setSpecializations(specializations.filter((s) => s.specializationId !== idToDelete))
                    break
            }
            toast.success("Xóa thành công")
            closeDeleteModal()
        } catch (error) {
            console.error("Xóa thất bại:", error)
            toast.error("Xóa thất bại")
        }
    }

    // Filter functions
    const filteredMajors = majors.filter(
        (m) =>
            (m.name?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
            (m.description?.toLowerCase() ?? "").includes(searchTerm.toLowerCase())
    )

    const filteredCampuses = campuses.filter(
        (c) =>
            (c.name?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
            (c.address?.toLowerCase() ?? "").includes(searchTerm.toLowerCase())
    )

    const filteredSpecializations = specializations.filter(
        (s) =>
            (s.name?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
            (s.major?.name?.toLowerCase() ?? "").includes(searchTerm.toLowerCase())
    )


    // Render form fields based on modal type
    const renderFormFields = () => {
        switch (modalType) {
            case "major":
                return (
                    <>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tên Major</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name || ""}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                            <textarea
                                name="description"
                                value={formData.description || ""}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </>
                )

            case "campus":
                return (
                    <>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tên Campus</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name || ""}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address || ""}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                            <textarea
                                name="description"
                                value={formData.description || ""}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                                type="text"
                                name="email"
                                value={formData.email || ""}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone || ""}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">URL hình ảnh</label>
                            <input
                                type="text"
                                name="imageUrl"
                                value={formData.imageUrl || ""}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </>
                )

            case "specialization":
                return (
                    <>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tên Specialization</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name || ""}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                            <textarea
                                name="description"
                                value={formData.description || ""}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Major</label>
                            <select
                                name="major"
                                value={formData.major?.id || ""}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Chọn major</option>
                                {majors.map((major) => (
                                    <option key={major.id} value={major.id}>
                                        {major.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>
                )
            default:
                return null
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <Toaster position="top-right" />
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Chương trình đào tạo</h1>
                    <p className="text-gray-600">Quản lý Major, Campus, Specialization </p>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            {[
                                { id: "majors", name: "Majors" },
                                { id: "campuses", name: "Campuses" },
                                { id: "specializations", name: "Specializations" },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`${activeTab === tab.id
                                        ? "border-blue-500 text-blue-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                >
                                    {tab.name}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="p-6">
                        {/* Majors Tab */}
                        {activeTab === "majors" && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900">Majors</h2>
                                        <p className="text-gray-600">Quản lý các ngành học chính</p>
                                    </div>
                                    <button
                                        onClick={() => openModal("major")}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Thêm Major
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Tên
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Mô tả
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Hành động
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredMajors.map((major) => (
                                                <tr key={major.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {major.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">{major.description}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button
                                                            onClick={() => openModal("major", major)}
                                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                                />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => openDeleteModal(major, "major")}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Campuses Tab */}
                        {activeTab === "campuses" && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900">Campuses</h2>
                                        <p className="text-gray-600">Quản lý các cơ sở</p>
                                    </div>
                                    <button
                                        onClick={() => openModal("campus")}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Thêm Campus
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Tên
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Địa chỉ
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Mô tả
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Email
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Số điện thoại
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Hành động
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredCampuses.map((campus) => (
                                                <tr key={campus.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {campus.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">{campus.address}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">{campus.description}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">{campus.email}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">{campus.phone}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button
                                                            onClick={() => openModal("campus", campus)}
                                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                                />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => openDeleteModal(campus, "campus")}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Specializations Tab */}
                        {activeTab === "specializations" && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900">Specializations</h2>
                                        <p className="text-gray-600">Quản lý các chuyên ngành</p>
                                    </div>
                                    <button
                                        onClick={() => openModal("specialization")}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Thêm Specialization
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Tên
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Mô tả
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Major
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Hành động
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredSpecializations.map((specialization) => (
                                                <tr key={specialization.specializationId}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {specialization.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">{specialization.description}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                            {specialization.major?.name || "Chưa được gán ngành"}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button
                                                            onClick={() =>
                                                                openModal("specialization", { ...specialization, majorId: specialization.major.id })
                                                            }
                                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                                />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => openDeleteModal(specialization, "specialization")}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Add/Edit Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/30 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                            <div className="mt-3">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    {editingItem ? `Sửa ${modalType}` : `Thêm ${modalType} mới`}
                                </h3>
                                <form onSubmit={handleSubmit}>
                                    {renderFormFields()}
                                    <div className="flex justify-end space-x-3 mt-6">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            {editingItem ? "Cập nhật" : "Thêm"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black/30 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                            <div className="mt-3 text-center">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                    <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mt-4">Xác nhận xóa</h3>
                                <div className="mt-2 px-7 py-3">
                                    <p className="text-sm text-gray-500">
                                        Bạn có chắc chắn muốn xóa {modalType} "{deleteItem?.name}"? Hành động này không thể hoàn tác.
                                    </p>
                                </div>
                                <div className="flex justify-center space-x-3 mt-4">
                                    <button
                                        onClick={closeDeleteModal}
                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
