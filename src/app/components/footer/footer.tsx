import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';


interface Campus {
  id: string;
  name: string;
  address: string;
  description: string;
  email: string;
  phone: string;
}

const Footer: React.FC = () => {

  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/campus/get', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
          },
        });

        if (response.data) {
          // Handle different response structures
          if (response.data.data) {
            setCampuses(Array.isArray(response.data.data) ? response.data.data : [response.data.data]);
          } else if (response.data.listData) {
            setCampuses(response.data.listData);
          } else if (Array.isArray(response.data)) {
            setCampuses(response.data);
          } else {
            setCampuses([response.data]);
          }
        }
      } catch (error) {
        console.error('Error fetching campuses:', error);
        setError('Không thể tải thông tin cơ sở');
        // Fallback to default data if API fails
        setCampuses([
          {
            id: '1',
            name: 'FPT Hà Nội',
            address: 'Khu Giáo dục và Đào tạo – Khu Công nghệ cao Hòa Lạc – Km29 Đại lộ Thăng Long, H. Thạch Thất, TP. Hà Nội',
            description: 'Cơ sở chính',
            email: 'tuyensinhhanoi@fpt.edu.vn',
            phone: '(024) 7300 5588',
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCampuses();
  }, []);

  // Function to extract city name from campus name
  const getCityName = (campusName: string): string => {
    if (campusName.includes('Hà Nội')) return 'HÀ NỘI';
    if (campusName.includes('Hồ Chí Minh') || campusName.includes('HCM')) return 'TP. HỒ CHÍ MINH';
    if (campusName.includes('Đà Nẵng')) return 'ĐÀ NẴNG';
    if (campusName.includes('Cần Thơ')) return 'CẦN THƠ';
    if (campusName.includes('Quy Nhơn')) return 'QUY NHƠN';
    return campusName.toUpperCase();
  };

  if (loading) {
    return (
      <footer className="bg-white pt-10 pb-5">
        <div className="max-w-8xl mx-auto px-4">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500"></div>
            <span className="ml-3 text-gray-600">Đang tải thông tin cơ sở...</span>
          </div>
        </div>
      </footer>
    );
  }
  return (
    <footer className="bg-white pt-10 pb-5">
      <div className="max-w-8xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-10 border-t-2 border-b-2  border-solid border-orange-500 p-5">
          {campuses.map((campus) => (
            <div key={campus.id} className="space-y-2">
              <h3 className="font-bold text-xl text-orange-600">
                {getCityName(campus.name)}
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-orange-500 mt-1 flex-shrink-0"
                  />
                  <p className="text-gray-950 text-lg">{campus.address}</p>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="text-orange-500 flex-shrink-0"
                  />
                  <p className="text-gray-950 text-lg">
                    Điện thoại: <a href={`tel:${campus.phone}`} className="hover:text-orange-600">{campus.phone}</a>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-orange-500 flex-shrink-0"
                  />
                  <p className="text-gray-950 text-lg">
                    Email: <a href={`mailto:${campus.email}`} className="hover:text-orange-600">{campus.email}</a>
                  </p>
                </div>
                {campus.description && (
                  <p className="text-gray-600 text-lg italic">{campus.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>


        <div >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-950 text-md mb-4 md:mb-0">
              © 2024 Bản quyền thuộc về Trường Đại học FPT.
            </div>
            <div className="flex space-x-2">
              <a href="https://www.facebook.com/daihocfpt?utm_source=GGMA&utm_medium=DKTS2025&utm_campaign=TV" target="_blank" rel="noopener noreferrer" className="text-blue-600 mr-5 hover:text-blue-600 text-2xl">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://www.tiktok.com/@fptuniversity?utm_source=GGMA&utm_medium=DKTS2025&utm_campaign=TV" target="_blank" rel="noopener noreferrer" className="text-black-600 hover:text-black text-2xl">
                <FontAwesomeIcon icon={faTiktok} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;