"use client"

import { FiUsers, FiFileText, FiTrendingUp, FiMessageSquare } from "react-icons/fi"
import { motion } from "framer-motion"
import { useState } from "react";
import { useWebSocket } from "../../../hooks/websocket";

export default function DashboardStats() {
  const [bookingReport, setBookingReport] = useState(42); // giá trị ban đầu
  // Lắng nghe report mới từ topic WebSocket
  useWebSocket(
    (message) => {
      console.log("Received new report:", message);
      setBookingReport((prev) => prev + 1);
    },
    "/topic/report-channel/new-booking-report/FPT" // sửa tên campus nếu cần
  );
const stats = [
  {
    title: "Tổng người dùng",
    value: "1,234",
    change: "+12%",
    changeType: "increase",
    icon: FiUsers,
    color: "bg-blue-500",
  },
  {
    title: "Tư vấn trong tháng",
    value: `${bookingReport}`,
    change: "+8%",
    changeType: "increase",
    icon: FiMessageSquare,
    color: "bg-green-500",
  },
  {
    title: "Báo cáo mới",
    value: "43",
    change: "+23%",
    changeType: "increase",
    icon: FiFileText,
    color: "bg-orange-500",
  },
  {
    title: "Tỷ lệ thành công",
    value: "94.5%",
    change: "+2.1%",
    changeType: "increase",
    icon: FiTrendingUp,
    color: "bg-purple-500",
  },
]
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === "increase" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">so với tháng trước</span>
                </div>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <Icon className="text-white" size={24} />
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
