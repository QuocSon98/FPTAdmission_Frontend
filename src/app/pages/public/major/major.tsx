import React, { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, Loader2 } from 'lucide-react';
import TrainingPhase from './TraningPhase';
import Program from '../program/Program';
import axios from 'axios';
import TitleBanner from './../../../components/banner/titleBanner';

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

const Major: React.FC = () => {
  const [majors, setMajors] = useState<MajorWithSpecializations[]>([]);
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
              specializations,
            };
          } catch (error) {
            console.error(`Error fetching specializations for major ${major.id}:`, error);
            return {
              ...major,
              specializations: [],
            };
          }
        })
      );

      setMajors(majorsWithSpecializations);
    } catch (error) {
      console.error('Error fetching majors and specializations:', error);
      setError('Failed to fetch majors and specializations');
    } finally {
      setLoading(false);
    }
  };

  const trainingPhases = [
    {
      number: 1,
      title: 'Giai đoạn nền tảng',
      description: 'Sinh viên hoàn thành các kỳ học: Tuần lễ định hướng, Tháng rèn luyện tập trung, Giai đoạn tiếng Anh nền tảng, Học kỳ tiếng Anh tại nước ngoài, Học phần Vovinam và Nhạc cụ dân tộc. Kết thúc giai đoạn nền tảng, sinh viên được trang bị các phương pháp học đại học hiệu quả và đạt trình độ tiếng Anh tối thiểu tương đương IELTS 6.0.'
    },
    {
      number: 2,
      title: 'Giai đoạn cơ bản và cơ sở ngành',
      description: 'Sinh viên được đào tạo các khối kiến thức, kỹ năng liên quan đến nghiệp vụ chuyên môn. Về ngoại ngữ, ngoài tiếng Anh đã được học ở giai đoạn nền tảng, sinh viên khối ngành công nghệ thông tin được đào tạo thêm tiếng Nhật, sinh viên khối ngành kinh tế sẽ được học thêm tiếng Trung.'
    },
    {
      number: 3,
      title: 'Giai đoạn đào tạo trong doanh nghiệp',
      description: 'Ở học kỳ 6, sinh viên sẽ được đào tạo trong doanh nghiệp (On the Job Training – OJT). Giai đoạn này, sinh viên sẽ được các chuyên gia hàng đầu trong ngành như FPT Software, Bosch, KMS Technology trực tiếp đào tạo trong môi trường doanh nghiệp thực tế.'
    },
    {
      number: 4,
      title: 'Giai đoạn chuyên ngành hẹp và Khóa luận',
      description: 'Sinh viên có cơ hội chọn lựa chuyên ngành chuyên sâu theo đúng định hướng nghề nghiệp và hoàn thiện khóa luận tốt nghiệp dưới sự hỗ trợ của giảng viên có kinh nghiệm từ các doanh nghiệp, tổ chức hàng đầu trong ngành.'
    }
  ];
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-orange-500 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Đang tải thông tin</h2>
          <p className="text-gray-600">Vui lòng chờ một chút...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Có lỗi xảy ra</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30">
      {/* Hero Banner */}
      <div className="">
        <TitleBanner title='CHƯƠNG TRÌNH ĐÀO TẠO' />
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-4 mt-12">
        {/* Section Header */}
        <div className="text-center ">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full text-2xl font-bold shadow-lg">
            <BookOpen className="w-10 h-8" />
            Chuyên ngành đào tạo
          </div>
        </div>
        <Program />
      </div>

      {/* Training Overview Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-2">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-full text-2xl font-bold shadow-lg mb-8">
              <GraduationCap className="w-10 h-8" />
              Tổng quan chương trình đào tạo
            </div>
          </div>

          {/* Overview Text */}
          <div className="max-w-7xl mx-auto mb-16">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 shadow-lg">
              <p className="text-gray-700 text-lg leading-relaxed text-justify">
                Lựa chọn cách tiếp cận hiện đại nhằm mang lại năng lực cạnh tranh toàn cầu, chương trình đào tạo tại Trường Đại học FPT được thiết kế từ đầu với tư duy hướng chuẩn đầu ra đáp ứng nhu cầu của thị trường lao động và tạo nền tảng phát triển sự nghiệp lâu dài cho người học. Hoạt động đào tạo chú trọng vào các yếu tố: (1) Thực tiễn thông qua kết nối sâu với ngành công nghiệp, và (2) Thực chiến với phương pháp kiến tạo và học qua dự án. Đồng thời, tiếng Anh là ngôn ngữ chính của hầu hết hoạt động học tập tại trường, từ tài liệu, bài kiểm tra, bài thi, đến khóa luận tốt nghiệp, và một phần trong việc giảng bài.
              </p>
            </div>
          </div>

          {/* Training Phases Header */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              Trải nghiệm 04 giai đoạn đào tạo đặc biệt
            </h3>
            {/* <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div> */}
          </div>

          {/* Training Process Image */}
          <div className="max-w-7xl mx-auto mb-2">
            <div className="rounded-2xl ">
              <img
                src="https://daihoc.fpt.edu.vn/wp-content/uploads/2024/11/4giaidoan.avif"
                alt="Trải nghiệm 04 giai đoạn đào tạo đặc biệt"
                className="w-full h-auto"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div> */}
            </div>
          </div>

          {/* Training Phases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trainingPhases.map((phase, index) => (
              <TrainingPhase key={phase.number} phase={phase} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Major;