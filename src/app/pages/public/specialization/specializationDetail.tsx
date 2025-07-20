import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
  ArrowLeft,
  Calendar,
  GraduationCap,
  Building,
  Loader2,
  AlertCircle,
  BookOpen,
  Award,
} from 'lucide-react';

interface Campus {
  id: string;
  name: string;
  address: string;
  description: string;
  email: string;
  phone: string;
  imageUrl: string | null;
}

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

interface Program {
  id: string;
  year: number;
  target: number;
  price: number;
  campus: Campus;
  specialization: Specialization;
}

const SpecializationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('SpecializationDetail loaded with ID:', id);
    if (id) {
      fetchSpecializationProgram();
    }
  }, [id]);

  const fetchSpecializationProgram = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Fetching program for specialization ID:', id);

      const response = await axios.get(`http://localhost:8080/api/program/get_all`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
      });

      if (response.data) {
        let programs: Program[] = [];
        
        if (response.data.data && Array.isArray(response.data.data)) {
          programs = response.data.data;
        } else if (response.data.listData && Array.isArray(response.data.listData)) {
          programs = response.data.listData;
        } else if (Array.isArray(response.data)) {
          programs = response.data;
        }

        console.log('All programs fetched:', programs);
        console.log('Looking for specialization ID:', id);

        const matchingProgram = programs.find(program => 
          program.specialization.id === id
        );

        if (matchingProgram) {
          console.log('Found matching program:', matchingProgram);
          setProgram(matchingProgram);
        } else {
          console.log('No matching program found');
          setError('Không tìm thấy thông tin chuyên ngành.');
        }
      }
    } catch (error) {
      console.error('Error fetching program:', error);
      setError('Không thể tải thông tin chuyên ngành.');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-orange-500 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700">Đang tải thông tin...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-600 mb-2">Có lỗi xảy ra</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            to="/major"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
          >
            Quay lại
          </Link>
        </div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-600">Không tìm thấy thông tin</h2>
          <Link
            to="/major"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 mt-4 inline-block"
          >
            Quay lại
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Link 
            to="/major" 
            className="inline-flex items-center text-white/90 hover:text-white mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Quay lại danh sách ngành
          </Link>
          
          <div className="flex items-center gap-6">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {program.specialization.name}
              </h1>
              <p className="text-xl text-white/90 mb-2">
                {program.specialization.major.name}
              </p>
              <div className="flex items-center text-white/80">
                <Calendar className="w-5 h-5 mr-2" />
                <span>Năm tuyển sinh: {program.year}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Specialization Description */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <BookOpen className="w-6 h-6 text-orange-500 mr-3" />
                Mô tả chuyên ngành
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {program.specialization.description || 
                 'Chương trình đào tạo chuyên sâu với phương pháp hiện đại, trang bị kiến thức và kỹ năng cần thiết cho sinh viên phù hợp với nhu cầu thị trường lao động hiện tại.'}
              </p>
            </div>

            {/* Major Information */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Award className="w-6 h-6 text-orange-500 mr-3" />
                Thông tin ngành học
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Ngành đào tạo</h3>
                  <p className="text-gray-600">{program.specialization.major.name}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Chuyên ngành</h3>
                  <p className="text-gray-600">{program.specialization.name}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-gray-800 mb-2">Mô tả ngành</h3>
                  <p className="text-gray-600">{program.specialization.major.description}</p>
                </div>
              </div>
            </div>

            {/* Campus Details */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Building className="w-6 h-6 text-orange-500 mr-3" />
                Thông tin cơ sở đào tạo
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Tên cơ sở</h3>
                    <p className="text-gray-600">{program.campus.name}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Địa chỉ</h3>
                    <p className="text-gray-600">{program.campus.address}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Điện thoại</h3>
                    <p className="text-gray-600">{program.campus.phone}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                    <p className="text-gray-600">{program.campus.email}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Mô tả cơ sở</h3>
                <p className="text-gray-700">{program.campus.description}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Admission Summary */}
            <div className="bg-orange-500 text-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4">Thông tin tuyển sinh</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Năm tuyển sinh</span>
                  <span className="font-bold">{program.year}</span>
                </div>
                <div className="flex justify-between">
                  <span>Chỉ tiêu</span>
                  <span className="font-bold">{program.target} SV</span>
                </div>
                <div className="border-t border-white/20 pt-4">
                  <div className="text-center">
                    <p className="text-white/90 mb-2">Học phí</p>
                    <p className="text-2xl font-bold">{formatPrice(program.price)}</p>
                    <p className="text-white/80 text-sm">/ năm học</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Quan tâm chuyên ngành này?
              </h3>
              <p className="text-gray-600 mb-4">
                Đăng ký tư vấn ngay để nhận thông tin chi tiết
              </p>
              <Link
                to="/consultant"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 block text-center"
              >
                Đăng ký tư vấn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecializationDetail;