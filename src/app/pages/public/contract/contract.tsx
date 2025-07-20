import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Building2, Users } from 'lucide-react';
import TitleBanner from './../../../components/banner/titleBanner';

interface Campus {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
}

const ContactPage = () => {
    const [campuses, setCampuses] = useState<Campus[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCampuses = async () => {
            try {
                setLoading(true);
                // Try to fetch from API
                const response = await fetch('http://localhost:8080/api/campus/get');

                if (!response.ok) {
                    throw new Error('Failed to fetch campus data');
                }

                const data = await response.json();
                setCampuses(data);
            } catch (err) {
                console.log('API not available, using fallback data');
                // Use fallback data if API is not available
            } finally {
                setLoading(false);
            }
        };

        fetchCampuses();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Đang tải thông tin liên hệ...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
            {/* Banner */}
            <TitleBanner title='LIÊN HỆ VỚI CHÚNG TÔI' />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200 mb-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <Building2 className="h-8 w-8 text-orange-600" />
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Trường Đại học FPT</h1>
                                    <p className="text-sm text-gray-600">Hệ thống đào tạo công nghệ hàng đầu</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 text-orange-600">
                                <Users className="h-5 w-5" />
                                <span className="text-sm font-medium">{campuses.length} Cơ sở</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Campus Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {campuses.map((campus, index) => (
                        <div
                            key={campus.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                            style={{
                                animationDelay: `${index * 100}ms`,
                                animation: 'slideUp 0.6s ease-out forwards'
                            }}
                        >
                            {/* Campus Header */}
                            <div className="bg-orange-500 p-6 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold">{campus.name}</h3>
                                    </div>
                                    <div className="">
                                        <Building2 className="h-8 w-8" />
                                    </div>
                                </div>
                            </div>

                            {/* Campus Details */}
                            <div className="p-6">

                                {/* Address */}
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <MapPin className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                                        <p className="text-gray-800 text-lg font-medium leading-relaxed">
                                            {campus.address}
                                        </p>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-center space-x-3">
                                        <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                                        <p className="text-gray-800 text-lg font-medium leading-relaxed">
                                            {campus.phone}
                                        </p>
                                    </div>

                                    {/* Email */}
                                    <div className="flex items-center space-x-3">
                                        <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
                                        <p className="text-gray-800 text-lg font-medium leading-relaxed">
                                            {campus.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ContactPage;
