import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { MajorData } from '../major/IMajor';

interface ITMajorPageProps {
    majorData: MajorData;
}

const ITMajorPage: React.FC<ITMajorPageProps> = ({ majorData }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative h-[250px]">
                <img
                    src={majorData.bannerImage}
                    alt={`${majorData.name} Banner`}
                    className="w-full h-full object-cover brightness-50"
                />
                <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                       text-7xl text-white text-center">
                    {majorData.name}
                </h1>
            </div>

            {/* Content Sections */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                {/* Description */}
                <div className="bg-orange-50 p-8 rounded-lg shadow-md mb-8">
                    <h3 className="text-4xl font-bold text-orange-600 text-center mb-4">
                        Mô tả chương trình
                    </h3>
                    <p className="text-black-600 text-justify text-xl">
                        {majorData.description}
                    </p>
                </div>

                {/* Careers */}
                <div className="bg-orange-50 p-8 rounded-lg shadow-md mb-8">
                    <h3 className="text-4xl font-bold text-orange-600 text-center mb-4">
                        Cơ hội nghề nghiệp
                    </h3>
                    <ul className="text-black-600 text-xl space-y-5">
                        {majorData.careers.map((career, index) => (
                            <li key={index}>• {career.position} ({career.role})</li>
                        ))}
                    </ul>
                </div>

                {/* Qualities */}
                <div className="bg-orange-50 p-8 rounded-lg shadow-md">
                    <h3 className="text-4xl font-bold text-orange-600 text-center mb-8">
                        Tố chất để thành công
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {majorData.qualities.map((quality, index) => (
                            <div key={index} className="text-center p-6 rounded-lg hover:bg-orange-100 transition-colors">
                                <div className="inline-block p-4 bg-orange-100 rounded-full mb-4">
                                    <FontAwesomeIcon
                                        icon={quality.icon}
                                        className="text-3xl text-orange-500"
                                    />
                                </div>
                                <h4 className="text-xl font-bold text-gray-800">
                                    {quality.title}
                                </h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ITMajorPage;