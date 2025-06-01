import { useEffect, useState } from "react";
import { format, addWeeks, startOfWeek } from "date-fns";
import { FiEdit, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const hours = [
  "08:00", "09:00", "10:00", "11:00",
  "13:00", "14:00", "15:00", "16:00"
];

const staffList = ["Nguyen Van A", "Tran Thi B", "Le Van C", "Pham Thi D"];

interface Slot {
  date: string;
  time: string;
  assignedTo: string | null;
}

export default function AdminConsultationsPage() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [filterDate, setFilterDate] = useState<string>("");
  const [filterStaff, setFilterStaff] = useState<string>("");
  const [editingSlot, setEditingSlot] = useState<Slot | null>(null);
  const [modalStaff, setModalStaff] = useState<string>("");
  const [weekOffset, setWeekOffset] = useState<number>(0);

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = addWeeks(weekStart, weekOffset);
    d.setDate(d.getDate() + i);
    return d;
  });

  useEffect(() => {
    const fetchSlots = async () => {
      const from = format(days[0], "yyyy-MM-dd");
      const to = format(days[6], "yyyy-MM-dd");
      try {
        // TODO: Replace with your actual API endpoint
        const response = await fetch(`/api/consultations?from=${from}&to=${to}`);
        const data = await response.json();
        setSlots(data);
      } catch (error) {
        console.error("Failed to fetch slots:", error);
      }
    };
    fetchSlots();
  }, [weekOffset]);

  const toggleAssign = (date: string, time: string) => {
    const slot = slots.find((s) => s.date === date && s.time === time);
    setEditingSlot(slot || { date, time, assignedTo: null });
    setModalStaff(slot?.assignedTo || "");
  };

  const saveSlot = async () => {
    if (!editingSlot) return;
    const updatedSlot: Slot = { ...editingSlot, assignedTo: modalStaff || null };
    setSlots((prev) => {
      const exists = prev.find(
        (s) => s.date === updatedSlot.date && s.time === updatedSlot.time
      );
      if (exists) {
        return prev.map((s) =>
          s.date === updatedSlot.date && s.time === updatedSlot.time ? updatedSlot : s
        );
      } else {
        return [...prev, updatedSlot];
      }
    });
    try {
      // TODO: Replace with your actual API endpoint
      await fetch(`/api/consultations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedSlot),
      });
    } catch (error) {
      console.error("Failed to save slot:", error);
    }
    setEditingSlot(null);
    setModalStaff("");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lịch tư vấn tuyển sinh</h1>

      <div className="flex gap-4 mb-4 items-center">
        <button
          onClick={() => setWeekOffset((prev) => prev - 1)}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          <FiChevronLeft />
        </button>
        <span className="font-semibold">
          Tuần: {format(days[0], "dd/MM")} - {format(days[6], "dd/MM")}
        </span>
        <button
          onClick={() => setWeekOffset((prev) => prev + 1)}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          <FiChevronRight />
        </button>

        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="ml-auto border px-2 py-1 rounded"
        />
        <input
          type="text"
          placeholder="Lọc theo nhân viên..."
          value={filterStaff}
          onChange={(e) => setFilterStaff(e.target.value)}
          className="border px-2 py-1 rounded"
        />
      </div>

      <div className="grid grid-cols-[100px_repeat(7,minmax(0,1fr))] gap-1">
        <div className="font-semibold text-center">Giờ</div>
        {days.map((day, i) => (
          <div key={i} className="font-semibold text-center">
            {format(day, "EEE dd/MM")}
          </div>
        ))}

        {hours.map((time) => (
          <>
            <div className="text-center font-medium py-2">{time}</div>
            {days.map((day, i) => {
              const dateStr = format(day, "yyyy-MM-dd");
              if (filterDate && filterDate !== dateStr) return <div key={i}></div>;
              const slot = slots.find(
                (s) => s.date === dateStr && s.time === time
              );
              if (filterStaff && slot && !slot.assignedTo?.toLowerCase().includes(filterStaff.toLowerCase())) return <div key={i}></div>;
              return (
                <div
                  key={`${dateStr}-${time}`}
                  className="h-16 border rounded-md flex items-center justify-center cursor-pointer transition hover:shadow-md relative"
                  onClick={() => toggleAssign(dateStr, time)}
                >
                  {slot ? (
                    slot.assignedTo ? (
                      <span className="text-green-600 font-semibold">
                        {slot.assignedTo}
                      </span>
                    ) : (
                      <span className="text-yellow-500">Trống</span>
                    )
                  ) : (
                    <span className="text-gray-400">Chưa tạo</span>
                  )}
                  <FiEdit className="absolute top-1 right-1 text-gray-400" />
                </div>
              );
            })}
          </>
        ))}
      </div>

      {editingSlot && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">Chỉnh sửa slot</h2>
            <p className="mb-2">{editingSlot.date} - {editingSlot.time}</p>
            <select
              value={modalStaff}
              onChange={(e) => setModalStaff(e.target.value)}
              className="border px-2 py-1 w-full mb-4 rounded"
            >
              <option value="">-- Chọn nhân viên --</option>
              {staffList.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingSlot(null)}
                className="px-4 py-1 bg-gray-300 rounded"
              >
                Hủy
              </button>
              <button
                onClick={saveSlot}
                className="px-4 py-1 bg-blue-600 text-white rounded"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
