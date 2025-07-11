import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết bài viết:', error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <p className="text-center mt-20">Đang tải...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-orange-600 mb-4">{post.topic}</h1>
      <p className="text-sm text-gray-500 italic mb-4">
        {post.category_name} – {new Date(post.stamp).toLocaleString()}
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
