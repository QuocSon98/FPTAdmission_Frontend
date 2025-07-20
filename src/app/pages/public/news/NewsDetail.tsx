import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';

interface Post {
  id: string;
  topic: string;
  htmlContent: string;
  stamp: string;
  thumbnail: string;
  category_name: string;
}

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleBack = () => {
    navigate('/tin-tuc');
  };

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) {
        setError('ID bài viết không hợp lệ');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);


        const response = await axios.get(`http://localhost:8080/api/posts/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
          },
        });

        // Handle different response structures
        let postData: Post;
        if (response.data.data) {
          postData = response.data.data;
        } else if (response.data) {
          postData = response.data;
        } else {
          throw new Error('Dữ liệu không hợp lệ');
        }

        setPost(postData);
        console.log('Fetched post:', postData);

      } catch (error: any) {
        console.error('Lỗi khi lấy chi tiết bài viết:', error);

        if (error.response?.status === 401) {
          setError('Bạn cần đăng nhập để xem nội dung này');
        } else if (error.response?.status === 404) {
          setError('Không tìm thấy bài viết');
        } else if (error.response?.status === 403) {
          setError('Bạn không có quyền truy cập bài viết này');
        } else {
          setError('Có lỗi xảy ra khi tải bài viết');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <p className="text-center mt-20">Đang tải...</p>;

  return (
    <div className="max-w-7xl mx-auto bg-white p-5 rounded-lg shadow-xl">
      <div className="flex items-center justify-between">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors bg-orange-100 hover:bg-orange-300 px-4 py-2 rounded-lg"
        >
          <ArrowLeft size={20} />
          <span className="hidden sm:inline">Quay lại tin tức</span>
        </button>
      </div>
      <h1 className="text-3xl font-bold text-gray-800  mt-8 border-solid border-t-2 p-5 ">{post.topic}</h1>
      <p className="text-lg text-gray-500 italic mb-5">
        {new Date(post.stamp).toLocaleString()}
      </p>
      <img src={post.thumbnail} alt={post.topic} className="w-full rounded-lg mb-6" />
      <div
        className="prose prose-lg"
        dangerouslySetInnerHTML={{ __html: post.htmlContent }}
      />
    </div>
  );
};

export default NewsDetail;
