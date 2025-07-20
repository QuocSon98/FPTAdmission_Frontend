"use client"

import { FiUsers, FiFileText, FiTrendingUp, FiMessageSquare } from "react-icons/fi"
import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import { api } from "../services/scheduleService";
import type { ApplicationReportResponse, BookingReportResponse, UserReportResponse } from "../models/DashBoardModel";

export default function DashboardStats() {
  const [bookingReport, setBookingReport] = useState<BookingReportResponse>();
  const [userCount, setUserCount] = useState<UserReportResponse>();
  const [applicationReport, setApplicationReport] = useState<ApplicationReportResponse>();

  useEffect(() => {
    // Giả lập việc lấy dữ liệu từ API
    const fetchData = async () => {
      try {
        const fetchedUserCount = await api.get('/user-report/get');
        const fetchedBookingReport = await api.get('/booking-report/get');
        const fetchedApplicationReport = await api.get('/application-report/get');

        setUserCount(fetchedUserCount.data);
        setBookingReport(fetchedBookingReport.data);
        setApplicationReport(fetchedApplicationReport.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }

    }

    fetchData();
  }, []);

  const stats = [
    {
      title: "Tổng người dùng",
      value: `${userCount?.newUser}`,
      change: "+1%",
      changeType: "increase",
      icon: FiUsers,
      color: "bg-blue-500",
    },
    {
      title: "Tư vấn trong tháng",
      value: `${bookingReport?.completedCount}`,
      change: "+0%",
      changeType: "increase",
      icon: FiMessageSquare,
      color: "bg-green-500",
    },
    {
      title: "Báo cáo mới",
      value: `${applicationReport?.totalApplication}`,
      change: "+0%",
      changeType: "increase",
      icon: FiFileText,
      color: "bg-orange-500",
    },
    // {
    //   title: "Tỷ lệ thành công",
    //   value: "94.5%",
    //   change: "+2.1%",
    //   changeType: "increase",
    //   icon: FiTrendingUp,
    //   color: "bg-purple-500",
    // },
  ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                    className={`text-sm font-medium ${stat.changeType === "increase" ? "text-green-600" : "text-red-600"
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
