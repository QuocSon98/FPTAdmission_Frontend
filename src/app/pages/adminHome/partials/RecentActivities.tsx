"use client"

import { FiUser, FiFileText, FiMessageSquare, FiSettings } from "react-icons/fi"
import { motion } from "framer-motion"

const activities = [
  {
    id: 1,
    type: "user",
    message: "Người dùng mới đăng ký: Nguyễn Văn A",
    time: "5 phút trước",
    icon: FiUser,
    color: "bg-blue-500",
  },
  {
    id: 2,
    type: "consultation",
    message: "Tư vấn mới từ Trần Thị B về ngành CNTT",
    time: "15 phút trước",
    icon: FiMessageSquare,
    color: "bg-green-500",
  },
  {
    id: 3,
    type: "report",
    message: "Báo cáo tháng 12 đã được tạo",
    time: "1 giờ trước",
    icon: FiFileText,
    color: "bg-orange-500",
  },
  {
    id: 4,
    type: "system",
    message: "Cập nhật hệ thống thành công",
    time: "2 giờ trước",
    icon: FiSettings,
    color: "bg-purple-500",
  },
]

export default function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động gần đây</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-start space-x-3"
            >
              <div className={`w-8 h-8 ${activity.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                <Icon className="text-white" size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
      <button className="w-full mt-4 text-sm text-orange-600 hover:text-orange-700 font-medium">
        Xem tất cả hoạt động
      </button>
    </motion.div>
  )
}
