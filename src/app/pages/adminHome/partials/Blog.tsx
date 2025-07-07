"use client"

import { useEffect, useState } from "react"
import {
  FiSearch,
  FiCalendar,
  FiEye,
  FiChevronRight,
  FiPlus,
  FiCheckCircle,
  FiX
} from "react-icons/fi"
import type { BlogPost, EditorDetails } from "../models/BlogModel"
import EditorPage from "./components/EditorPage"
import { api } from "../services/blogService"

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [modalSuccess, setModalSuccess] = useState(false)
  const [isCreateNewPost, setIsCreateNewPost] = useState(false)
  const [isEditPost, setIsEditPost] = useState(false)
  const [selectedPost, setSelectedPost] = useState<EditorDetails | null>(null)

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
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsCreateNewPost(false)} />
          <div className="relative z-10 bg-white rounded-xl shadow-xl max-w-4xl max-h-[90vh] w-full overflow-y-auto p-4">
            <EditorPage
              type="post"
              object={null}
              onSuccess={() => {
                setIsCreateNewPost(false)
                fetchBlogPosts()
                setModalSuccess(true)
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
            <EditorPage
              type="editPost"
              object={selectedPost}
              onSuccess={() => {
                setIsCreateNewPost(false)
                fetchBlogPosts()
                setModalSuccess(true)
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
                  <div className="flex items-center justify-between">
                    <button
                      className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                      onClick={() => handleEditProfile(post)}
                    >
                      Chỉnh sửa
                      <FiChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal thông báo thành công */}
      {modalSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 bg-opacity-50 transition-opacity" onClick={() => setModalSuccess(false)} />
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all animate-in fade-in-0 zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <FiCheckCircle className="h-8 w-8 text-green-500" />
                <h3 className="text-lg font-semibold text-gray-900">Thành công!</h3>
              </div>
              <button onClick={() => setModalSuccess(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 text-center">
              <p className="text-gray-600">Cập nhật thông tin người dùng thành công!</p>
              <p className="text-sm text-gray-500 mt-2">Thông tin đã được lưu và cập nhật vào hệ thống.</p>
            </div>
            <div className="flex justify-center p-6 pt-0">
              <button
                onClick={() => setModalSuccess(false)}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-md"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
