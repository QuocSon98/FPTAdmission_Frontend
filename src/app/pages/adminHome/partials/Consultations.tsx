"use client"

import { useEffect, useState } from "react"
import { parse, format, addWeeks, startOfWeek, addDays, isToday, addHours, isBefore, startOfDay, endOfDay } from "date-fns"
import {
  FiEdit,
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiFilter,
  FiX,
  FiCheck,
  FiClock,
} from "react-icons/fi"
import type { ScheduleItem } from "../models/ScheduleModel"
import { api } from "../services/scheduleService"
import { getAllAccounts } from "../services/accountService"
import type { Account } from "../models/UserModel"

const hours = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"]

interface Slot {
  date: string
  time: string
  assignedTo: string[]
}

export default function AdminConsultationsPage() {
  const [slots, setSlots] = useState<Slot[]>([])
  const [filterDate, setFilterDate] = useState<string>("")
  const [filterStaff, setFilterStaff] = useState<string>("")
  const [editingSlot, setEditingSlot] = useState<Slot | null>(null)
  const [modalStaff, setModalStaff] = useState<string[]>([])
  const [weekOffset, setWeekOffset] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [staffList, setStaffList] = useState<Account[]>([])

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 })
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = addDays(addWeeks(weekStart, weekOffset), i)
    return d
  })

  const today = startOfDay(new Date())

  useEffect(() => {
    const fetchSlots = async () => {
      setIsLoading(true)

      const from = startOfDay(days[0])
      const to = endOfDay(days[6])

      try {
        const response = await api.get('/scheduler/get', {
          params: {
            page: 0,
            size: 100,
          },
        })
        const data = response.data

        const apiSlots: ScheduleItem[] = data.listData || []

        const allSlots: Slot[] = []

        // Lọc lại theo khoảng ngày tuần hiện tại
        apiSlots.forEach((item) => {
          item.bookingList.forEach((booking) => {
            // Convert "21-06-25" => Date
            const availableDate = parse(booking.availableDate, "dd-MM-yy", new Date())
            const startTime = parse(booking.startTime, "dd-MM-yy HH:mm", new Date())

            if (availableDate >= from && availableDate <= to) {
              allSlots.push({
                date: format(availableDate, "yyyy-MM-dd"),
                time: format(startTime, "HH:mm"),
                assignedTo: booking.staffUuid ? [booking.staffUuid] : [],
              })
            }
          })
        })

        setSlots(allSlots)
      } catch (err) {
        console.error("Error fetching schedules:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSlots()
    fetchStaffList()
  }, [weekOffset])

  const fetchStaffList = async () => {
    try {
      const response = await getAllAccounts({ page: 0, size: 100 })
      const allAccounts = response.data?.listData || []

      const consultants: Account[] = allAccounts.filter((account: Account) => account.role === "CONSULTANT")

      setStaffList(consultants)
    } catch (error) {
      console.error("Failed to fetch staff list:", error)
    }
  }

  const toggleAssign = (date: string, time: string) => {
    const slot = slots.find((s) => s.date === date && s.time === time)
    setEditingSlot(slot || { date, time, assignedTo: [] })
    fetchStaffList()
    setModalStaff(slot?.assignedTo || [])
  }

  const saveSlot = async () => {
    if (!editingSlot) return

    setIsLoading(true)

    // Chuyển định dạng sang đúng kiểu API yêu cầu
    const start = new Date(`${editingSlot.date}T${editingSlot.time}`)
    const end = addHours(start, 1)
    const payload = {
      bookings: modalStaff.map((staffUuid) => ({
        staff_uuid: staffUuid,
        availableDate: format(new Date(editingSlot.date), "dd-MM-yy"),
        startTime: format(start, "dd-MM-yy HH:mm"),
        endTime: format(end, "dd-MM-yy HH:mm"),
      }))
    }

    try {
      // Gọi API thực tế
      await api.post("/scheduler/create", payload)

      // Cập nhật giao diện local sau khi gọi API thành công
      setSlots((prev) => {
        const exists = prev.find((s) => s.date === editingSlot.date && s.time === editingSlot.time)
        const updatedSlot: Slot = { ...editingSlot, assignedTo: modalStaff || null }

        if (exists) {
          return prev.map((s) =>
            s.date === editingSlot.date && s.time === editingSlot.time ? updatedSlot : s
          )
        } else {
          return [...prev, updatedSlot]
        }
      })
    } catch (error) {
      console.error("Failed to save slot:", error)
    } finally {
      setIsLoading(false)
      setEditingSlot(null)
      setModalStaff([])
    }
  }

  const getSlotStatus = (date: string, time: string) => {
    const slot = slots.find((s) => s.date === date && s.time === time)
    if (!slot) return "empty"
    return slot.assignedTo ? "assigned" : "available"
  }

  const getSlotStatusClass = (status: string) => {
    switch (status) {
      case "assigned":
        return "bg-green-50 border-green-200 text-green-700"
      case "available":
        return "bg-blue-50 border-blue-200 text-blue-700"
      default:
        return "bg-gray-50 border-gray-200 text-gray-400"
    }
  }

  const filteredDays = filterDate ? days.filter((day) => format(day, "yyyy-MM-dd") === filterDate) : days

  const clearFilters = () => {
    setFilterDate("")
    setFilterStaff("")
  }

  return (
    <div className="bg-white h-full">
      <div className="max-w-7xl h-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Lịch tư vấn tuyển sinh</h1>
          <p className="mt-2 text-sm text-gray-500">Quản lý và phân công lịch tư vấn cho nhân viên</p>
        </div>

        {/* Calendar Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setWeekOffset((prev) => prev - 1)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Previous week"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>

            <div className="px-4 py-2 bg-gray-100 rounded-lg flex items-center">
              <FiCalendar className="mr-2 text-gray-600" />
              <span className="font-medium">
                {format(days[0], "dd MMM")} - {format(days[6], "dd MMM yyyy")}
              </span>
            </div>

            <button
              onClick={() => setWeekOffset((prev) => prev + 1)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Next week"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => setWeekOffset(0)}
              className="ml-2 px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
            >
              Hôm nay
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              <FiFilter className="mr-2" />
              <span>Bộ lọc</span>
              {(filterDate ) && (
                <span className="ml-2 w-5 h-5 flex items-center justify-center bg-blue-500 text-white text-xs rounded-full">
                  {(filterDate ? 1 : 0) }
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex flex-wrap items-end gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ngày cụ thể</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              

              <button
                onClick={clearFilters}
                className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                <FiX className="mr-1 inline" /> Xóa bộ lọc
              </button>
            </div>
          </div>
        )}

        {/* Calendar Grid */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[120px_repeat(7,1fr)] border-b">
            <div className="p-3 font-medium text-gray-500 bg-gray-50 border-r">Giờ</div>
            {filteredDays.map((day, i) => {
              const isCurrentDay = isToday(day)

              return (
                <div
                  key={i}
                  className={`p-3 text-center font-medium ${isCurrentDay ? "bg-blue-50 text-blue-700" : "bg-gray-50 text-gray-700"
                    } ${i < filteredDays.length - 1 ? "border-r" : ""}`}
                >
                  <div className="text-sm uppercase">{format(day, "EEE")}</div>
                  <div className={`text-lg ${isCurrentDay ? "font-bold" : ""}`}>{format(day, "dd/MM")}</div>
                </div>
              )
            })}
          </div>

          {/* Time Slots */}
          <div className="divide-y">
            {hours.map((time) => {
              // Check if we should show this time slot based on filters
              const hasVisibleSlot =
                !filterStaff ||
                filteredDays.some((day) => {
                  const dateStr = format(day, "yyyy-MM-dd")
                  const slot = slots.find((s) => s.date === dateStr && s.time === time)
                  return !slot || !slot.assignedTo || slot.assignedTo.includes(filterStaff.toLowerCase())
                })

              if (!hasVisibleSlot) return null

              return (
                <div key={time} className="grid grid-cols-[120px_repeat(7,1fr)]">
                  <div className="p-3 flex items-center justify-center border-r bg-gray-50">
                    <div className="flex items-center">
                      <FiClock className="mr-2 text-gray-500" />
                      <span className="font-medium">{time}</span>
                    </div>
                  </div>

                  {filteredDays.map((day, i) => {
                    const dateStr = format(day, "yyyy-MM-dd")
                    if (filterDate && filterDate !== dateStr) return <div key={i}></div>

                    const slot = slots.find((s) => s.date === dateStr && s.time === time)
                    const status = getSlotStatus(dateStr, time)

                    if (
                      filterStaff &&
                      slot &&
                      slot.assignedTo &&
                      !slot.assignedTo.includes(filterStaff.toLowerCase())
                    ) {
                      return <div key={i}></div>
                    }

                    return (
                      <div
                        key={`${dateStr}-${time}`}
                        className={`p-3 border-r last:border-r-0 min-h-[80px] ${getSlotStatusClass(status)} 
                          ${isBefore(day, today) ? "opacity-50 cursor-not-allowed" : "hover:shadow-md cursor-pointer"} transition-all relative`}
                        onClick={() => {
                          if (isBefore(day, today)) return
                          toggleAssign(dateStr, time)
                        }}
                      >
                        <div className="flex flex-col h-full justify-center items-center text-center">
                          {status === "assigned" && (
                            <>
                              <div className="absolute top-2 right-2">
                                <span className="flex h-2 w-2 relative">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                              </div>
                              <FiCheck className="text-green-500 mb-1" size={18} />
                              <span className="font-medium">{slot?.assignedTo
                                .map((uuid) => staffList.find((s) => s.uuid === uuid)?.fullName || "")
                                .join(", ")}</span>
                            </>
                          )}

                          {status === "available" && (
                            <>
                              <span className="text-blue-500 font-medium">Trống</span>
                              <span className="text-xs text-blue-400 mt-1">Nhấn để phân công</span>
                            </>
                          )}

                          {status === "empty" && (
                            <>
                              <span className="text-gray-400">Chưa tạo</span>
                              <span className="text-xs text-gray-300 mt-1">Nhấn để tạo mới</span>
                            </>
                          )}
                        </div>

                        {!isBefore(day, today) && (
                          <button
                            className="absolute top-2 left-2 p-1 rounded-full hover:bg-white/50 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleAssign(dateStr, time)
                            }}
                          >
                            <FiEdit className="text-gray-500" size={14} />
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm text-gray-600">Đã phân công</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-sm text-gray-600">Trống (đã tạo)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-gray-300 mr-2"></div>
            <span className="text-sm text-gray-600">Chưa tạo</span>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingSlot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-1">Phân công tư vấn viên</h2>
            <div className="flex items-center text-gray-500 mb-4">
              <FiCalendar className="mr-2" />
              <span>
                {format(new Date(editingSlot.date), "EEEE, dd/MM/yyyy")} - {editingSlot.time}
              </span>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Chọn nhân viên tư vấn</label>
              <select
                multiple
                value={modalStaff}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions, option => option.value)
                  setModalStaff(selected)
                }}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Để trống (không phân công) --</option>
                {staffList.map((staff) => (
                  <option key={staff.uuid} value={staff.uuid}>
                    {staff.fullName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingSlot(null)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={saveSlot}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
              >
                {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

