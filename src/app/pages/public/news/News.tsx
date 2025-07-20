import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Post {
  id: string;
  topic: string;
  htmlContent: string;
  stamp: string;
  thumbnail: string;
  category_name: string;
}

const News: React.FC = () => {
  const [newsList, setNewsList] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/posts');
        setNewsList(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy tin tức:', error);
      }
    };

    fetchNews();
  }, []);

  const handleClick = (id: string) => {
    navigate(`/tin-tuc/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="w-full h-[300px] bg-[url('/src/app/assets/news-banner.jpg')] bg-center bg-cover flex items-center justify-center">
        <h1 className="text-5xl font-bold bg-white text-orange-500 px-6 py-3 rounded-lg">
          Tin tức nổi bật
        </h1>
      </div>

      {/* Tin tức */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-orange-500 mb-8 text-center">Cập nhật thông tin mới nhất</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300 cursor-pointer"
              onClick={() => handleClick(item.id)}
            >
              <img
                src={item.thumbnail}
                alt={item.topic}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-orange-600 mb-2">{item.topic}</h3>
                <p className="text-sm text-gray-500 italic mb-3">
                  {item.category_name} – {new Date(item.stamp).toLocaleDateString()}
                </p>
                <div
                  className="text-gray-700 text-sm line-clamp-4"
                  dangerouslySetInnerHTML={{ __html: item.htmlContent }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
