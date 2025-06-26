import { useEffect, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import BlotFormatter from 'quill-blot-formatter';
import 'react-quill/dist/quill.snow.css';
import { FaCheckCircle } from 'react-icons/fa';
import { IoClose } from "react-icons/io5";
import { api } from '../services/blogService';
import ImageUploader from 'quill-image-uploader';
import ImageResize from 'quill-image-resize-module-react';

// Đăng ký module chỉ 1 lần
if ((window as any).__quillModulesRegistered !== true) {
    Quill.register("modules/imageUploader", ImageUploader);
    Quill.register("modules/imageResize", ImageResize);
    Quill.register("modules/blotFormatter", BlotFormatter);
    (window as any).__quillModulesRegistered = true;
}


const modules = {
    toolbar: {
        container: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            [{ color: [] }, { background: [] }],
            ['link', 'image', 'video'],
            ['clean'],
        ],
    },
    imageUploader: {
        upload: async (file: File) => {
            const formData = new FormData();
            formData.append('file', file);
            const res = await fetch('http://localhost:8080/api/assets/upload', {
                method: 'POST',
                body: formData,
            }).then(response => response.json());
            if (res.status) {
                console.log('Image uploaded successfully:', res.result);
                return res.result;
            } else {
                throw new Error('Upload failed');
            }
        },
    },
    clipboard: {
        matchVisual: false,
    },
    imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize'],
    },
    blotFormatter: {},
};

const formats = [
    'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike',
    'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'video',
    'color', 'background', 'frame'
];

export interface EditorDetails {
    id: string;
    htmlContent: string;
    // post
    topic: string;
    deltaContent: string;
    categoryName: string;
    thumbnail: string;
    // lawyer profile
    name: string;
    bio: string;
}

export interface EditorProps {
    type: string;
    object: EditorDetails | null;
}


