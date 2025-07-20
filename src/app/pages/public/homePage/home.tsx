import React from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  Handshake,
  GraduationCap,
  Briefcase,
  Code,
  Brain,
  Target,
  ArrowRight,
  Users,
  Award,
  Trophy,
  BookOpen,
  MapPin
} from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Major {
  id: string;
  name: string;
  description: string;
}

interface Specialization {
  id: string;
  name: string;
  description: string;
  major: Major;
}

interface MajorWithSpecializations extends Major {
  specializations: Specialization[];
}

// Interface for rendering programs
interface Program {
  id: string;
  title: string;
  items: string[];
}


const Home: React.FC = () => {

  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMajorsAndSpecializations();
  }, []);

  const fetchMajorsAndSpecializations = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all majors
      const majorsResponse = await axios.get('http://localhost:8080/api/major?page=0&size=1000', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
      });
      let majorsList: Major[] = [];
      if (majorsResponse.data) {
        if (majorsResponse.data.listData) {
          majorsList = majorsResponse.data.listData;
        } else if (majorsResponse.data.data) {
          majorsList = Array.isArray(majorsResponse.data.data) ? majorsResponse.data.data : [majorsResponse.data.data];
        } else if (Array.isArray(majorsResponse.data)) {
          majorsList = majorsResponse.data;
        }
      }
      // Fetch specializations for each major
      const majorsWithSpecializations: MajorWithSpecializations[] = await Promise.all(
        majorsList.map(async (major) => {
          try {
            const specializationsResponse = await axios.get(`http://localhost:8080/api/specialization/major/${major.id}`, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
              },
            });

            let specializations: Specialization[] = [];
            if (specializationsResponse.data) {
              if (specializationsResponse.data.listData) {
                specializations = specializationsResponse.data.listData;
              } else if (specializationsResponse.data.data) {
                specializations = Array.isArray(specializationsResponse.data.data)
                  ? specializationsResponse.data.data
                  : [specializationsResponse.data.data];
              } else if (Array.isArray(specializationsResponse.data)) {
                specializations = specializationsResponse.data;
              }
            }

            return {
              ...major,
              specializations
            };
          } catch (error) {
            console.error(`Error fetching specializations for major ${major.id}:`, error);
            return {
              ...major,
              specializations: []
            };
          }
        })
      );

      // Convert to program format for rendering
      const programsData: Program[] = majorsWithSpecializations.map(major => ({
        id: major.id,
        title: major.name, 
        items: major.specializations.map(spec => spec.name) 
      }));

      setPrograms(programsData);
    } catch (error) {
      console.error('Error fetching majors:', error);
      setError('Không thể tải thông tin chuyên ngành. Sử dụng dữ liệu mẫu.');
    }
  };

  return (
    <div className="w-full">
      <div className='relative overflow-hidden '>

        <div
          className="bg-cover bg-center h-[750px] relative"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")'
          }}
        >
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>

          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-24 h-24 bg-orange-400/10 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-orange-300/10 rounded-full animate-pulse delay-500"></div>
          </div>

          <div className="relative px-40 py-20 z-10 mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-300 text-sm font-medium mb-6 backdrop-blur-sm animate-fadeInUp">
              <Trophy className="w-4 h-4 mr-2" />
              Đại học hàng đầu về Công nghệ
            </div>

            {/* Main heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight animate-fadeInUp delay-200">
              <span className="text-orange-400">TUYỂN SINH</span>
              <br />
              <span className="bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
                ĐẠI HỌC
              </span>
            </h1>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fadeInUp delay-300">
              NĂM HỌC <span className="text-orange-400">2025</span>
            </h2>

            <p className="text-2xl md:text-4xl italic text-orange-200 font-light mb-8 animate-fadeInUp delay-400">
              chính thức bắt đầu!
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-6 mb-8 animate-fadeInUp delay-500">
              <div className="flex items-center text-white/90">
                <BookOpen className="w-5 h-5 mr-2 text-orange-400" />
                <span className="text-sm font-medium">Chương trình đào tạo quốc tế</span>
              </div>
              <div className="flex items-center text-white/90">
                <Users className="w-5 h-5 mr-2 text-orange-400" />
                <span className="text-sm font-medium">100% sinh viên có việc làm</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="animate-fadeInUp delay-600">
              <Link to="/consultant" className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1">
                TƯ VẤN NGAY
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-orange-500/20 to-transparent"></div>
        </div>
      </div>


      <section id="why-choose" className="py-10 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl  mx-auto ">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-orange-100 rounded-full px-10 py-5 mb-6">
              <Award className="w-5 h-5 mr-2 text-orange-600" />
              <span className="text-orange-600 font-medium text-xl">Ưu thế vượt trội</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Vì sao hàng chục nghìn sinh viên
            </h2>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
              chọn FPTU mỗi năm?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {[
              {
                icon: Globe,
                title: "Trải nghiệm quốc tế vượt trội",
                desc: "Hiện Trường Đại học FPT đã hợp tác với hơn 200 đối tác tại 36 quốc gia. Sinh viên được du học ngắn hạn 3-6 tháng tại các đại học danh tiếng trên thế giới",
              },
              {
                icon: Handshake,
                title: "Làm thật trong doanh nghiệp",
                desc: "100% sinh viên thực tập tại doanh nghiệp từ năm 3, tích lũy kinh nghiệm thực tế.",
              },
              {
                icon: GraduationCap,
                title: "Giáo dục thế hệ mới",
                desc: "Chương trình đào tạo chuẩn quốc tế. Giảng viên là các chuyên gia trong và ngoài nước",
              },
              {
                icon: Briefcase,
                title: "Cơ hội việc làm toàn cầu",
                desc: "98% sinh viên FPTU có việc làm sau tốt nghiệp, 19% cựu sinh viên FPTU làm việc tại các nước phát triển.",
              },
              {
                icon: MapPin,
                title: "Hệ thống rộng khắp",
                desc: "Trường Đại học FPT có 5 địa điểm đào tạo hệ đại học chính quy tại: Hà Nội, Đà Nẵng, Quy Nhơn, Tp. Hồ Chí Minh và Cần Thơ",
              }
            ].map((item, index) => (
              <div key={index} className="group relative ">
                <div className={`relative bg-gradient-to-br from-orange-400 to-red-500 p-8 rounded-2xl shadow-xl text-white transform group-hover:scale-105 transition-all duration-300 h-full`}>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                      <item.icon className='w-12 h-12' />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 leading-tight">{item.title}</h3>
                    <p className="text-white/90 leading-relaxed text-xl">{item.desc}</p>
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
              <p className="text-xl text-gray-900 max-w-3xl mx-auto">
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;