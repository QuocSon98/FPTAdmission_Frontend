
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  MapPin,
  DollarSign,
  GraduationCap,
  Building,
  Loader2,
  AlertCircle,
  RefreshCw,
  ArrowRight,
  Star,
  BookOpen,
  Target,
  ChevronDown,
  ChevronUp,
  Award,
} from 'lucide-react';
import axios from 'axios';

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

interface GroupedPrograms {
  [majorId: string]: {
    major: Major;
    specializations: {
      [specializationId: string]: {
        specialization: Specialization;
        programs: Program[];
      };
    };
  };
}


const ProgramList: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCampus, setSelectedCampus] = useState<string>('all');
  const [selectedMajor, setSelectedMajor] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [expandedMajors, setExpandedMajors] = useState<Set<string>>(new Set());
  useEffect(() => {
    fetchAllPrograms();
  }, []);

  useEffect(() => {
    filterPrograms();
  }, [programs, searchTerm, selectedCampus, selectedMajor, selectedYear]);

  const fetchAllPrograms = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`http://localhost:8080/api/program/get_all`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
      });

      if (response.data) {
        let programsData: Program[] = [];

        // Handle different response structures
        if (response.data.data && Array.isArray(response.data.data)) {
          programsData = response.data.data;
        } else if (response.data.listData && Array.isArray(response.data.listData)) {
          programsData = response.data.listData;
        } else if (Array.isArray(response.data)) {
          programsData = response.data;
        }

        setPrograms(programsData);
        console.log('Fetched programs:', programsData);
      }
    } catch (error) {
      console.error('Error fetching programs:', error);
      setError('Không thể tải danh sách chương trình. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    filterPrograms();
  }, [programs, searchTerm, selectedCampus, selectedMajor, selectedYear]);

  const filterPrograms = () => {
    let filtered = programs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(program =>
        program.specialization.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.specialization.major.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.campus.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Campus filter
    if (selectedCampus !== 'all') {
      filtered = filtered.filter(program => program.campus.id === selectedCampus);
    }

    // Major filter
    if (selectedMajor !== 'all') {
      filtered = filtered.filter(program => program.specialization.major.id === selectedMajor);
    }

    // Year filter
    if (selectedYear !== 'all') {
      filtered = filtered.filter(program => program.year.toString() === selectedYear);
    }

    setFilteredPrograms(filtered);
  };

  const groupProgramsByMajor = (programs: Program[]): GroupedPrograms => {
    const grouped: GroupedPrograms = {};

    programs.forEach(program => {
      const majorId = program.specialization.major.id;
      const specializationId = program.specialization.id;

      if (!grouped[majorId]) {
        grouped[majorId] = {
          major: program.specialization.major,
          specializations: {}
        };
      }

      if (!grouped[majorId].specializations[specializationId]) {
        grouped[majorId].specializations[specializationId] = {
          specialization: program.specialization,
          programs: []
        };
      }

      grouped[majorId].specializations[specializationId].programs.push(program);
    });

    return grouped;
  };

  const toggleMajorExpansion = (majorId: string) => {
    const newExpanded = new Set(expandedMajors);
    if (newExpanded.has(majorId)) {
      newExpanded.delete(majorId);
    } else {
      newExpanded.add(majorId);
    }
    setExpandedMajors(newExpanded);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getUniqueCampuses = () => {
    const campuses = programs.map(p => p.campus);
    return campuses.filter((campus, index, self) =>
      self.findIndex(c => c.id === campus.id) === index
    );
  };

  const getUniqueMajors = () => {
    const majors = programs.map(p => p.specialization.major);
    return majors.filter((major, index, self) =>
      self.findIndex(m => m.id === major.id) === index
    );
  };

  const getUniqueYears = () => {
    const years = programs.map(p => p.year);
    return [...new Set(years)].sort((a, b) => b - a);
  };

  const handleRetry = () => {
    fetchAllPrograms();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCampus('all');
    setSelectedMajor('all');
    setSelectedYear('all');
  };

  const expandAllMajors = () => {
    const majorIds = new Set(Object.keys(groupProgramsByMajor(filteredPrograms)));
    setExpandedMajors(majorIds);
  };

  const collapseAllMajors = () => {
    setExpandedMajors(new Set());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="w-16 h-16 text-orange-500 animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Đang tải danh sách chương trình</h2>
            <p className="text-gray-600">Vui lòng chờ một chút...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">Có lỗi xảy ra</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={handleRetry}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors mr-4 inline-flex items-center"
            >
              <RefreshCw className="w-5 h-5 inline mr-2" />
              Thử lại
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Về trang chủ
            </button>
          </div>
        </div>
      </div>
    );
  }

  const groupedPrograms = groupProgramsByMajor(filteredPrograms);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30">

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <Filter className="w-5 h-5 mr-2 text-orange-500" />
              Bộ lọc
            </h2>
            <div className="flex gap-2">
              <button
                onClick={expandAllMajors}
                className="text-orange-600 hover:text-orange-700 font-medium text-sm"
              >
                Mở rộng tất cả
              </button>
              <span className="text-gray-400">|</span>
              <button
                onClick={collapseAllMajors}
                className="text-orange-600 hover:text-orange-700 font-medium text-sm"
              >
                Thu gọn tất cả
              </button>
              <span className="text-gray-400">|</span>
              <button
                onClick={clearFilters}
                className="text-orange-600 hover:text-orange-700 font-medium text-sm"
              >
                Xóa bộ lọc
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm chương trình..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Campus Filter */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={selectedCampus}
              onChange={(e) => setSelectedCampus(e.target.value)}
            >
              <option value="all">Tất cả cơ sở</option>
              {getUniqueCampuses().map(campus => (
                <option key={campus.id} value={campus.id}>
                  {campus.name}
                </option>
              ))}
            </select>

            {/* Major Filter */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={selectedMajor}
              onChange={(e) => setSelectedMajor(e.target.value)}
            >
              <option value="all">Tất cả ngành</option>
              {getUniqueMajors().map(major => (
                <option key={major.id} value={major.id}>
                  {major.name}
                </option>
              ))}
            </select>

            {/* Year Filter */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="all">Tất cả năm</option>
              {getUniqueYears().map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            {/* Results count */}
            <div className="flex items-center text-gray-600">
              <span className="text-sm">
                Hiển thị: {filteredPrograms.length} / {programs.length}
              </span>
            </div>
          </div>
        </div>

        {/* Programs by Major */}
        {Object.keys(groupedPrograms).length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">
              Không tìm thấy chương trình nào
            </h3>
            <p className="text-gray-500 mb-4">
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
            <button
              onClick={clearFilters}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Xóa bộ lọc
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedPrograms).map(([majorId, majorData]) => {
              const isExpanded = expandedMajors.has(majorId);
              const totalPrograms = Object.values(majorData.specializations).reduce(
                (sum, spec) => sum + spec.programs.length, 0
              );

              return (
                <div key={majorId} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  {/* Major Header */}
                  <div
                    className="bg-orange-500 text-white p-6 cursor-pointer hover:from-orange-600 hover:to-red-600 transition-all duration-300"
                    onClick={() => toggleMajorExpansion(majorId)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                          <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold mb-1">
                            {majorData.major.name}
                          </h2>
                          <p className="text-white/90 text-sm">
                            {Object.keys(majorData.specializations).length} chuyên ngành • {totalPrograms} chương trình
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {isExpanded ? (
                          <ChevronUp className="w-6 h-6 text-white" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-white" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Specializations */}
                  {isExpanded && (
                    <div className="p-6 space-y-6">
                      {Object.entries(majorData.specializations).map(([specializationId, specializationData]) => (
                        <div key={specializationId} className="border-l-4 border-orange-500 pl-6">
                          {/* Specialization Header */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                                <Award className="w-5 h-5 text-orange-500" />
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-gray-800">
                                  {specializationData.specialization.name}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                  {specializationData.programs.length} chương trình
                                </p>
                              </div>
                            </div>
                            <Link
                              to={`/specialization/${specializationId}`}
                              className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center"
                            >
                              Chi tiết chuyên ngành
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                          </div>

                          {/* Programs for this specialization */}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                            {specializationData.programs.map((program) => (
                              <div
                                key={program.id}
                                className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:bg-white border hover:border-orange-200"
                              >
                                {/* Program Header */}
                                <div className="flex items-center justify-between mb-3">
                                  <span className="text-sm bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-medium">
                                    {program.year}
                                  </span>
                                  <div className="flex items-center text-yellow-500">
                                    <Star className="w-4 h-4 fill-current" />
                                  </div>
                                </div>

                                {/* Campus */}
                                <div className="flex items-center mb-3">
                                  <Building className="w-4 h-4 text-orange-500 mr-2" />
                                  <span className="text-gray-700 font-medium text-sm">
                                    {program.campus.name}
                                  </span>
                                </div>

                                {/* Location */}
                                <div className="flex items-center mb-4">
                                  <MapPin className="w-4 h-4 text-orange-500 mr-2" />
                                  <span className="text-gray-600 text-xs line-clamp-1">
                                    {program.campus.address}
                                  </span>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-2 mb-4">
                                  <div className="text-center p-2 bg-white rounded-lg">
                                    <Target className="w-4 h-4 text-orange-500 mx-auto mb-1" />
                                    <p className="text-xs text-gray-600">Chỉ tiêu</p>
                                    <p className="font-bold text-gray-800 text-sm">{program.target}</p>
                                  </div>
                                  <div className="text-center p-2 bg-white rounded-lg">
                                    <DollarSign className="w-4 h-4 text-orange-500 mx-auto mb-1" />
                                    <p className="text-xs text-gray-600">Học phí</p>
                                    <p className="font-bold text-gray-800 text-xs">
                                      {formatPrice(program.price)}
                                    </p>
                                  </div>
                                </div>

                                {/* Action */}
                                <Link
                                  to={`/specialization/${program.specialization.id}`}
                                  className="block w-full bg-orange-500 text-white text-center py-2 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-300 text-sm"
                                >
                                  Xem chi tiết
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramList;