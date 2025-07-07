import React from 'react';
import { FiCalendar, FiClock, FiAlertCircle} from 'react-icons/fi';
import { timeSlots } from '../data/data'; // Assuming timeSlots is defined in data.ts
import type { ProcessPage } from '../interface/interface';

const BookingInformation: React.FC<ProcessPage> = ({ 
    formData, 
    updateFormData, 
    onNext, 
    onPrevious 
}) => {
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        updateFormData({ consultationDate: value });
    };

    const handleTimeSelect = (startTime: string, endTime: string, available: boolean) => {
        if (available) {
            updateFormData({ consultationTime: `${startTime} - ${endTime}` });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onNext && formData.consultationDate && formData.consultationTime) {
            onNext();
        }
    };

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    // Get date 30 days from now
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    const maxDateString = maxDate.toISOString().split('T')[0];

    const isFormValid = formData.consultationDate && formData.consultationTime;

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
                        Ngày tư vấn
                        <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                        type="date"
                        name="consultationDate"
                        value={formData.consultationDate}
                        onChange={handleDateChange}
                        min={today}
                        max={maxDateString}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 text-lg"
                    />
                </div>

                {/* Time Selection Grid */}
                <div className="space-y-4">
                    <label className="flex items-center text-lg font-semibold text-gray-700">
                        <FiClock className="h-5 w-5 mr-2 text-orange-500" />
                        Giờ tư vấn
                        <span className="text-red-500 ml-1">*</span>
                    </label>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {timeSlots.map(({ startTime, endTime, available }) => {
                            const timeSlotValue = `${startTime} - ${endTime}`;
                            const isSelected = formData.consultationTime === timeSlotValue;
                            
                            return (
                                <button
                                    key={`${startTime}-${endTime}`}
                                    type="button"
                                    onClick={() => handleTimeSelect(startTime, endTime, available)}
                                    disabled={!available}
                                    className={`
                                        relative p-4 rounded-lg border-2 text-center transition-all duration-200 transform hover:scale-105
                                        ${available 
                                            ? isSelected
                                                ? 'bg-orange-500 border-orange-500 text-white shadow-lg ring-4 ring-orange-200'
                                                : 'bg-white border-gray-300 text-gray-700 hover:border-orange-300 hover:bg-orange-50 shadow-sm hover:shadow-md'
                                            : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                                        }
                                    `}
                                >
                                    <div className="font-semibold text-sm">
                                        {startTime}
                                    </div>
                                    <div className="text-xs opacity-75">
                                        đến {endTime}
                                    </div>
                                    
                                    {/* Unavailable indicator */}
                                    {!available && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                        </div>
                                    )}
                                    
                                    {/* Selected indicator */}
                                    {isSelected && (
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-600 rounded-full flex items-center justify-center">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                    
                    {/* Legend */}
                    <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 mt-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded"></div>
                            <span>Có sẵn</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-orange-500 rounded"></div>
                            <span>Đã chọn</span>
                        </div>
                    </div>
                </div>

                {/* Information Box */}
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <div className="flex items-start space-x-3">
                        <FiAlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold text-blue-900 mb-2">Lưu ý quan trọng:</h3>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>• Buổi tư vấn sẽ diễn ra trong khoảng 30-45 phút</li>
                                <li>• Vui lòng có mặt đúng giờ đã đặt</li>
                                <li>• Nếu cần thay đổi lịch hẹn, vui lòng liên hệ trước 24 giờ</li>
                                <li>• Mang theo các giấy tờ liên quan (bằng tốt nghiệp, chứng chỉ...)</li>
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
                        className={`
                            px-8 py-3 font-semibold rounded-lg focus:ring-2 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl
                            ${isFormValid 
                                ? 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500' 
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }
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