export default function Blog({ type, object }: EditorProps) {
    const quillRef = useRef<ReactQuill>(null);
    const [title, setTitle] = useState('');
    const [html, setHtml] = useState('');
    const [category, setCategory] = useState<string>('');
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
    const [thumbnail, setThumbnail] = useState<string>('');
    const [isChangeCategory, setIsChangeCategory] = useState(false)
    const [modalSuccess, setModalSuccess] = useState(false)

    const handleChange = (content: string) => {
        setHtml(content);
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await api.get('/categories');
            setCategories(res.data);
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (object?.categoryName) {
            console.log(object.categoryName)
            const found = getCategoryByName(object.categoryName, categories);
            if (found) {
                setCategory(found.id);
            } else {
                setCategory(""); // hoặc giá trị mặc định nếu không tìm thấy
            }
        }
    }, [object?.name]);

    useEffect(() => {
        if (object?.htmlContent) {
            setHtml(object.htmlContent);
        }
        if (object?.topic) setTitle(object.topic);
        if (object?.thumbnail) setThumbnail(object.thumbnail);
    }, [object?.id, object?.htmlContent, object?.topic, object?.thumbnail]);

    const handleSave = async () => {
        const editor = quillRef.current?.getEditor();
        const delta = editor?.getContents();

        const res = await api.post('/posts/create', {
            topic: title,
            htmlContent: html,
            deltaContent: JSON.stringify(delta),
            categoryId: category,
            thumbnail: thumbnail
        });

        if (res.status) {
            setModalSuccess(true)
            console.log('Post saved successfully:', res.data);

        } else {
            console.error('Error saving post:', res.data);
        }

    };

    function getCategoryByName(name: string, categories: { id: string; name: string }[]) {
        return categories.find(cat => cat.name.trim().toLowerCase() === name.trim().toLowerCase());
    }

    const handleUploadThumbnail = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('http://localhost:8080/api/assets/upload', {
                method: 'POST',
                body: formData,
            }).then((r) => r.json());

            if (res.status) {
                setThumbnail(res.result); // đường dẫn ảnh đã upload
                console.log("Ảnh đại diện đã upload:", res.result);
            } else {
                throw new Error('Upload thất bại');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditPost = async () => {
        const editor = quillRef.current?.getEditor();
        const delta = editor?.getContents();

        let categoryIdToSend = category;

        if (!isChangeCategory && object) {
            const found = getCategoryByName(object.categoryName, categories);
            if (found) {
                categoryIdToSend = found.id;
            }
        }

        const currentHtml = editor?.root.innerHTML;

        try {
            await api.put(`/posts/${object?.id}`, {
                topic: title,
                htmlContent: currentHtml,
                deltaContent: JSON.stringify(delta),
                categoryId: categoryIdToSend,
                thumbnail: thumbnail
            });
        } catch (error) {
            console.error("Lỗi khi cập nhật bài viết:", error);
        }

    }


    return (
        <>
            <div className="space-y-6 ">
                {type === "post" && (
                    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-6">
                        <h1 className="text-3xl font-bold text-gray-800"> Tạo bài viết mới</h1>

                        {/* Tiêu đề */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề bài viết</label>
                            <input
                                type="text"
                                placeholder="Nhập tiêu đề"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full border border-gray-300 rounded px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Ảnh đại diện */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh đại diện bài viết</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleUploadThumbnail}
                                className="block border border-gray-300 rounded px-3 py-2"
                            />
                            {thumbnail && (
                                <div className="mt-3">
                                    <img
                                        src={thumbnail || "/placeholder.svg"}
                                        alt="Preview Thumbnail"
                                        className="rounded-lg border w-full max-w-sm object-cover h-64 shadow-md"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Danh mục */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục bài viết</label>
                            <select 
                                value={category} 
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Chọn phân loại</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Nội dung */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung bài viết</label>
                            <ReactQuill
                                ref={quillRef}
                                value={html}
                                onChange={handleChange}
                                modules={modules}
                                formats={formats}
                                placeholder="Viết nội dung bài viết ở đây..."
                                className="bg-white rounded shadow"
                            />
                        </div>

                        <div className="text-right">
                            <button
                                onClick={handleSave}
                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium shadow"
                            >
                                Lưu bài viết
                            </button>
                        </div>
                    </div>
                )}

                {type === "editPost" && (
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-6">
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center">✏️ Chỉnh sửa bài viết</h1>
                        {/* Tiêu đề */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề bài viết</label>
                            <input
                                type="text"
                                placeholder="Nhập tiêu đề"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full border border-gray-300 rounded px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Ảnh đại diện */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Ảnh đại diện bài viết</label>

                            {/* Nếu đã có ảnh, hiển thị ảnh với nút "Thay ảnh" */}
                            {thumbnail || object?.thumbnail ? (
                                <div className="relative w-fit">
                                    <img
                                        src={thumbnail || "/placeholder.svg"}
                                        alt="Preview Thumbnail"
                                        className="rounded-lg border w-full max-w-sm object-cover h-64 shadow-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => document.getElementById("thumbnailInput")?.click()}
                                        className="absolute bottom-2 right-2 bg-white/80 border border-gray-300 rounded px-3 py-1 text-sm hover:bg-white shadow"
                                    >
                                        Thay ảnh
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <input
                                        id="thumbnailInput"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleUploadThumbnail}
                                        className="block border border-gray-300 rounded px-3 py-2"
                                    />
                                </>
                            )}

                            {/* Hidden input để kích hoạt lại khi thay ảnh */}
                            <input
                                id="thumbnailInput"
                                type="file"
                                accept="image/*"
                                onChange={handleUploadThumbnail}
                                className="hidden"
                            />
                        </div>


                        {/* Danh mục */}
                        <div className="flex items-center gap-12 py-2">
                            <label className="text-sm font-medium text-gray-700 min-w-max">Danh mục bài viết</label>
                            {!isChangeCategory ? (
                                <>
                                    <input
                                        type="text"
                                        className="border border-gray-300 rounded px-3 py-2 w-48 bg-gray-100"
                                        value={object?.categoryName}
                                        readOnly
                                    />
                                    <button
                                        onClick={() => setIsChangeCategory(true)}
                                        className="bg-blue-700 hover:bg-red-500 text-white px-4 py-1 rounded-md font-medium shadow"
                                    >
                                        Sửa
                                    </button>
                                </>
                            ) : (
                                <>
                                    <select 
                                        value={category} 
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-48 border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Chọn phân loại</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={() => setIsChangeCategory(false)}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded-md font-medium"
                                        title="Hủy"
                                    >
                                        ✕
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Nội dung */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung bài viết</label>
                            <ReactQuill
                                ref={quillRef}
                                value={html}
                                onChange={handleChange}
                                modules={modules}
                                formats={formats}
                                placeholder="Viết nội dung bài viết ở đây..."
                                className="bg-white rounded shadow"
                            />
                        </div>

                        <div className="text-right">
                            <button
                                onClick={handleEditPost}
                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium shadow"
                            >
                                Chỉnh sửa bài viết
                            </button>
                        </div>
                    </div>
                )}

            </div>
            {modalSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/30 bg-opacity-50 transition-opacity" onClick={() => setModalSuccess(false)} />

                    {/* Modal Content */}
                    <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all animate-in fade-in-0 zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                    <FaCheckCircle className="h-8 w-8 text-green-500" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Thành công!</h3>
                            </div>
                            <button onClick={() => setModalSuccess(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <IoClose  className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6">
                            <p className="text-gray-600 text-center">Cập nhật thông tin người dùng thành công!</p>
                            <p className="text-sm text-gray-500 text-center mt-2">Thông tin đã được lưu và cập nhật vào hệ thống.</p>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-center p-6 pt-0">
                            <button 
                                onClick={() => setModalSuccess(false)} 
                                className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>

    );
}