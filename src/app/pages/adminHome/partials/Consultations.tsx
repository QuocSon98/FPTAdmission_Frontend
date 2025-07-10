"use client"

import { useCallback, useEffect, useState } from "react"
import {
  parse,
  format,
  addWeeks,
  startOfWeek,
  addDays,
  isToday,
  addHours,
  isBefore,
  startOfDay,
} from "date-fns"
import {
  FiEdit,
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiFilter,
  FiX,
  FiCheck,
  FiClock,
  FiUser,
  FiUsers,
  FiPlus,
  FiEye,
} from "react-icons/fi"
import type { ScheduleItem, Slot } from "../models/ScheduleModel"
import { api } from "../services/scheduleService"
import { getAllAccounts } from "../services/accountService"
import type { Account } from "../models/UserModel"

const hours = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"]

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
  const [candidate, setCandidate] = useState<Account[]>([])
  const [slotDetails, setSlotDetails] = useState<ScheduleItem["bookingList"] | null>(null)
  const [isDetailLoading, setIsDetailLoading] = useState<boolean>(false)


  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 })
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = addDays(addWeeks(weekStart, weekOffset), i)
    return d
  })

  const today = startOfDay(new Date())

  const fetchSlots = useCallback(async () => {
    setIsLoading(true)
    const res = await getAllAccounts({ page: 0, size: 100 });
    const allAccounts = res.data?.listData || [];
    const staffs: Account[] = allAccounts.filter((acc: Account) => acc.role === "CONSULTANT");
    const candidate: Account[] = allAccounts.filter((acc: Account) => acc.role === "USER");
    setStaffList(staffs);
    setCandidate(candidate);

    try {
      const res = await api.get("/scheduler/get", {
        params: { page: 0, size: 100 },
      });
      const apiData: ScheduleItem[] = res.data?.listData || [];

      const processedSlots: { [key: string]: Slot } = {};

      apiData.forEach((item) => {
        if (!item.bookingList || item.bookingList.length === 0) return;
        item.bookingList.forEach((booking) => {
          const startTimeObject = parse(booking.startTime, "dd-MM-yy HH:mm", new Date());
          if (isNaN(startTimeObject.getTime())) {
            console.error("--> LỖI: Parse ngày tháng thất bại! Bỏ qua item này.");
            return;
          }
          const date = format(startTimeObject, "yyyy-MM-dd");
          const time = format(startTimeObject, "HH:mm");
          const slotKey = `${date}-${time}`;
          if (!processedSlots[slotKey]) {
            processedSlots[slotKey] = {
              date,
              time,
              assignedTo: [],
              displayNames: [],
              statuses: [],
            };
          }
          const slot = processedSlots[slotKey];
          if (booking.staffUuid) {
            const staff = staffs.find((s) => s.uuid === booking.staffUuid);
            if (staff) {
              slot.assignedTo.push(staff.uuid);
              slot.displayNames?.push(staff.fullName);
              slot.statuses?.push(booking.status);
            } else {
              console.warn(`Không tìm thấy staff với uuid = ${booking.staffUuid}`);
            }
          }
        });
      });
      setSlots(Object.values(processedSlots));

    } catch (err) {
      console.error("Error fetching schedules:", err);
    } finally {
      setIsLoading(false);
    }
  }, [weekOffset])

  useEffect(() => {
    fetchSlots()
  }, [fetchSlots])

  const toggleAssign = (date: string, time: string) => {
    const slot = slots.find((s) => s.date === date && s.time === time)
    setEditingSlot(slot || { date, time, assignedTo: [] })
    setModalStaff(slot?.assignedTo || [])
  }


  const handleSlotClick = async (date: string, time: string) => {
    if (isDetailLoading) return
    setIsDetailLoading(true)
    setSlotDetails(null) // Xóa chi tiết cũ trước khi gọi API

    try {
      const payload = {
        time: time, // "HH:mm"
        date: date, // "yyyy-MM-dd"
        page: 0,
        size: 100, // Đặt size > 0 để nhận được dữ liệu, ví dụ 10
      }
      // console.log(time);
      // console.log(date);
      const res = await api.get("/scheduler/filter", { params: payload })
      const bookingDetails = res.data?.listData || []
      setSlotDetails(bookingDetails)

    } catch (error) {
      console.error("Error fetching slot details:", error)
      alert("Không thể tải chi tiết lịch. Vui lòng thử lại.")
    } finally {
      setIsDetailLoading(false)
    }
  }

  const saveSlot = async () => {
    if (!editingSlot) return

    setIsLoading(true)

    const start = new Date(`${editingSlot.date}T${editingSlot.time}`)
    const end = addHours(start, 1)

    const payload = {
      bookings: modalStaff.map((staffUuid) => ({
        staff_uuid: staffUuid,
        availableDate: format(new Date(editingSlot.date ?? ""), "dd-MM-yy"),
        startTime: format(start, "dd-MM-yy HH:mm"),
        endTime: format(end, "dd-MM-yy HH:mm"),
      })),
    }

    try {
      await api.post("/scheduler/create", payload)

      const displayNames = modalStaff.map((uuid) => staffList.find((s) => s.uuid === uuid)?.fullName || uuid)

      const updatedSlot: Slot = {
        ...editingSlot,
        assignedTo: modalStaff,
        displayNames,
      }

      setSlots((prev) => {
        const exists = prev.find((s) => s.date === editingSlot.date && s.time === editingSlot.time)
        if (exists) {
          return prev.map((s) => (s.date === editingSlot.date && s.time === editingSlot.time ? updatedSlot : s))
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
        return "bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 text-emerald-800 shadow-sm"
      case "available":
        return "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 text-blue-800 shadow-sm"
      case "empty":
        return "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 text-gray-600 hover:from-gray-100 hover:to-gray-150"
      default:
        return "bg-white border-gray-200 text-gray-500"
    }
  }

  const filteredDays = filterDate ? days.filter((day) => format(day, "yyyy-MM-dd") === filterDate) : days

  const clearFilters = () => {
    setFilterDate("")
    setFilterStaff("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
              <FiCalendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Lịch tư vấn tuyển sinh
              </h1>
              {/* <p className="mt-1 text-gray-600">Quản lý và phân công lịch tư vấn cho nhân viên</p> */}
            </div>
          </div>
        </div>

        {/* Navigation Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setWeekOffset((prev) => prev - 1)}
                className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 hover:shadow-md"
                aria-label="Previous week"
              >
                <FiChevronLeft className="w-5 h-5 text-gray-600" />
              </button>

              <div className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center text-white shadow-lg">
                <FiCalendar className="mr-3 text-blue-100" />
                <span className="font-semibold">
                  {format(days[0], "dd MMM")} - {format(days[6], "dd MMM yyyy")}
                </span>
              </div>

              <button
                onClick={() => setWeekOffset((prev) => prev + 1)}
                className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 hover:shadow-md"
                aria-label="Next week"
              >
                <FiChevronRight className="w-5 h-5 text-gray-600" />
              </button>

              <button
                onClick={() => setWeekOffset(0)}
                className="ml-2 px-4 py-2 text-sm bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-lg transition-all duration-200 font-medium text-gray-700"
              >
                Hôm nay
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 rounded-xl transition-all duration-200 border border-gray-200"
              >
                <FiFilter className="mr-2 text-gray-600" />
                <span className="font-medium text-gray-700">Bộ lọc</span>
                {filterDate && (
                  <span className="ml-2 w-5 h-5 flex items-center justify-center bg-blue-500 text-white text-xs rounded-full font-bold">
                    1
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex flex-wrap items-end gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ngày cụ thể</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>

              <button
                onClick={clearFilters}
                className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center font-medium text-gray-700"
              >
                <FiX className="mr-2" /> Xóa bộ lọc
              </button>
            </div>
          </div>
        )}

        {/* Calendar Grid */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[140px_repeat(7,1fr)] border-b border-gray-100">
            <div className="p-4 font-semibold text-gray-600 bg-gradient-to-br from-gray-50 to-gray-100 border-r border-gray-100 flex items-center">
              <FiClock className="mr-2 text-gray-500" />
              Giờ
            </div>
            {filteredDays.map((day, i) => {
              const isCurrentDay = isToday(day)

              return (
                <div
                  key={i}
                  className={`p-4 text-center font-semibold transition-all duration-200 ${isCurrentDay
                    ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg"
                    : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 hover:from-gray-100 hover:to-gray-150"
                    } ${i < filteredDays.length - 1 ? "border-r border-gray-100" : ""}`}
                >
                  <div className="text-sm uppercase tracking-wide opacity-80">{format(day, "EEE")}</div>
                  <div className={`text-lg mt-1 ${isCurrentDay ? "font-bold" : ""}`}>{format(day, "dd/MM")}</div>
                </div>
              )
            })}
          </div>

          {/* Time Slots */}
          <div className="divide-y divide-gray-100">
            {hours.map((time) => {
              const hasVisibleSlot =
                !filterStaff ||
                filteredDays.some((day) => {
                  const dateStr = format(day, "yyyy-MM-dd")
                  const slot = slots.find((s) => s.date === dateStr && s.time === time)
                  return !slot || !slot.assignedTo || slot.assignedTo.includes(filterStaff.toLowerCase())
                })

              if (!hasVisibleSlot) return null

              return (
                <div key={time} className="grid grid-cols-[140px_repeat(7,1fr)]">
                  <div className="p-4 flex items-center border-r border-gray-100 bg-gradient-to-br from-gray-50 to-gray-100">
                    <div className="flex items-center font-semibold text-gray-700">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      <span>{time}</span>
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

                    const isPastSlot = isBefore(day, today)

                    return (
                      <div
                        key={`${dateStr}-${time}`}
                        className={`p-4 border-r last:border-r-0 min-h-[100px] border-2 transition-all duration-300 relative group ${getSlotStatusClass(
                          status,
                        )} ${isPastSlot
                          ? "opacity-40 cursor-not-allowed"
                          : "hover:shadow-lg hover:scale-[1.02] cursor-pointer hover:-translate-y-1"
                          }`}
                        onClick={() => {
                          if (isPastSlot) return
                          handleSlotClick(dateStr, time)
                        }}
                      >
                        <div className="flex flex-col h-full justify-center items-center text-center relative">
                          {status === "assigned" && (
                            <>
                              <div className="absolute -top-1 -right-1 z-10">
                                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                                  <FiCheck className="text-white text-xs" />
                                </div>
                              </div>
                              <div className="flex items-center justify-center mb-2">
                                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                                  {slot?.displayNames && slot.displayNames.length > 1 ? (
                                    <FiUsers className="text-white text-lg" />
                                  ) : (
                                    <FiUser className="text-white text-lg" />
                                  )}
                                </div>
                              </div>
                              <div className="font-semibold text-sm leading-tight">
                                {slot?.displayNames?.slice(0, 2).join(", ")}
                                {slot?.displayNames && slot.displayNames.length > 2 && (
                                  <div className="text-xs opacity-75 mt-1">+{slot.displayNames.length - 2} khác</div>
                                )}
                              </div>
                            </>
                          )}

                          {status === "available" && (
                            <>
                              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg mb-2">
                                <FiClock className="text-white text-lg" />
                              </div>
                              <span className="font-semibold text-sm">Trống</span>
                              <span className="text-xs opacity-75 mt-1">Nhấn để phân công</span>
                            </>
                          )}

                          {status === "empty" && (
                            <>
                              <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center shadow-lg mb-2 group-hover:bg-gray-500 transition-colors">
                                <FiPlus className="text-white text-lg" />
                              </div>
                              <span className="font-medium text-sm">Chưa tạo</span>
                              <span className="text-xs opacity-75 mt-1">Nhấn để tạo mới</span>
                            </>
                          )}
                        </div>

                        {!isPastSlot && (
                          <button
                            className="absolute top-2 left-2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleAssign(dateStr, time)
                            }}
                          >
                            <FiEdit className="text-gray-600 text-sm" />
                          </button>
                        )}

                        {status === "assigned" && (
                          <button
                            className="absolute bottom-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleSlotClick(dateStr, time)
                            }}
                          >
                            <FiEye className="text-gray-600 text-sm" />
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
        <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Chú thích</h3>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-emerald-500 mr-3 shadow-sm"></div>
              <span className="text-sm font-medium text-gray-700">Đã phân công</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-blue-500 mr-3 shadow-sm"></div>
              <span className="text-sm font-medium text-gray-700">Trống (đã tạo)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gray-400 mr-3 shadow-sm"></div>
              <span className="text-sm font-medium text-gray-700">Chưa tạo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingSlot && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 scale-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                <FiUser className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Phân công tư vấn viên</h2>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <FiCalendar className="mr-2" />
                  <span>
                    {format(new Date(editingSlot.date ?? ""), "EEEE, dd/MM/yyyy")} - {editingSlot.time}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Chọn nhân viên tư vấn</label>
              <select
                multiple
                value={modalStaff}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions, (option) => option.value)
                  setModalStaff(selected)
                }}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-h-[120px]"
              >
                <option value="">-- Để trống (không phân công) --</option>
                {staffList.map((staff) => (
                  <option key={staff.uuid} value={staff.uuid} className="py-2">
                    {staff.fullName}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-2">Giữ Ctrl/Cmd để chọn nhiều nhân viên</p>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setEditingSlot(null)}
                className="px-6 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium text-gray-700"
              >
                Hủy
              </button>
              <button
                onClick={saveSlot}
                disabled={isLoading}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg"
              >
                {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slot Details Modal */}
      {slotDetails && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 max-h-[80vh] overflow-hidden">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                <FiEye className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Chi tiết lịch tư vấn</h2>
            </div>

            <div className="space-y-4 max-h-[400px] overflow-auto pr-2">
              {slotDetails.map((b) => (
                <div
                  key={b.uuid}
                  className="border-2 border-gray-100 p-4 rounded-xl hover:shadow-md transition-all duration-200"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <span className="text-sm font-semibold text-gray-600">Nhân viên:</span>
                      <p className="font-medium text-gray-900">
                        {staffList.find((s) => s.uuid === b.staffUuid)?.fullName || b.staffUuid}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-600">Sinh viên:</span>
                      <p className="font-medium text-gray-900">
                        {candidate.find((s) => s.uuid === b.candidateUuid)?.fullName || "Chưa có"}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-600">Thời gian:</span>
                      <p className="font-medium text-gray-900">
                        {format(new Date(b.startTime), 'dd/MM/yyyy HH:mm')} → {format(new Date(b.endTime), 'HH:mm')}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-600">Trạng thái:</span>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${b.status === "COMPLETED"
                          ? "bg-emerald-100 text-emerald-800"
                          : b.status === "PROCESSING"
                            ? "bg-yellow-100 text-yellow-800"
                            : b.status === "BOOKED"
                              ? "bg-blue-100 text-blue-800"
                              : b.status === "CANCEL"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                      >
                        {b.status}
                      </span>
                    </div>
                    {/* <div>
                      <span className="text-sm font-semibold text-gray-600">Tạo lúc:</span>
                      <p className="font-medium text-gray-900">{format(new Date(b.createdAt), "dd/MM/yyyy HH:mm")}</p>
                    </div> */}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSlotDetails(null)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
