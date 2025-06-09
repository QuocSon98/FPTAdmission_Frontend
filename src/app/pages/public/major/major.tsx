import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCode, 
  faShieldAlt, 
  faChartLine, 
  faScaleBalanced, 
  faGavel,
  faLanguage,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';

const Major: React.FC = () => {
  const majors = [
    {
      id: 'cntt',
      name: 'Công nghệ thông tin',
      icon: faCode,
      link: '/nganh-hoc/cong-nghe-thong-tin/an-toan-thong-tin',
      specializations: [
        {
          id: 'attt',
          name: 'An toàn thông tin',
          icon: faShieldAlt,
          description: 'Chuyên ngành đào tạo về bảo mật và an ninh mạng',
          link: '/nganh-hoc/cong-nghe-thong-tin/an-toan-thong-tin'
        },
        {
          id: 'cnots',
          name: 'Công nghệ ô tô số',
          icon: faChartLine,
          description: 'Chuyên ngành về phân tích và xử lý dữ liệu lớn',
          link: '/nganh-hoc/cong-nghe-thong-tin/phan-tich-du-lieu'
        },
        {
          id: 'ktpm',
          name: 'Kỹ thuật phần mềm',
          icon: faShieldAlt,
          description: 'Chuyên ngành đào tạo về bảo mật và an ninh mạng',
          link: '/nganh-hoc/cong-nghe-thong-tin/an-toan-thong-tin'
        },
        {
          id: 'cds',
          name: 'Chuyển đổi số',
          icon: faChartLine,
          description: 'Chuyên ngành về phân tích và xử lý dữ liệu lớn',
          link: '/nganh-hoc/cong-nghe-thong-tin/phan-tich-du-lieu'
        },
        {
          id: 'tkmts',
          name: 'Thiết kế mỹ thuật số',
          icon: faShieldAlt,
          description: 'Chuyên ngành đào tạo về bảo mật và an ninh mạng',
          link: '/nganh-hoc/cong-nghe-thong-tin/an-toan-thong-tin'
        },
        {
          id: 'tkvibd',
          name: 'Thiết kế vi mạch bán dẫn',
          icon: faChartLine,
          description: 'Chuyên ngành về phân tích và xử lý dữ liệu lớn',
          link: '/nganh-hoc/cong-nghe-thong-tin/phan-tich-du-lieu'
        },
          {
          id: 'ttnt',
          name: 'Trí tuệ nhân tạo',
          icon: faChartLine,
          description: 'Chuyên ngành về phân tích và xử lý dữ liệu lớn',
          link: '/nganh-hoc/cong-nghe-thong-tin/phan-tich-du-lieu'
        }
      ]
    },
    {
      id: 'luat',
      name: 'Luật',
      icon: faScaleBalanced,
      specializations: [
        {
          id: 'lkt',
          name: 'Luật kinh tế',
          icon: faGavel,
          description: 'Chuyên ngành về pháp luật trong lĩnh vực kinh tế',
          link: '/nganh-hoc/luat/luat-kinh-te'
        },
        {
          id: 'ltm',
          name: 'Luật thương mại quốc tế',
          icon: faGavel,
          description: 'Chuyên ngành về pháp luật trong lĩnh vực thương mại',
          link: '/nganh-hoc/luat/luat-thuong-mai'
        }
      ]
    },
    {
      id: 'ngonngu',
      name: 'Ngôn ngữ',
      icon: faLanguage,
      specializations: [
        {
          id: 'ta',
          name: 'Tiếng Anh',
          icon: faGlobe,
          description: 'Chương trình đào tạo tiếng Anh chuyên sâu',
          link: '/nganh-hoc/ngon-ngu/tieng-anh'
        },
        {
          id: 'tn',
          name: 'Song ngữ Nhật-Anh',
          icon: faGlobe,
          description: 'Chương trình đào tạo tiếng Nhật chuyên sâu',
          link: '/nganh-hoc/ngon-ngu/tieng-nhat'
        },
          {
          id: 'th',
          name: 'Song ngữ Hàn-Anh',
          icon: faGlobe,
          description: 'Chương trình đào tạo tiếng Nhật chuyên sâu',
          link: '/nganh-hoc/ngon-ngu/tieng-nhat'
        },
          {
          id: 'tt',
          name: 'Song ngữ Trung-Anh',
          icon: faGlobe,
          description: 'Chương trình đào tạo tiếng Nhật chuyên sâu',
          link: '/nganh-hoc/ngon-ngu/tieng-nhat'
        }
      ]
    },
    {
      id: 'qtkd',
      name: 'Quản trị kinh doanh',
      icon: faCode,
      link: '/nganh-hoc/cong-nghe-thong-tin/an-toan-thong-tin',
      specializations: [
        {
          id: 'cntc',
          name: 'Công nghệ tài chính',
          icon: faShieldAlt,
          description: 'Chuyên ngành đào tạo về bảo mật và an ninh mạng',
          link: '/nganh-hoc/cong-nghe-thong-tin/an-toan-thong-tin'
        },
        {
          id: 'Digital',
          name: 'Digital Marketing',
          icon: faChartLine,
          description: '',
          link: ''
        },
        {
          id: 'kdqt',
          name: 'Kinh doanh quốc tế',
          icon: faChartLine,
          description: '',
          link: ''
        },
        {
          id: 'Logistics',
          name: 'Logistics và Quản lý chuỗi cung ứng toàn cầu',
          icon: faChartLine,
          description: '',
          link: ''
        },
        {
          id: 'qtks',
          name: 'Quản trị khách sạn',
          icon: faChartLine,
          description: '',
          link: ''
        },
        {
          id: 'dl',
          name: 'Quản trị dịch vụ du lịch và lữ hành',
          icon: faChartLine,
          description: '',
          link: ''
        },
        {
          id: 'tcdn',
          name: 'Tài chính doanh nghiệp',
          icon: faChartLine,
          description: '',
          link: ''
        },
        {
          id: 'nh',
          name: 'Ngân hàng số - Tài chính',
          icon: faChartLine,
          description: '',
          link: ''
        },
        {
          id: 'tcdt',
          name: 'Tài chính - Đầu tư',
          icon: faChartLine,
          description: '',
          link: ''
        }, 
      ]
    },
{
      id: 'truyenthong',
      name: 'Truyền thông',
      icon: faCode,
      link: '/nganh-hoc/cong-nghe-thong-tin/an-toan-thong-tin',
      specializations: [
        {
          id: 'qhcc',
          name: 'Quan hệ công chúng',
          icon: faShieldAlt,
          description: '',
          link: ''
        },
        {
          id: 'ttdaphuongtien',
          name: 'Truyền thông đa phương tiện',
          icon: faChartLine,
          description: '',
          link: ''
        },
      ]
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
          CHƯƠNG TRÌNH ĐÀO TẠO
        </h1>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12 bg-orange-700 text-white p-4 rounded-lg">Chuyên ngành đào tạo</h1>
        {/* Major List */}
        {majors.map(major => (
          <div key={major.id} className="mb-16">
            {/* Major Title */}
            {/* <div className="flex items-center gap-4 mb-8 p-4 bg-orange-500 rounded-lg">
              <FontAwesomeIcon icon={major.icon} className="text-4xl text-white" />
              <h2 className="text-3xl font-bold text-white">{major.name}</h2>
            </div> */}

            <Link to={major.link} className="block">
              <div className="flex items-center gap-4 mb-8 p-4 bg-orange-500 rounded-lg 
                    hover:bg-orange-600 transition-colors duration-300">
                <FontAwesomeIcon icon={major.icon} className="text-4xl text-white" />
                <h2 className="text-3xl font-bold text-white">{major.name}</h2>
            </div>
             </Link>

            {/* Specializations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {major.specializations.map(spec => (
                <Link 
                  key={spec.id}
                  to={spec.link}
                  className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg 
                           transition-all duration-300 border border-gray-100
                           hover:border-orange-500 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-4 bg-orange-100 rounded-full 
                                  group-hover:bg-orange-500 transition-colors duration-300">
                      <FontAwesomeIcon 
                        icon={spec.icon} 
                        className="text-2xl text-orange-500 group-hover:text-white"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {spec.name}
                      </h3>
                      <p className="text-gray-600">
                        {spec.description}
                      </p>
                      <span className="inline-block mt-4 text-orange-500 group-hover:text-orange-600
                                     flex items-center gap-2">
                        Tìm hiểu thêm 
                        <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Major;