import type React from "react"

import { useEffect, useState } from "react"
import type { Campus, Major, Offering, Program, Specialization } from "../models/ProgramModel"
import { api } from "../services/programService"

// Mock data
const initialMajors: Major[] = [
    { id: "1", name: "Computer Science", description: "Study of computational systems and design of computer systems" },
    { id: "2", name: "Business Administration", description: "Management and administration of business operations" },
    { id: "3", name: "Engineering", description: "Application of scientific and mathematical principles" },
]

const initialCampuses: Campus[] = [
    {
        id: "1",
        name: "Main Campus",
        address: "123 University Ave, City",
        description: "Primary campus with all facilities",
    },
    {
        id: "2",
        name: "North Campus",
        address: "456 North St, City",
        description: "Secondary campus focusing on research",
    },
]

const initialSpecializations: Specialization[] = [
    { id: "1", name: "Software Engineering", description: "Focus on software development", major: initialMajors[0] },
    {
        id: "2",
        name: "Data Science",
        description: "Focus on data analysis and machine learning",
        major: initialMajors[0],
    },
    { id: "3", name: "Marketing", description: "Focus on marketing strategies", major: initialMajors[1] },
]

const initialOfferings: Offering[] = [
    {
        id: "1",
        year: 2024,
        target: 100,
        price: 50000000,
        campus: initialCampuses[0],
        specialization: initialSpecializations[0],
    },
    {
        id: "2",
        year: 2024,
        target: 80,
        price: 55000000,
        campus: initialCampuses[1],
        specialization: initialSpecializations[1],
    },
]

const initialPrograms: Program[] = [
    {
        id: "1",
        name: "Bachelor of Computer Science",
        description: "Undergraduate program in CS",
        duration: 4,
        degree: "Bachelor",
    },
    {
        id: "2",
        name: "Master of Business Administration",
        description: "Graduate program in business",
        duration: 2,
        degree: "Master",
    },
]

export default function ProgramManagement() {
    // State management
    const [majors, setMajors] = useState<Major[]>(initialMajors)
    const [campuses, setCampuses] = useState<Campus[]>(initialCampuses)
    const [specializations, setSpecializations] = useState<Specialization[]>(initialSpecializations)
    const [offerings, setOfferings] = useState<Offering[]>(initialOfferings)
    const [programs, setPrograms] = useState<Program[]>(initialPrograms)

    // Active tab
    const [activeTab, setActiveTab] = useState("majors")

    // Modal states
    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [modalType, setModalType] = useState<"major" | "campus" | "specialization" | "offering" | "program">("major")
    const [editingItem, setEditingItem] = useState<any>(null)
    const [deleteItem, setDeleteItem] = useState<any>(null)

    // Form states
    const [formData, setFormData] = useState<any>({})

    // Search state
    const [searchTerm, setSearchTerm] = useState("")

    const fetchAllData = async () => {
        try {
            const [majorsRes, campusesRes, specializationsRes, offeringsRes, programsRes] = await Promise.all([
                api.get("/major", { params: { page: 0, size: 100 } }),
                api.get("/campus", { params: { page: 0, size: 100 } }),
                api.get("/specialization", { params: { page: 0, size: 100 } }),
                api.get("/offering", { params: { page: 0, size: 100 } }),
                api.get("/program", { params: { page: 0, size: 100 } }),
            ])

            setMajors(majorsRes.data.listData || majorsRes.data)
            setCampuses(campusesRes.data.listData || campusesRes.data)
            setSpecializations(specializationsRes.data.listData || specializationsRes.data)
            setOfferings(offeringsRes.data.listData || offeringsRes.data)
            setPrograms(programsRes.data.listData || programsRes.data)
            console.log(majorsRes.data, campusesRes.data, specializationsRes.data, offeringsRes.data, programsRes.data);

        } catch (error) {
            console.error("Lỗi khi load dữ liệu:", error)
            // Optionally show toast
        }
    }

    useEffect(() => {
        fetchAllData()
    }, [])

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev: any) => ({ ...prev, [name]: value }))
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
                    payload = { ...formData, majorId: formData.majorId }
                    break

                case "offering":
                    payload = {
                        ...formData,
                        year: parseInt(formData.year),
                        target: parseInt(formData.target),
                        price: parseInt(formData.price),
                        campusId: formData.campusId,
                        specializationId: formData.specializationId,
                    }
                    break

                case "program":
                    payload = {
                        ...formData,
                        duration: parseInt(formData.duration),
                    }
                    break
            }

            if (editingItem) {
                // Cập nhật
                await api.put(`/${modalType}/${editingItem.id}`, payload)
                // Optionally update UI state
            } else {
                // Tạo mới
                await api.post(`/${modalType}`, payload)
                // Optionally update UI state
            }

            // Option 1: Gọi lại API để load mới toàn bộ (gợi ý nếu dữ liệu phụ thuộc lẫn nhau)
            await fetchAllData()

            // Option 2: Có thể setState thủ công nếu bạn chắc chắn đúng
            // setMajors([...majors, response.data]) etc...

            closeModal()
        } catch (error) {
            console.error("Submit failed:", error)
            // Hiện toast lỗi nếu muốn
        }
    }

    // Handle delete
    const handleDelete = async () => {
        if (!deleteItem?.id || !modalType) return
        try {
            await api.delete(`/${modalType}s/${deleteItem.id}`)

            switch (modalType) {
                case "major":
                    setMajors(majors.filter((m) => m.id !== deleteItem.id))
                    break
                case "campus":
                    setCampuses(campuses.filter((c) => c.id !== deleteItem.id))
                    break
                case "specialization":
                    setSpecializations(specializations.filter((s) => s.id !== deleteItem.id))
                    break
                case "offering":
                    setOfferings(offerings.filter((o) => o.id !== deleteItem.id))
                    break
                case "program":
                    setPrograms(programs.filter((p) => p.id !== deleteItem.id))
                    break
            }
            closeDeleteModal()
        } catch (error) {
            console.error("Xóa thất bại:", error)
        }
    }

    // Filter functions
    const filteredMajors = majors.filter(
        (m) =>
            m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const filteredCampuses = campuses.filter(
        (c) =>
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.address.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const filteredSpecializations = specializations.filter(
        (s) =>
            s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.major.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const filteredOfferings = offerings.filter(
        (o) =>
            o.campus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            o.specialization.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const filteredPrograms = programs.filter(
        (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.degree.toLowerCase().includes(searchTerm.toLowerCase()),
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
                                name="majorId"
                                value={formData.majorId || ""}
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

            case "offering":
                return (
                    <>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Năm</label>
                                <input
                                    type="number"
                                    name="year"
                                    value={formData.year || new Date().getFullYear()}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Chỉ tiêu</label>
                                <input
                                    type="number"
                                    name="target"
                                    value={formData.target || ""}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Học phí (VNĐ)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price || ""}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Campus</label>
                            <select
                                name="campusId"
                                value={formData.campusId || ""}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Chọn campus</option>
                                {campuses.map((campus) => (
                                    <option key={campus.id} value={campus.id}>
                                        {campus.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                            <select
                                name="specializationId"
                                value={formData.specializationId || ""}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Chọn specialization</option>
                                {specializations.map((specialization) => (
                                    <option key={specialization.id} value={specialization.id}>
                                        {specialization.name} ({specialization.major.name})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>
                )

            case "program":
                return (
                    <>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tên Program</label>
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
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Thời gian (năm)</label>
                                <input
                                    type="number"
                                    name="duration"
                                    value={formData.duration || ""}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Bằng cấp</label>
                                <select
                                    name="degree"
                                    value={formData.degree || ""}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Chọn bằng cấp</option>
                                    <option value="Bachelor">Bachelor</option>
                                    <option value="Master">Master</option>
                                    <option value="PhD">PhD</option>
                                    <option value="Diploma">Diploma</option>
                                </select>
                            </div>
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
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                    <p className="text-gray-600">Quản lý Major, Campus, Specialization, Offering và Program</p>
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
                                { id: "offerings", name: "Offerings" },
                                { id: "programs", name: "Programs" },
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
                                                <tr key={specialization.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {specialization.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">{specialization.description}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                            {specialization.major.name}
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

                        {/* Offerings Tab */}
                        {activeTab === "offerings" && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900">Offerings</h2>
                                        <p className="text-gray-600">Quản lý các đợt tuyển sinh</p>
                                    </div>
                                    <button
                                        onClick={() => openModal("offering")}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Thêm Offering
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Năm
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Specialization
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Campus
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Chỉ tiêu
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Học phí
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Hành động
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredOfferings.map((offering) => (
                                                <tr key={offering.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {offering.year}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                        <div>
                                                            <div className="font-medium">{offering.specialization.name}</div>
                                                            <div className="text-gray-500">{offering.specialization.major.name}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{offering.campus.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{offering.target}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {offering.price.toLocaleString("vi-VN")} VNĐ
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button
                                                            onClick={() =>
                                                                openModal("offering", {
                                                                    ...offering,
                                                                    campusId: offering.campus.id,
                                                                    specializationId: offering.specialization.id,
                                                                })
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
                                                            onClick={() => openDeleteModal(offering, "offering")}
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

                        {/* Programs Tab */}
                        {activeTab === "programs" && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900">Programs</h2>
                                        <p className="text-gray-600">Quản lý các chương trình đào tạo</p>
                                    </div>
                                    <button
                                        onClick={() => openModal("program")}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Thêm Program
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
                                                    Thời gian
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Bằng cấp
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Hành động
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredPrograms.map((program) => (
                                                <tr key={program.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {program.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">{program.description}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{program.duration} năm</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                            {program.degree}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button
                                                            onClick={() => openModal("program", program)}
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
                                                            onClick={() => openDeleteModal(program, "program")}
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
