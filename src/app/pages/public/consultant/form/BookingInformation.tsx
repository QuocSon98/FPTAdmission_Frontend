import React, { useState } from 'react';
import { FiCalendar, FiClock, FiAlertCircle, FiUser, FiLoader, FiCheckCircle } from 'react-icons/fi';
import type { ProcessPage, SchedulerFilter } from '../interface/interface';
import { getApi } from '../data/getApi';

const BookingInformation: React.FC<ProcessPage> = ({
    formData,
    updateFormData,
    onNext,
    onPrevious
}) => {
    const [timeSlots, setTimeSlots] = useState<SchedulerFilter[]>([]);
    const [consultants, setConsultants] = useState<SchedulerFilter[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingConsultants, setLoadingConsultants] = useState(false);

    const handleDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = e.target.value;
        updateFormData({ consultationDate: date, consultationTime: '', schedularUuid: '', bookingUuid: '' });
        setConsultants([]);
        await fetchTimeSlots(date);
    };

    const fetchTimeSlots = async (date: string) => {
        setLoading(true);
        const hours = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];
        const allSlots: SchedulerFilter[] = [];

        try {
            for (const time of hours) {
                const res = await getApi('/scheduler/filter', { date, time, page: 0, size: 10 });
                const valid = (res?.listData || []).filter((slot: SchedulerFilter) =>
                    slot.status === 'AVAILABLE' && new Date(slot.availableDate) > new Date()
                );
                allSlots.push(...valid);
            }
            setTimeSlots(allSlots);
        } catch (err) {
            console.error("Lỗi lấy khung giờ:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchConsultantsByTime = async (date: string, time: string) => {
        setLoadingConsultants(true);
        try {
            const res = await getApi('/scheduler/filter', { date, time, page: 0, size: 10 });
            const valid = (res?.listData || []).filter((slot: SchedulerFilter) =>
                slot.status === 'AVAILABLE' && new Date(slot.availableDate) > new Date()
            );
            setConsultants(valid);
        } catch (err) {
            console.error("Lỗi lấy tư vấn viên:", err);
        } finally {
            setLoadingConsultants(false);
        }
    };

    const handleTimeSelect = (slot: SchedulerFilter) => {
        const start = new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const end = new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const startTimeStr = typeof slot.startTime === 'string'
            ? slot.startTime
            : new Date(slot.startTime).toISOString();

        const selectedDate = startTimeStr.split('T')[0];
        const selectedTime = startTimeStr.split('T')[1].substring(0, 5); // "HH:mm"

        updateFormData({
            consultationTime: `${start} - ${end}`,
            bookingUuid: '',
        });

        fetchConsultantsByTime(selectedDate, selectedTime);
    };

    const handleConsultantSelect = (bookingUuid: string) => {
        updateFormData({ bookingUuid });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.consultationDate && formData.consultationTime && formData.bookingUuid) {
            onNext?.();
        }
    };

    const today = new Date().toISOString().split('T')[0];
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    const maxDateString = maxDate.toISOString().split('T')[0];
    const isFormValid = formData.consultationDate && formData.consultationTime && formData.bookingUuid;

    return (
        <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Đặt lịch hẹn</h2>
                <p className="text-gray-600">Chọn ngày và giờ phù hợp cho buổi tư vấn</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Date Selection */}
                <div className="space-y-4">
                    <label className="flex items-center text-lg font-semibold text-gray-700">
                        <FiCalendar className="h-5 w-5 mr-2 text-orange-500" />
                        Ngày tư vấn <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                        type="date"
                        name="consultationDate"
                        value={formData.consultationDate || ''}
                        onChange={handleDateChange}
                        min={today}
                        max={maxDateString}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 text-lg"
                    />
                </div>

                {/* Time Selection */}
                <div className="space-y-4">
                    <label className="flex items-center text-lg font-semibold text-gray-700">
                        <FiClock className="h-5 w-5 mr-2 text-orange-500" />
                        Giờ tư vấn <span className="text-red-500 ml-1">*</span>
                    </label>
                    {loading ? (
                        <p className="text-gray-500">Đang tải khung giờ khả dụng...</p>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {timeSlots
                                .filter((slot, idx, arr) =>
                                    arr.findIndex(s => s.startTime === slot.startTime) === idx
                                )
                                .map((slot, idx) => {
                                    const start = new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                    const end = new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                    const value = `${start} - ${end}`;
                                    const isSelected = formData.consultationTime === value;

                                    return (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={() => handleTimeSelect(slot)}
                                            className={`p-4 rounded-lg border-2 text-center transition-all duration-200
                                                ${isSelected
                                                    ? 'bg-orange-500 border-orange-500 text-white shadow-lg ring-4 ring-orange-200'
                                                    : 'bg-white border-gray-300 text-gray-700 hover:border-orange-300 hover:bg-orange-50'}
                                            `}
                                        >
                                            <div className="font-semibold text-sm">{start}</div>
                                            <div className="text-xs opacity-75">đến {end}</div>
                                        </button>
                                    );
                                })}
                            {timeSlots.length === 0 && !loading && (
                                <p className="col-span-full text-sm text-gray-500">Không có khung giờ khả dụng</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Consultant Selection */}
                {formData.consultationTime && (
                    <div className="space-y-4">
                        <label className="flex items-center text-lg font-semibold text-gray-700">
                            <FiUser className="h-5 w-5 mr-2 text-orange-500" />
                            Chọn tư vấn viên <span className="text-red-500 ml-1">*</span>
                        </label>

                        {loadingConsultants ? (
                            <div className="flex items-center justify-center py-12">
                                <FiLoader className="h-8 w-8 animate-spin text-orange-500 mr-3" />
                                <span className="text-gray-600">Đang tìm tư vấn viên có sẵn...</span>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {consultants.map((consultant) => {
                                    const selectedStart = new Date(`1970-01-01T${formData.consultationTime?.split(' - ')[0]}:00`);
                                    const consultantStart = new Date(consultant.startTime);
                                    const isAvailable = selectedStart.getHours() === consultantStart.getHours()
                                        && selectedStart.getMinutes() === consultantStart.getMinutes();
                                    const isSelected = formData.bookingUuid === consultant.bookingUuid;

                                    return (
                                        <button
                                            key={consultant.staffUuid}
                                            type="button"
                                            onClick={() => handleConsultantSelect(consultant.bookingUuid)}
                                            className="relative p-4 rounded-lg border-2 text-left transition-all duration-200 transform hover:scale-105"
                                        >
                                            <div className="flex items-start space-x-3">
                                                <img
                                                    src={consultant.image}
                                                    alt={consultant.fullName}
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-gray-900 truncate">{consultant.fullName}</h3>
                                                    <p className="text-sm text-gray-600 truncate">{consultant.email}</p>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                {isAvailable ? (
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        Có sẵn
                                                    </span>
                                                ) : (
                                                    <p className="text-xs text-gray-500">
                                                        Có sẵn lúc {consultantStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                )}
                                            </div>
                                            {isSelected && (
                                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                                                    <FiCheckCircle className="w-4 h-4 text-white" />
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* Info Box */}
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <div className="flex items-start space-x-3">
                        <FiAlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold text-blue-900 mb-2">Lưu ý quan trọng:</h3>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>• Buổi tư vấn kéo dài 30-45 phút</li>
                                <li>• Vui lòng có mặt đúng giờ</li>
                                <li>• Báo trước nếu muốn thay đổi lịch</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-between pt-6">
                    <button
                        type="button"
                        onClick={onPrevious}
                        className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                    >
                        Quay lại
                    </button>
                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className={`px-8 py-3 font-semibold rounded-lg focus:ring-2 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl
                            ${isFormValid
                                ? 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
                        `}
                    >
                        Tiếp theo
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookingInformation;
