import { useEffect, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import BlotFormatter from 'quill-blot-formatter';
import 'react-quill/dist/quill.snow.css';
import { api } from '../../services/blogService';
import ImageUploader from 'quill-image-uploader';
import ImageResize from 'quill-image-resize-module-react';
import toast from 'react-hot-toast';
import type { EditorProps } from '../../models/BlogModel';

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


export default function EditorPage({ type, object, onSuccess }: EditorProps) {
    const quillRef = useRef<ReactQuill>(null);
    const [topic, setTopic] = useState('');
    const [html, setHtml] = useState('');
    const [category, setCategory] = useState<string>('');
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
    const [thumbnail, setThumbnail] = useState<string>('');
    const [isChangeCategory, setIsChangeCategory] = useState(false)

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
        if (object?.topic) setTopic(object.topic);
        if (object?.thumbnail) setThumbnail(object.thumbnail);
    }, [object?.id, object?.htmlContent, object?.topic, object?.thumbnail]);

    const handleSave = async () => {
        const editor = quillRef.current?.getEditor();
        const delta = editor?.getContents();
        // console.log(topic);
        // console.log(html);
        // console.log(delta);
        // console.log(category);
        // console.log(thumbnail);

        try {
            const res = await api.post('/posts/create', {
                topic: topic,
                htmlContent: html,
                deltaContent: JSON.stringify(delta),
                categoryId: category,
                thumbnail: thumbnail
            });

            if (res.status) {
                // setModalSuccess(true)
                if (onSuccess) onSuccess();
                toast.success("Tạo bài viết thành công")
            } else {
                console.error('Error saving post:', res.data);
                toast.error("Tạo thất bại")
            }
        } catch (error) {
            console.error("Lỗi khi tạo bài viết:", error);
            toast.error("Đã xảy ra lỗi hệ thống");
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
            const res = await api.post('/assets/upload', formData);

            if (res.data.status) {
                setThumbnail(res.data.result); // đường dẫn ảnh đã upload
                console.log("Ảnh đại diện đã upload:", res.data.result);
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
            const res = await api.put(`/posts/${object?.id}`, {
                topic: topic,
                htmlContent: currentHtml,
                deltaContent: JSON.stringify(delta),
                categoryId: categoryIdToSend,
                thumbnail: thumbnail
            });
            if (res.status) {
                // console.log('Post saved successfully:', res.data);
                if(onSuccess) onSuccess()
                toast.success("Cập nhật bài viết thành công")
            } else {
                console.error('Error saving post:', res.data);
                toast.error("Cập nhật thất bại")
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật bài viết:", error);
        }

    }


    return (
        <>
            <div className="space-y-6 ">
                {type === "post" && (
                    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-6">
                        <h1 className="text-2xl font-bold text-gray-800"> Tạo bài viết mới</h1>

                        {/* Tiêu đề */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề bài viết</label>
                            <input
                                type="text"
                                placeholder="Nhập tiêu đề"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
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
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
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
           
        </>

    );
}