import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faShieldAlt, faCode } from '@fortawesome/free-solid-svg-icons';
import { 
    faShieldAlt, 
    faCar, 
    faCode, 
    faArrowsToCircle, 
    faPaintBrush, 
    faMicrochip, 
    faBrain 
} from '@fortawesome/free-solid-svg-icons';

const InformationTechnology: React.FC = () => {
    const specializations = [
        {
            id: 'attt',
            name: 'An toàn thông tin',
            icon: faShieldAlt,
            image: 'https://daihoc.fpt.edu.vn/wp-content/uploads/2024/11/cyber-security-concept-digital-art-1024x574.avif',
            description: 'Chuyên ngành đào tạo về bảo mật và an ninh mạng',
            link: '/informationSecurity'
        },
        {
            id: 'cnots',
            name: 'Công nghệ ô tô số',
            icon: faCar,
            image: 'https://daihoc.fpt.edu.vn/wp-content/uploads/2024/11/black-generic-sport-unbranded-car-analytical-records-white-isolated-dark-background-1024x462.avif',
            description: 'Chuyên ngành về phân tích và xử lý dữ liệu lớn',
            link: '/digitalCarTechnology'
        },
        {
            id: 'ktpm',
            name: 'Kỹ thuật phần mềm',
            icon: faCode,
            image: 'https://daihoc.fpt.edu.vn/wp-content/uploads/2024/11/man-sits-front-window-looking-cityscape-1024x256.avif',
            description: 'Chuyên ngành đào tạo về bảo mật và an ninh mạng',
            link: '/softwareEngineering'
        },
        {
            id: 'cds',
            name: 'Chuyển đổi số',
            icon: faArrowsToCircle,
            image: 'https://daihoc.fpt.edu.vn/wp-content/uploads/2016/11/PHOTO-1-1024x293.avif',
            description: 'Chuyên ngành về phân tích và xử lý dữ liệu lớn',
            link: '/digitalConversion'
        },
        {
            id: 'tkmts',
            name: 'Thiết kế mỹ thuật số',
            icon: faPaintBrush,
            image: 'https://daihoc.fpt.edu.vn/wp-content/uploads/2024/11/thiet-ke-my-thuat-so-650x731.avif',
            description: 'Chuyên ngành đào tạo về bảo mật và an ninh mạng',
            link: '/digitalDesign'
        },
        {
            id: 'tkvibd',
            name: 'Thiết kế vi mạch bán dẫn',
            icon: faMicrochip,
            image: 'https://daihoc.fpt.edu.vn/wp-content/uploads/2024/11/detailed-view-computer-circuit-board-suitable-technology-concepts-650x371.avif',
            description: 'Chuyên ngành về phân tích và xử lý dữ liệu lớn',
            link: '/semiconductorDesign'
        },
        {
            id: 'ttnt',
            name: 'Trí tuệ nhân tạo',
            icon: faBrain,
            image: 'https://daihoc.fpt.edu.vn/wp-content/uploads/2024/11/quantum-cognition-bio-cybernetic-interface-cortical-network-cortical-enhancement-neural-optimiz-650x433.avif',
            description: 'Chuyên ngành về phân tích và xử lý dữ liệu lớn',
            link: '/artificialIntelligence'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Banner Section */}
            <div className="relative h-[250px]">
                <img
                    src="/src/app/assets/img03.png"
                    alt="Banner"
                    className="w-full h-full object-cover brightness-50"
                />
                <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                       text-6xl text-white text-center">
                    CÔNG NGHỆ THÔNG TIN
                </h1>
            </div>

            {/* Specializations Section */}
            <div className="max-w-5xl mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-12 bg-orange-500 text-white py-4 rounded-lg shadow-lg">
                    CÔNG NGHỆ THÔNG TIN
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {specializations.map((spec) => (
                        <Link
                            key={spec.id}
                            to={spec.link}
                            className="group"
                        >
                            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                                <div className="relative h-48">
                                    <img
                                        src={spec.image}
                                        alt={spec.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-30 transition-opacity"></div>
                                    <div className="absolute top-4 right-4 bg-orange-500 p-3 rounded-full">
                                        <FontAwesomeIcon icon={spec.icon} className="text-white text-xl" />
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                                        {spec.name}
                                    </h3>
                                    <p className="text-gray-600">
                                        {spec.description}
                                    </p>
                                    <div className="mt-4 flex items-center text-orange-500 group-hover:text-orange-600">
                                        Tìm hiểu thêm
                                        <span className="ml-2 transform group-hover:translate-x-2 transition-transform">
                                            →
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InformationTechnology;