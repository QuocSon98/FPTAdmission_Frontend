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
  faGlobe,
  faCar,
  faArrowsToCircle,
  faPaintBrush,
  faMicrochip,
  faBrain
} from '@fortawesome/free-solid-svg-icons';

const Major: React.FC = () => {
  const majors = [
    {
      id: 'cntt',
      name: 'Công nghệ thông tin',
      icon: faCode,
      link: '/major/informationTechnology',
      specializations: [
        {
          id: 'attt',
          name: 'An toàn thông tin',
          icon: faShieldAlt,
          description: 'Chuyên ngành đào tạo về bảo mật và an ninh mạng',
          link: '/informationSecurity'
        },
        {
          id: 'cnots',
          name: 'Công nghệ ô tô số',
          icon: faCar,
          description: 'Chuyên ngành về phân tích và xử lý dữ liệu lớn',
          link: '/digitalCarTechnology'
        },
        {
          id: 'ktpm',
          name: 'Kỹ thuật phần mềm',
          icon: faCode,
          description: 'Chuyên ngành đào tạo về bảo mật và an ninh mạng',
          link: '/softwareEngineering'
        },
        {
          id: 'cds',
          name: 'Chuyển đổi số',
          icon: faArrowsToCircle,
          description: 'Chuyên ngành về phân tích và xử lý dữ liệu lớn',
          link: '/digitalConversion'
        },
        {
          id: 'tkmts',
          name: 'Thiết kế mỹ thuật số',
          icon: faPaintBrush,
          description: 'Chuyên ngành đào tạo về bảo mật và an ninh mạng',
          link: '/digitalDesign'
        },
        {
          id: 'tkvibd',
          name: 'Thiết kế vi mạch bán dẫn',
          icon: faMicrochip,
          description: 'Chuyên ngành về phân tích và xử lý dữ liệu lớn',
          link: '/semiconductorDesign'
        },
        {
          id: 'ttnt',
          name: 'Trí tuệ nhân tạo',
          icon: faBrain,
          description: 'Chuyên ngành về phân tích và xử lý dữ liệu lớn',
          link: '/artificialIntelligence'
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

      <div className="bg-white py-2">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-5 bg-orange-700 text-white p-4 rounded-lg">
            Tổng quan chương trình đào tạo
          </h2>
          <div className="mb-10">
            <p className="text-black-600 max-w-6xl mx-auto space-y-10 text-justify">
              Lựa chọn cách tiếp cận hiện đại nhằm mang lại năng lực cạnh tranh toàn cầu, chương trình đào tạo tại Trường Đại học FPT được thiết kế từ đầu với tư duy hướng chuẩn đầu ra đáp ứng nhu cầu của thị trường lao động và tạo nền tảng phát triển sự nghiệp lâu dài cho người học. Hoạt động đào tạo chú trọng vào các yếu tố: (1) Thực tiễn thông qua kết nối sâu với ngành công nghiệp, và (2) Thực chiến với phương pháp kiến tạo và học qua dự án. Đồng thời, tiếng Anh là ngôn ngữ chính của hầu hết hoạt động học tập tại trường, từ tài liệu, bài kiểm tra, bài thi, đến khóa luận tốt nghiệp, và một phần trong việc giảng bài.
            </p>
          </div>
          <div className="flex items-center gap-4 mb-1 mt-5 p-2 bg-orange-500 rounded-lg 
                    hover:bg-orange-600 transition-colors duration-300">
            <h2 className="text-xl font-bold text-white">Trải nghiệm 04 giai đoạn đào tạo đặc biệt</h2>
          </div>
          <div className="max-w-6xl mx-auto">
            <img
              src="https://daihoc.fpt.edu.vn/wp-content/uploads/2024/11/4giaidoan.avif"
              alt="Trải nghiệm 04 giai đoạn đào tạo đặc biệt"
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 ">
            {/* Phase 1 */}
            <div className="bg-orange-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-800">Giai đoạn nền tảng</h3>
              </div>
              <p className="text-gray-600 text-justify">
                Sinh viên hoàn thành các kỳ học: Tuần lễ định hướng, Tháng rèn luyện tập trung, Giai đoạn tiếng Anh nền tảng, Học kỳ tiếng Anh tại nước ngoài, Học phần Vovinam và Nhạc cụ dân tộc. Kết thúc giai đoạn nền tảng, sinh viên được trang bị các phương pháp học đại học hiệu quả: tự học, thuyết trình – phản biện, làm việc nhóm… và đạt trình độ tiếng Anh tối thiểu tương đương IELTS 6.0, sẵn sàng lĩnh hội kiến thức chuyên ngành bằng giáo trình quốc tế trong các học kỳ kế tiếp. Trường hợp, sinh viên đã có chứng chỉ tương đương từ IELTS 6.0 được miễn đào tạo giai đoạn tiếng Anh chuẩn bị
              </p>
            </div>

            {/* Phase 2 */}
            <div className="bg-orange-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-800">Giai đoạn cơ bản và cơ sở ngành</h3>
              </div>
              <p className="text-gray-600 text-justify">
                Sinh viên được đào tạo các khối kiến thức, kỹ năng liên quan đến nghiệp vụ chuyên môn. Về ngoại ngữ, ngoài tiếng Anh đã được học ở giai đoạn nền tảng, sinh viên khối ngành công nghệ thông tin được đào tạo thêm ngôn ngữ thứ hai là tiếng Nhật, sinh viên khối ngành kinh tế sẽ được học thêm ngoại ngữ thứ hai là tiếng Trung.
              </p>
            </div>

            {/* Phase 3 */}
            <div className="bg-orange-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-800">Giai đoạn đào tạo trong doanh nghiệp</h3>
              </div>
              <p className="text-gray-600 text-justify">
                Ở học kỳ 6, sinh viên sẽ được đào tạo trong doanh nghiệp (On the Job Training – OJT). Giai đoạn này, sinh viên sẽ được lãnh đạo ưu tú, các chuyên gia hàng đầu trong ngành như FPT Software, Bosch, KMS Technology… trực tiếp đào tạo trong môi trường doanh nghiệp. Sinh viên có cơ hội tham gia vào các dự án thực tế của doanh nghiệp.
              </p>
            </div>

            {/* Phase 4 */}
            <div className="bg-orange-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  4
                </div>
                <h3 className="text-xl font-bold text-gray-800">Giai đoạn chuyên ngành hẹp và Khóa luận tốt nghiệp</h3>
              </div>
              <p className="text-gray-600 text-justify">
                Sinh viên có cơ hội chọn lựa chuyên ngành chuyên sâu theo đúng định hướng nghề nghiệp và hoàn thiện khóa luận tốt nghiệp dưới sự hỗ trợ của giảng viên có kinh nghiệm từ các doanh nghiệp, tổ chức hàng đầu trong ngành.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Major;