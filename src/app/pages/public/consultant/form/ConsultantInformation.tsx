import React, { useEffect, useState } from 'react';
import { FiAward } from 'react-icons/fi';
import { LuGraduationCap, LuBuilding } from "react-icons/lu";
import type { Campus, ProcessPage, Scholarship, Specialization } from '../interface/interface';
import { getApi } from '../data/getApi';

const ConsultationInformation: React.FC<ProcessPage> = ({
    formData,
    updateFormData,
    onNext,
    onPrevious
}) => {

    const [campusList, setCampusList] = useState<Campus[]>([]);
    const [specializationList, setSpecializationList] = useState<Specialization[]>([]);
    const [scholarshipList, setScholarshipList] = useState<Scholarship[]>([]);


    useEffect(() => {
        Promise.all([
            getApi('/campus/get').then(data => setCampusList(Array.isArray(data) ? data : [])),
            getApi('/specialization', { page: 0, size: 1000 }).then(data => setSpecializationList(data?.listData || [])),
            getApi('/scholarship').then(data => setScholarshipList(Array.isArray(data) ? data : [])),
        ]).catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            updateFormData({ [name]: checked });
        } else {
            updateFormData({ [name]: value });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Lưu thêm name cho UUID để hiển thị sau
        const campus = campusList.find(c => c.id === formData.campusUuid);
        const specialization = specializationList.find(s => s.specializationId === formData.specializationUuid);
        const scholarship = scholarshipList.find(s => s.id === formData.scholarshipUuid);

        updateFormData({
            campusName: campus?.name || '',
            specializationName: specialization?.name || '',
            scholarshipName: scholarship?.name || ''
        });

        if (onNext) onNext();
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Thông tin tư vấn</h2>
                <p className="text-gray-600">Chọn chuyên ngành và cơ sở bạn quan tâm</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                        <LuBuilding className="h-4 w-4 mr-2 text-orange-500" />
                        Cơ sở đào tạo
                        <span className="text-red-500 ml-1">*</span>
                    </label>
                    <select
                        name="campusUuid"
                        value={formData.campusUuid}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    >
                        <option value="">Chọn cơ sở đào tạo</option>
                        {campusList.map(({ id, name }) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                        <LuGraduationCap className="h-4 w-4 mr-2 text-orange-500" />
                        Chuyên ngành quan tâm
                        <span className="text-red-500 ml-1">*</span>
                    </label>
                    <select
                        name="specializationUuid"
                        value={formData.specializationUuid}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    >
                        <option value="">Chọn chuyên ngành</option>
                        {specializationList.map(({ specializationId, name }) => (
                            <option key={specializationId} value={specializationId}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                        <FiAward className="h-4 w-4 mr-2 text-orange-500" />
                        Chương trình học bổng (nếu có)
                    </label>
                    <select
                        name="scholarshipUuid"
                        value={formData.scholarshipUuid || ""}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    >
                        <option value="">Không chọn học bổng</option>
                        {scholarshipList.map(({ id, name }) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>

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
                        className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                        Tiếp theo
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ConsultationInformation;