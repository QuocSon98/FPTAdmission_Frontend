"use client"

import { useEffect, useState } from "react"
import {
  FiSearch,
  FiEye,
  FiChevronRight,
  FiPlus,
  FiX,
  FiTrash2
} from "react-icons/fi"
import type { BlogPost, EditorDetails } from "../models/BlogModel"
import EditorPage from "./components/EditorPage"
import { api } from "../services/blogService"
import toast from "react-hot-toast"

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [isCreateNewPost, setIsCreateNewPost] = useState(false)
  const [isEditPost, setIsEditPost] = useState(false)
  const [selectedPost, setSelectedPost] = useState<EditorDetails | null>(null)
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null)

  const fetchBlogPosts = async () => {
    const response = await api.get("/posts")
    const converted = response.data.map((item: any) => ({
      id: item.id,
      topic: item.topic,
      deltaContent: item.htmlContent?.match(/<strong>(.*?)<\/strong>/i)?.[1] || "",
      htmlContent: item.htmlContent,
      category_name: item.category_name,
      stamp: item.stamp,
      view: item.view,
      thumbnail: item.thumbnail,
    }))
    setBlogPosts(converted)
  }

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const handleEditProfile = (post: BlogPost) => {
    setIsEditPost(true)
    setSelectedPost({
      id: post.id,
      topic: post.topic,
      htmlContent: post.htmlContent,
      deltaContent: post.deltaContent,
      categoryName: post.category_name,
      thumbnail: post.thumbnail,
      name: "",
      bio: ""
    })
  }

  const handleDeletePost = async (post: BlogPost) => {
    const id = post.id

    try {
      const res = await api.delete(`/posts/${id}`)
      if (res.status === 200 || res.status === 204) {
        toast.success("Xóa bài viết thành công");
      } else {
        toast.error("Xóa không thành công");
      }
    } catch (error) {
      console.log("Đã xảy ra lỗi", error);
      toast.error("Xóa bài viết thất bại");
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-slate-900">
        {/* Lớp phủ nhẹ hơn */}
        <div className="absolute inset-0 bg-black/1" />
        <div className="relative z-10 mx-auto px-6 py-24">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Blog & Tin tức
          </h1>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input
                placeholder="Tìm kiếm bài viết..."
                className="pl-10 bg-white/80 border border-slate-300 placeholder:text-slate-500 text-slate-900 rounded-md py-2 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <button
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700  text-white px-4 py-2 rounded-md"
                onClick={() => setIsCreateNewPost(true)}
              >
                <FiPlus className="w-4 h-4" />
                Tạo bài viết mới
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* Modal tạo mới */}
      {isCreateNewPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsCreateNewPost(false)} />
          <div className="relative z-10 bg-white rounded-xl shadow-xl max-w-4xl max-h-[90vh] w-full overflow-y-auto p-4">
            {/* Icon đóng */}
            <button
              onClick={() => setIsCreateNewPost(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
              aria-label="Đóng"
            >
              <FiX className="w-6 h-6" />
            </button>
            <EditorPage
              type="post"
              object={null}
              onSuccess={() => {
                setIsCreateNewPost(false)
                fetchBlogPosts()
              }}
            />
          </div>
        </div>
      )}

      {/* Modal chỉnh sửa */}
      {isEditPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsEditPost(false)} />
          <div className="relative z-10 bg-white rounded-xl shadow-xl max-w-5xl max-h-[90vh] w-full overflow-y-auto p-4">
            {/* Icon đóng */}
            <button
              onClick={() => setIsEditPost(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
              aria-label="Đóng"
            >
              <FiX className="w-6 h-6" />
            </button>
            <EditorPage
              type="editPost"
              object={selectedPost}
              onSuccess={() => {
                setIsEditPost(false)
                fetchBlogPosts()
              }}
            />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="lg:col-span-3 space-y-6">
          {blogPosts.map((post) => (
            <div className="border rounded-md overflow-hidden hover:shadow-md transition-shadow" key={post.id}>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4">
                  <img
                    src={post.thumbnail || "/placeholder.svg"}
                    alt={post.topic}
                    className="w-64 h-64 object-cover items-center justify-center"
                  />
                </div>
                <div className="md:w-3/4 p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="px-2 py-1 text-sm bg-slate-200 rounded">{post.category_name}</span>
                  </div>
                  <h3
                    className="text-xl font-bold mb-3 hover:text-red-600 transition-colors cursor-pointer"
                    onClick={() => handleEditProfile(post)}
                  >
                    {post.topic}
                  </h3>
                  <p className="text-slate-600 mb-4 line-clamp-2">{post.stamp}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-4">
                    {/* <div className="flex items-center">
                      <span>Basico Lawyer</span>
                    </div> */}
                    <div className="flex items-center">
                      <FiEye className="w-4 h-4 mr-1" />
                      <span>{post.view}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                      onClick={() => handleEditProfile(post)}
                    >
                      Chỉnh sửa
                      <FiChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                      onClick={() => setPostToDelete(post)}
                    >
                      Xóa
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {postToDelete && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mt-4">Xác nhận xóa</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Bạn có chắc chắn muốn xóa “{postToDelete.topic}”?
                </p>
              </div>
              <div className="flex justify-center space-x-3 mt-4">
                <button
                  onClick={() => setPostToDelete(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Hủy
                </button>
                <button
                  onClick={async () => {
                    await handleDeletePost(postToDelete);
                    setPostToDelete(null); // Đóng modal sau khi xóa
                    fetchBlogPosts(); // Reload lại danh sách nếu cần
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
