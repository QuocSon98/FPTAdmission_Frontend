import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faHandshake, faGraduationCap, faBriefcase, faSchool } from '@fortawesome/free-solid-svg-icons';
import {
  Globe,
  Handshake,
  GraduationCap,
  Briefcase,
  School,
  Shield,
  Car,
  RefreshCw,
  Code,
  Palette,
  Cpu,
  Brain,
  TrendingUp,
  CreditCard,
  Target,
  Globe2,
  Truck,
  Languages,
  Megaphone,
  Scale,
  ArrowRight,
  Star,
  Users,
  Award,
  MapPin
} from 'lucide-react';



const Home: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="bg-[url('/src/app/assets/img02.png')] bg-cover bg-center h-[700px]">
        <section className="w-3/5 text-center text-orange-500 py-25 font-sans relative">
          <div>
            <h1 className="font-bold text-6xl mt-18">TUYỂN SINH ĐẠI HỌC</h1>
            <h1 className="font-bold text-6xl mt-1">NĂM HỌC 2025</h1>
            <h2 className="italic text-5xl font-initial mt-4">chính thức bắt đầu!</h2>
            <Link to="/consultant" className="inline-block px-8 py-4 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition w-48 text-center mt-4">
              TƯ VẤN NGAY
            </Link>
          </div>
        </section>
      </div>

      <section id="why-choose" className="py-10 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-8xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-orange-100 rounded-full px-10 py-5 mb-6">
              <Award className="w-5 h-5 mr-2 text-orange-600" />
              <span className="text-orange-600 font-medium text-2xl">Ưu thế vượt trội</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Vì sao hàng chục nghìn sinh viên
            </h2>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
              chọn FPTU mỗi năm?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {[
              {
                icon: Globe,
                title: "Trải nghiệm quốc tế vượt trội",
                desc: "Hiện Trường Đại học FPT đã hợp tác với hơn 200 đối tác tại 36 quốc gia. Sinh viên được du học ngắn hạn 3-6 tháng tại các đại học danh tiếng trên thế giới",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: Handshake,
                title: "Làm thật trong doanh nghiệp",
                desc: "100% sinh viên thực tập tại doanh nghiệp từ năm 3, tích lũy kinh nghiệm thực tế.",
                color: "from-green-500 to-green-600"
              },
              {
                icon: GraduationCap,
                title: "Giáo dục thế hệ mới",
                desc: "Chương trình đào tạo chuẩn quốc tế. Giảng viên là các chuyên gia trong và ngoài nước",
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: Briefcase,
                title: "Cơ hội việc làm toàn cầu",
                desc: "98% sinh viên FPTU có việc làm sau tốt nghiệp, 19% cựu sinh viên FPTU làm việc tại các nước phát triển.",
                color: "from-orange-500 to-red-500"
              },
              {
                icon: MapPin,
                title: "Hệ thống rộng khắp",
                desc: "Trường Đại học FPT có 5 địa điểm đào tạo hệ đại học chính quy tại: Hà Nội, Đà Nẵng, Quy Nhơn, Tp. Hồ Chí Minh và Cần Thơ",
                color: "from-teal-500 to-teal-600"
              }
            ].map((item, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"
                  style={{ background: `linear-gradient(135deg, ${item.color.split(' ')[1]}, ${item.color.split(' ')[3]})` }}></div>
                <div className={`relative bg-gradient-to-br ${item.color} p-8 rounded-2xl shadow-xl text-white transform group-hover:scale-105 transition-all duration-300 h-full`}>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                      <item.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-4xl font-bold mb-4 leading-tight">{item.title}</h3>
                    <p className="text-white/90 leading-relaxed text-2xl">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Programs Section */}
      <section className="py-12 bg-orange-600 relative">
        <div className="max-w-8xl mx-auto px-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16 relative">
              {/* Floating Elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute left-10 animate-bounce delay-100">
                  <Brain className="w-12 h-12 top-1/2 left text-white/20" />
                </div>
                <div className="absolute right-10 animate-bounce delay-100">
                  <Code className="w-10 h-10 text-white/20" />
                </div>
                <div className="absolute bottom-1/2 left-3/4 animate-bounce delay-500">
                  <Globe className="w-14 h-14 text-white/20" />
                </div>
                <div className="absolute bottom-1/2 left-1/4 animate-bounce delay-500">
                  <GraduationCap className="w-14 h-14 text-white/20" />
                </div>
                
              </div>
              <div className="inline-flex items-center bg-orange-100 rounded-full px-10 py-5 mb-6">
                <Brain className="w-5 h-5 mr-2 text-orange-600" />
                <span className="text-orange-600 font-medium text-2xl">Chương trình đào tạo</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Các ngành đào tạo HOT
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Chuẩn xu thế AI & Kinh tế số - Đáp ứng nhu cầu thị trường lao động tương lai
              </p>
            </div>
          </div>
          {/* Program cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div key={index} className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-green-500"></div>
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {program.title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {program.items.map((item, idx) => (
                      <li key={idx} className="flex items-center text-gray-700 hover:text-orange-600 transition-colors cursor-pointer">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-orange-600 via-orange-500 to-red-500 overflow-hidden mt-10">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border border-white rounded-full"></div>
          <div className="absolute top-20 right-20 w-32 h-32 border border-white rounded-full"></div>
          <div className="absolute bottom-10 left-1/3 w-24 h-24 border border-white rounded-full"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <div className="mb-8">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <Target className="w-5 h-5 mr-2" />
              <span className="font-medium">Cơ hội có hạn</span>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            TƯ VẤN XÉT TUYỂN
            <span className="block text-orange-200">NGAY HÔM NAY</span>
          </h2>
          
          <p className="text-2xl md:text-3xl font-light mb-12 text-orange-100">
            VỮNG CHẮC TƯƠNG LAI NGÀY MAI
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              to="/consultant" 
              className="group inline-flex items-center px-10 py-5 bg-white text-orange-600 rounded-full font-bold text-xl hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              TƯ VẤN NGAY
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <div className="flex items-center text-white/90">
              <div className="flex -space-x-2 mr-4">
                <div className="w-10 h-10 bg-orange-400 rounded-full border-2 border-white"></div>
                <div className="w-10 h-10 bg-orange-300 rounded-full border-2 border-white"></div>
                <div className="w-10 h-10 bg-orange-200 rounded-full border-2 border-white"></div>
              </div>
              <span className="text-sm">
                <strong>1,000+</strong> sinh viên đã đăng ký tuần này
              </span>
            </div>
          </div>
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