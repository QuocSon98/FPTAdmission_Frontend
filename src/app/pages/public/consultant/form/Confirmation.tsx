import React, { useState } from 'react';
// import { mockCampusList, mockSpecializationList, ProvinceList } from '../data/mockData';
import { LuGraduationCap, LuBuilding } from "react-icons/lu";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FiUser, FiMail, FiPhone, FiMapPin, FiAward, FiCalendar, FiClock } from 'react-icons/fi';
import type { ProcessPage } from '../interface/interface';
import { sendData } from '../data/getApi';

const ConfirmationStep: React.FC<ProcessPage> = ({
    formData,
    onPrevious,
    onSubmit
}) => {

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            fullname: formData.fullname,
            email: formData.email,
            phone: formData.phone,
            province: formData.province,
            address: formData.address,
            campusUuid: formData.campusUuid,
            specializationUuid: formData.specializationUuid,
            scholarshipUuid: formData.scholarshipUuid,
            bookingUuid: formData.bookingUuid
        };

        try {
            await sendData('/application/submit', 'post', payload);
            setIsSubmitted(true); // ✅ Đánh dấu đã gửi
            onSubmit?.();
        } catch (error) {
            alert('Có lỗi xảy ra khi gửi thông tin.');
            console.error('Lỗi gửi API:', error);
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <IoMdCheckmarkCircleOutline className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Xác nhận thông tin</h2>
                <p className="text-gray-600">Vui lòng kiểm tra lại thông tin trước khi gửi</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                {/* Thông tin cá nhân */}
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FiUser className="h-5 w-5 mr-2 text-orange-500" />
                        Thông tin cá nhân
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <FiUser className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-sm text-gray-600 mr-2">Họ tên:</span>
                            <span className="font-medium">{formData.fullname}</span>
                        </div>
                        <div className="flex items-center">
                            <FiMail className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-sm text-gray-600 mr-2">Email:</span>
                            <span className="font-medium">{formData.email}</span>
                        </div>
                        <div className="flex items-center">
                            <FiPhone className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-sm text-gray-600 mr-2">Điện thoại:</span>
                            <span className="font-medium">{formData.phone}</span>
                        </div>
                        <div className="flex items-center">
                            <FiMapPin className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-sm text-gray-600 mr-2">Tỉnh/TP:</span>
                            <span className="font-medium">{formData.province}</span>
                        </div>
                        <div className="flex items-start md:col-span-2">
                            <FiMapPin className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                            <span className="text-sm text-gray-600 mr-2">Địa chỉ:</span>
                            <span className="font-medium">{formData.address}</span>
                        </div>
                    </div>
                </div>

                {/* Thông tin tư vấn */}
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <LuGraduationCap className="h-5 w-5 mr-2 text-orange-500" />
                        Thông tin tư vấn
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <LuBuilding className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-sm text-gray-600 mr-2">Cơ sở:</span>
                            <span className="font-medium">{formData.campusName || 'Không rõ'}</span>
                        </div>
                        <div className="flex items-center">
                            <LuGraduationCap className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-sm text-gray-600 mr-2">Chuyên ngành:</span>
                            <span className="font-medium">{formData.specializationName || 'Không rõ'}</span>
                        </div>
                        <div className="flex items-center md:col-span-2">
                            <FiAward className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-sm text-gray-600 mr-2">Quan tâm học bổng:</span>
                            <span className={`font-medium ${formData.scholarshipUuid ? 'text-green-600' : 'text-gray-500'}`}>
                                {formData.scholarshipName || 'Không'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Thông tin lịch hẹn */}
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FiCalendar className="h-5 w-5 mr-2 text-orange-500" />
                        Thông tin lịch hẹn
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <FiCalendar className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-sm text-gray-600 mr-2">Ngày:</span>
                            <span className="font-medium">
                                {formatDate(formData.consultationDate || '')}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <FiClock className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-sm text-gray-600 mr-2">Giờ:</span>
                            <span className="font-medium">
                                {formData.consultationTime || 'Không có'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center pt-6">
                {isSubmitted ? (
                    <a
                        href="/"
                        className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600"
                    >
                        Về trang chủ
                    </a>
                ) : (
                    <>
                        <button
                            type="button"
                            onClick={onPrevious}
                            className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50"
                        >
                            Quay lại
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="ml-4 px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
                        >
                            Xác nhận đăng ký
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ConfirmationStep;