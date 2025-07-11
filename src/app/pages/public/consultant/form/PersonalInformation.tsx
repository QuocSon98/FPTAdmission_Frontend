import React, { useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiHome } from 'react-icons/fi';
import { ProvinceList } from '../data/data';
import type { ProcessPage } from '../interface/interface';

const PersonalInformation: React.FC<ProcessPage> = ({
    formData,
    updateFormData,
    onNext
}) => {

    useEffect(() => {
        const accountData = localStorage.getItem('account');
        if (accountData) {
            try {
                const account = JSON.parse(accountData);

                // Chỉ update nếu dữ liệu khác
                if (
                    formData.fullName !== account.fullName ||
                    formData.email !== account.email ||
                    formData.phone !== account.phone ||
                    formData.address !== account.address
                ) {
                    updateFormData({
                        fullName: account.fullName || '',
                        email: account.email || '',
                        phone: account.phone || '',
                        address: account.address || ''
                    });
                }
            } catch (error) {
                console.error('Error parsing account data:', error);
            }
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onNext) {
            onNext();
        }
    };

    const formFields = [
        { name: 'fullName', label: 'Họ và tên', type: 'text', icon: FiUser, required: true },
        { name: 'email', label: 'Email', type: 'email', icon: FiMail, required: true },
        { name: 'phone', label: 'Số điện thoại', type: 'tel', icon: FiPhone, required: true, pattern: '[0-9]{10,11}' },
        { name: 'address', label: 'Địa chỉ', type: 'text', icon: FiHome, required: true }
    ];

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Thông tin cá nhân</h2>
                <p className="text-gray-600">Vui lòng cung cấp thông tin cá nhân của bạn</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {formFields.map(({ name, label, type, icon: Icon, required, pattern }) => (
                        <div key={name} className="space-y-2">
                            <label className="flex items-center text-sm font-semibold text-gray-700">
                                <Icon className="h-4 w-4 mr-2 text-orange-500" />
                                {label}
                                {required && <span className="text-red-500 ml-1">*</span>}
                            </label>
                            <input
                                type={type}
                                name={name}
                                value={formData[name as keyof typeof formData] as string || ''}
                                onChange={handleInputChange}
                                required={required}
                                pattern={pattern}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                                placeholder={`Nhập ${label.toLowerCase()}`}
                            />
                        </div>
                    ))}
                </div>

                <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                        <FiMapPin className="h-4 w-4 mr-2 text-orange-500" />
                        Tỉnh/Thành phố
                        <span className="text-red-500 ml-1">*</span>
                    </label>
                    <select
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    >
                        {ProvinceList.map(({ value, label }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end pt-6">
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

export default PersonalInformation;