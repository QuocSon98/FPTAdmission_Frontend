import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Filter, Calendar, Clock, ChevronRight, X, Loader2, AlertCircle } from 'lucide-react';
import TitleBanner from './../../../components/banner/titleBanner';

interface Post {
  id: string;
  topic: string;
  htmlContent: string;
  stamp: string;
  thumbnail: string;
  category_name: string;
}

interface Category {
  id: string;
  name: string;
}

const News: React.FC = () => {
  const [newsList, setNewsList] = useState<Post[]>([]);
  const [filteredNews, setFilteredNews] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'views'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [visibleCount, setVisibleCount] = useState(9);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize filters from URL params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search') || '';
    const categoryFilter = searchParams.get('category') || 'all';
    const sortFilter = searchParams.get('sort') || 'date';
    const orderFilter = searchParams.get('order') || 'desc';
    
    setSearchTerm(searchQuery);
    setSelectedCategory(categoryFilter);
    setSortBy(sortFilter as 'date' | 'title' | 'views');
    setSortOrder(orderFilter as 'asc' | 'desc');
  }, [location.search]);

  // Fetch news and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch news
        const newsResponse = await axios.get('http://localhost:8080/api/posts', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
          },
        });

        let newsData = [];
        if (Array.isArray(newsResponse.data)) {
          newsData = newsResponse.data;
        } else if (newsResponse.data.data && Array.isArray(newsResponse.data.data)) {
          newsData = newsResponse.data.data;
        } else if (newsResponse.data.content && Array.isArray(newsResponse.data.content)) {
          newsData = newsResponse.data.content;
        }

        setNewsList(newsData);

        // Extract unique categories from news data
        const uniqueCategories = [...new Set(newsData.map((item: Post) => item.category_name))]
          .filter(Boolean)
          .map((name) => ({ id: (name as string).toLowerCase().replace(/\s+/g, '-'), name: name as string }));
        
        setCategories([{ id: 'all', name: 'Tất cả' }, ...uniqueCategories]);

        console.log('Fetched news:', newsData);
        console.log('Categories:', uniqueCategories);

      } catch (error) {
        console.error('Lỗi khi lấy tin tức:', error);
        setError('Không thể tải tin tức. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and sort news
  useEffect(() => {
    let filtered = [...newsList];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.htmlContent.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      const categoryName = categories.find(cat => cat.id === selectedCategory)?.name;
      if (categoryName) {
        filtered = filtered.filter(item => item.category_name === categoryName);
      }
    }

    // Sort news
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.stamp).getTime() - new Date(b.stamp).getTime();
          break;
        case 'title':
          comparison = a.topic.localeCompare(b.topic, 'vi');
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredNews(filtered);
    setVisibleCount(9); // Reset visible count when filters change
  }, [newsList, searchTerm, selectedCategory, sortBy, sortOrder, categories]);

  // Update URL with current filters
  const updateURL = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (sortBy !== 'date') params.set('sort', sortBy);
    if (sortOrder !== 'desc') params.set('order', sortOrder);
    
    const newURL = params.toString() ? `?${params.toString()}` : '/tin-tuc';
    navigate(newURL, { replace: true });
  };

  // Update URL when filters change
  useEffect(() => {
    updateURL();
  }, [searchTerm, selectedCategory, sortBy, sortOrder]);

  const handleClick = (id: string) => {
    navigate(`/tin-tuc/${id}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('date');
    setSortOrder('desc');
    navigate('/tin-tuc', { replace: true });
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + 9);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} phút đọc`;
  };

  const stripHtml = (html: string, maxLength: number = 150) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    const text = tmp.textContent || tmp.innerText || '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const displayedNews = filteredNews.slice(0, visibleCount);
  const hasMore = visibleCount < filteredNews.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TitleBanner title='TIN TỨC NỔI BẬT' />
        <div className="flex items-center justify-center py-20">
          <div className="flex items-center space-x-3">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="text-lg text-gray-600">Đang tải tin tức...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TitleBanner title='TIN TỨC NỔI BẬT' />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Có lỗi xảy ra</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-9 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TitleBanner title='TIN TỨC NỔI BẬT' />

      {/* Search and Filter Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-9">
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-9">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm tin tức theo tiêu đề, nội dung..."
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'title' | 'views')}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="date">Ngày đăng</option>
                  <option value="title">Tiêu đề</option>
                </select>
              </div>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="desc">Mới nhất</option>
                <option value="asc">Cũ nhất</option>
              </select>

              {(searchTerm || selectedCategory !== 'all' || sortBy !== 'date' || sortOrder !== 'desc') && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Xóa bộ lọc
                </button>
              )}
            </div>
          </div>

          {/* Search Results Info */}
          {(searchTerm || selectedCategory !== 'all') && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-blue-700 text-sm">
                  {searchTerm && `Tìm kiếm: "${searchTerm}" • `}
                  {selectedCategory !== 'all' && `Danh mục: ${categories.find(c => c.id === selectedCategory)?.name} • `}
                  Tìm thấy {filteredNews.length} kết quả
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* News Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full text-2xl font-bold shadow-lg">
            {searchTerm ? `Kết quả tìm kiếm` : selectedCategory === 'all' ? 'Cập nhật thông tin mới nhất' : categories.find(c => c.id === selectedCategory)?.name}
          </div>
        </div>

        {/* No Results */}
        {filteredNews.length === 0 ? (
          <div className="text-center py-9">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Không tìm thấy tin tức nào
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm 
                ? `Không có kết quả cho "${searchTerm}". Thử từ khóa khác hoặc xóa bộ lọc.`
                : 'Thử thay đổi từ khóa tìm kiếm hoặc danh mục'
              }
            </p>
            <button
              onClick={clearFilters}
              className="px-9 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Xem tất cả tin tức
            </button>
          </div>
        ) : (
          <>
            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedNews.map((item) => (
                <div
                  key={item.id}
                  className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-1"
                  onClick={() => handleClick(item.id)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.topic}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/261909/pexels-photo-261909.jpeg?auto=compress&cs=tinysrgb&w=800';
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-orange-500 text-white px-2 py-1 text-xs font-medium rounded-full">
                        {item.category_name}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-orange-600 mb-2 line-clamp-2 group-hover:text-orange-700 transition-colors">
                      {item.topic}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(item.stamp)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{calculateReadTime(item.htmlContent)}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                      {stripHtml(item.htmlContent)}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-orange-500 font-medium text-sm group-hover:text-orange-600 transition-colors flex items-center">
                        Đọc thêm
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </span>
                      
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-9">
                <button
                  onClick={loadMore}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300"
                >
                  Xem thêm ({filteredNews.length - visibleCount} tin tức)
                </button>
              </div>
            )}

            {/* Results Summary */}
            <div className="text-center mt-8 text-gray-500 text-sm">
              Hiển thị {displayedNews.length} / {filteredNews.length} tin tức
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default News;
