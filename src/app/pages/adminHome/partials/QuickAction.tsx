"use client"

import { FiUserPlus, FiFileText, FiSettings, FiMessageSquare } from "react-icons/fi"
import { motion } from "framer-motion"

interface QuickActionsProps {
  onAddUser: () => void
}

const actions = [
  {
    title: "Thêm người dùng",
    description: "Tạo tài khoản mới",
    icon: FiUserPlus,
    color: "bg-blue-500 hover:bg-blue-600",
    action: "addUser",
  },
  {
    title: "Tạo báo cáo",
    description: "Xuất báo cáo thống kê",
    icon: FiFileText,
    color: "bg-green-500 hover:bg-green-600",
    action: "createReport",
  },
  {
    title: "Cài đặt hệ thống",
    description: "Quản lý cấu hình",
    icon: FiSettings,
    color: "bg-purple-500 hover:bg-purple-600",
    action: "settings",
  },
  {
    title: "Tư vấn mới",
    description: "Xem yêu cầu tư vấn",
    icon: FiMessageSquare,
    color: "bg-orange-500 hover:bg-orange-600",
    action: "consultation",
  },
]

export default function QuickActions({ onAddUser }: QuickActionsProps) {
  const handleAction = (action: string) => {
    switch (action) {
      case "addUser":
        onAddUser()
        break
      case "createReport":
        console.log("Create report")
        break
      case "settings":
        console.log("Open settings")
        break
      case "consultation":
        console.log("View consultations")
        break
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h3>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <motion.button
              key={action.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              onClick={() => handleAction(action.action)}
              className={`${action.color} text-white p-4 rounded-lg transition-colors text-left`}
            >
              <Icon size={24} className="mb-2" />
              <h4 className="font-medium text-sm">{action.title}</h4>
              <p className="text-xs opacity-90">{action.description}</p>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
