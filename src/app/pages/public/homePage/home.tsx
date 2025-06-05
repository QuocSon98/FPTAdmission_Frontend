import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faHandshake, faGraduationCap, faBriefcase, faSchool } from '@fortawesome/free-solid-svg-icons';

const Home: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="bg-[url('/src/app/assets/img02.png')] bg-cover bg-center h-[700px] mb-4">
        <section className="w-3/5 text-center text-orange-500 py-25 font-sans relative">
          <div>
            <h1 className="font-bold text-6xl mt-18">TUYỂN SINH ĐẠI HỌC</h1>
            <h1 className="font-bold text-6xl mt-1">NĂM HỌC 2025</h1>
            <h2 className="italic text-5xl font-initial mt-4">chính thức bắt đầu!</h2>
            <Link to="/dang-ky" className="inline-block px-8 py-4 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition w-48 text-center mt-4">
              ĐĂNG KÝ NGAY
            </Link>
          </div>
        </section>
      </div>

      {/* Why Choose FPT Section */}
      <section className="py-12 mt-5 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-3xl text-orange-500 font-bold mb-8">
            Vì sao hàng chục nghìn sinh viên chọn FPTU mỗi năm?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              {
                icon: faGlobe,
                title: "Trải nghiệm quốc tế vượt trội",
                desc: "Hiện Trường Đại học FPT đã hợp tác với hơn 200 đối tác tại 36 quốc gia. Sinh viên được du học ngắn hạn 3-6 tháng tại các đại học danh tiếng trên thế giới"
              },
              {
                icon: faHandshake,
                title: "Làm thật trong doanh nghiệp",
                desc: "100% sinh viên thực tập tại doanh nghiệp từ năm 3, tích lũy kinh nghiệm thực tế."
              },
              {
                icon: faGraduationCap,
                title: "Giáo dục thế hệ mới",
                desc: "Chương trình đào tạo chuẩn quốc tế. Giảng viên Trường Đại học FPT là các chuyên gia trong và ngoài nước."
              },
              {
                icon: faBriefcase,
                title: "Cơ hội việc làm toàn cầu",
                desc: "98% sinh viên FPTU có việc làm sau tốt nghiệp, 19% cựu sinh viên FPTU làm việc tại các nước phát triển."
              },
              {
                icon: faSchool,
                title: "Hệ thống rộng khắp",
                desc: "Trường Đại học FPT có 5 địa điểm đào tạo hệ đại học chính quy tại: Hà Nội, Đà Nẵng, Quy Nhơn, Tp. Hồ Chí Minh và Cần Thơ"
              }
            ].map((item, index) => (
              <div key={index} className="bg-orange-500 p-6 rounded-lg shadow-lg text-center">
                <div className="text-6xl text-orange-200 mb-4">
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <h3 className="text-white text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-white">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-3xl text-orange-500 font-bold mb-8">
            Các ngành đào tạo HOT - Chuẩn xu thế AI & Kinh tế số
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Program cards */}
            {programs.map((program, index) => (
              <div key={index} className="bg-orange-50 p-8 rounded-lg shadow-md">
                <h3 className="text-orange-500 text-xl font-bold mb-4">{program.title}</h3>
                <ul className="space-y-2">
                  {program.items.map((item, idx) => (
                    <li key={idx} className="text-gray-700 border-b border-gray-200 py-2 last:border-0">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-500 text-white py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">ĐĂNG KÝ XÉT TUYỂN NGAY HÔM NAY</h2>
          <p className="text-2xl mb-8">VỮNG CHẮC TƯƠNG LAI NGÀY MAI</p>
          <Link to="/dang-ky" className="inline-block px-8 py-4 bg-white text-orange-500 rounded-full font-bold hover:bg-gray-100 transition">
            ĐĂNG KÝ NGAY
          </Link>
        </div>
      </section>
    </div>
  );
};

// Programs data
const programs = [
  {
    title: "Công nghệ thông tin",
    items: [
      "An toàn thông tin",
      "Công nghệ ô tô số",
      "Chuyển đổi số",
      "Kỹ thuật phần mềm",
      "Thiết kế mỹ thuật số",
      "Thiết kế vi mạch bán dẫn",
      "Trí tuệ nhân tạo"
    ]
  },
  {
    title: "Quản trị kinh doanh",
    items: [
      "Tài chính đầu tư",
      "Công nghệ tài chính (Fintech)",
      "Digital Marketing",
      "Kinh doanh quốc tế",
      "Logistics và quản lý chuỗi cung ứng"
    ]
  },
  {
    title: "Ngôn ngữ",
    items: [
      "Ngôn ngữ Anh",
      "Song ngữ Nhật - Anh",
      "Song ngữ Hàn - Anh",
      "Song ngữ Trung - Anh"
    ]
  },
  {
    title: "Công nghệ truyền thông",
    items: [
      "Quan hệ công chúng",
      "Truyền thông đa phương tiện"
    ]
  },
  {
    title: "Luật",
    items: [
      "Luật kinh tế",
      "Luật thương mại quốc tế"
    ]
  }
];

export default Home;