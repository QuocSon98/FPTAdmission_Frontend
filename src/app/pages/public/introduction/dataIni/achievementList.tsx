import React from 'react';
import Achievement from '../fragment/achievement'; // Adjust the import path as necessary

// Define your achievement list type
const achievementsData = [
    {
        title: 'THE Impact Rankings', 
        content: 'Trường Đại học FPT định hướng phát triển theo các mục tiêu phát triển bền vững của ' + 
                'Liên Hiệp Quốc, và được xếp hạng 401-600 trường đại học có sức ảnh hưởng toàn cầu ' +
                'trên bảng xếp hạng uy tín THE (Times Higher Education) Impact Rankings năm 2024.', 
        imgSrc: 'https://daihoc.fpt.edu.vn/wp-content/uploads/2024/11/THE-png-1.avif'
    },
    {
        title: 'AUN-QA', 
        content: 'Năm 2018, Trường Đại học FPT chính thức được công nhận là thành viên liên kết ' +
                '(Associate Membership) của "Mạng lưới các trường đại học Đông Nam Á" (AUN–QA). ' +
                'Tiêu chuẩn kiểm định chất lượng AUN–QA đang là mục tiêu mà nhiều trường đại học ' +
                'tại Việt Nam và trong khu vực Đông Nam Á hướng tới.', 
        imgSrc: 'https://daihoc.fpt.edu.vn/wp-content/uploads/2024/11/13254382_976580879127134_4137907135004517314_n.avif'
    },
    {
        title: 'ACBSP', 
        content: 'ACBSP (Accreditation Council for Business Schools and Programs) là Hội đồng Kiểm định ' +
                'các trường và chương trình đào tạo về kinh doanh. Đây là một trong những tổ chức kiểm định ' +
                'quốc tế chuyên ngành kinh doanh có giá trị và uy tín trên thế giới. Tính tới tháng 4/2023, ' +
                'Việt Nam có 3 trường đại học, trong đó có Trường Đại học FPT được ACBSP công nhận (mức A – Accredited), ' +
                'một số trường khác đang trên hành trình kiểm định (mức C – Candidate for Accreditation) hoặc ' +
                'chỉ mới là thành viên (mức M – Member Only / Not Accredited).', 
        imgSrc: 'https://daihoc.fpt.edu.vn/wp-content/uploads/2024/11/acbsp-150x150.avif'
    },
    {
        title: 'ASOCIO', 
        content: 'Asian-Oceanian Computing Industry Organization là Tổ chức Công nghiệp điện toán ' +
                'châu Á – châu Đại Dương đã được thành lập hơn 30 năm. Trong khuôn khổ Hội nghị Thượng đỉnh ' +
                'Số ASOCIO 2018 (TP. Tokyo, Nhật Bản) vào ngày 7-8/11/2018, Hội đồng giải thưởng ASOCIO 2018 ' +
                'đã quyết định trao giải cho Trường Đại học FPT tại hạng mục Đơn vị đào tạo công nghệ thông tin ' +
                'xuất sắc (ICT Education). Trường Đại học FPT là đơn vị giáo dục thứ 2 của Việt Nam vinh dự ' +
                'nhận giải thưởng ASOCIO.', 
        imgSrc: 'https://daihoc.fpt.edu.vn/wp-content/uploads/2024/11/Screen-Shot-2024-12-03-at-16.44.51-png.avif'
    },
    {
        title: 'ISO 21001:2018', 
        content: 'Đây là tiêu chuẩn quốc tế được phát triển bởi Tổ chức Tiêu chuẩn hóa Quốc tế (ISO). ' +
                'Khác với ISO 9001:2015 là tiêu chuẩn áp dụng đại trà cho tất cả các doanh nghiệp, tổ chức ' +
                'thuộc nhiều lĩnh vực khác nhau, ISO 21001:2018 được thiết kế và phát triển để cung cấp ' +
                'hệ thống quản lý chất lượng dành riêng cho lĩnh vực giáo dục. Tại Việt Nam, Trường Đại học FPT ' +
                'đạt chứng nhận từ năm 2021, là trường đầu tiên áp dụng và đạt được chứng nhận.', 
        imgSrc: 'https://daihoc.fpt.edu.vn/wp-content/uploads/2024/11/21001-e1715144955643-768x289.webp'
    },
    {
        title: 'AQAS', 
        content: 'Năm 2024, chương trình đào tạo khối ngành Công nghệ thông tin tại Trường Đại học FPT ' +
                'đã đạt tiêu chuẩn kiểm định quốc tế AQAS. Đây là tổ chức kiểm định uy tín được công nhận ' +
                'bởi Hội đồng Kiểm định Đức, thuộc Hiệp hội đảm bảo chất lượng châu Âu – ENQA ' +
                '(European Association for Quality Assurance in Higher Education). Tính đến hiện nay, ' +
                'Trường Đại học FPT là trường thứ hai tại Việt Nam có chương trình đào tạo đạt chuẩn kiểm định AQAS.', 
        imgSrc: 'https://daihoc.fpt.edu.vn/wp-content/uploads/2024/11/AQAS.webp'
    },
    {
        title: 'Giải thưởng Thương hiệu xuất sắc thế giới 2018', 
        content: 'Giải thưởng Thương hiệu xuất sắc thế giới – The Brand Laureate Special Edition World Awards ' +
                'được tổ chức bởi Quỹ thương hiệu châu Á Thái Bình Dương (APBF), thương hiệu kiêm nhà sáng lập ' +
                'thương hiệu duy nhất trên thế giới của Giải thưởng Thương hiệu xuất sắc thế giới – Brandlaureate ' +
                'Special Edition World. Năm 2018, sánh vai cùng nhiều thương hiệu tên tuổi, Trường Đại học FPT ' +
                'được vinh danh tại hạng mục Best Brands in Education Tertiary – Trường Đại học xuất sắc trong ' +
                'khối Đại học và Tổ chức Giáo dục FPT được xướng tên tại hạng mục Excellence in Education – ' +
                'Thương hiệu tổ chức giáo dục xuất sắc.', 
        imgSrc: 'https://daihoc.fpt.edu.vn/wp-content/uploads/2024/11/Screen-Shot-2024-06-20-at-12.35.25-768x502.avif'
    },
    {
        title: 'CDIO', 
        content: 'Trường Đại học FPT chính thức được công nhận là thành viên của Hiệp hội CDIO vào năm 2017. ' +
                'CDIO là viết tắt của cụm từ tiếng Anh Conceive – Design – Implement – Operate, nghĩa là: ' +
                'Hình thành ý tưởng, Thiết kế ý tưởng, Thực hiện và Vận hành. Tham gia kết nối cộng đồng CDIO ' +
                'khu vực và thế giới là cơ hội để Trường Đại học FPT tăng cường giao lưu, hợp tác, học hỏi và ' +
                'trao đổi về phát triển chương trình, giảng dạy và phát triển giảng viên. CDIO xác định chuẩn ' +
                'đầu ra, trên cơ sở đó sẽ thiết kế chương trình đào tạo. Quy trình này được xây dựng một cách ' +
                'khoa học, logic, có thể áp dụng rộng rãi các lĩnh vực đào tạo.', 
        imgSrc: 'https://daihoc.fpt.edu.vn/wp-content/uploads/2024/11/cq5dam.web_.1114.627-1024x576.webp'
    },
    {
        title: 'FPT được vinh danh tại APICTA AWARDS 2019', 
        content: 'APICTA Awards là giải thưởng quốc tế do liên minh các tổ chức CNTT – Viễn Thông trong ' +
                'khu vực Châu Á – Thái Bình Dương (APICTA) tổ chức với mong muốn ghi nhận những ứng dụng, ' +
                'sản phẩm, giải pháp, dịch vụ phần mềm, CNTT xuất sắc của các quốc gia trong khu vực. ' +
                'Năm 2019, FPT là công ty Việt Nam duy nhất nhận đến ba bằng khen tại Lễ Công bố và trao ' +
                'Giải thưởng CNTT châu Á – Thái Bình Dương (APICTA 2019), với các sản phẩm ứng dụng ' +
                'công nghệ trong lĩnh vực giáo dục.', 
        imgSrc: ''
    },
    {
        title: 'Sao Khuê', 
        content: '11 năm liên tiếp, Trường Đại học FPT giành cú đúp ấn tượng trong giải Sao Khuê  – ' +
                'giải thưởng uy tín của lĩnh vực phần mềm và công nghệ thông tin tại Việt Nam với các ' +
                'hạng mục dành cho Đơn vị đào tạo Công nghệ thông tin hệ chính quy và Đơn vị đào tạo ' +
                'Công nghệ thông tin hệ phi chính quy xuất sắc.', 
        imgSrc: ''
    },
]

const achievementList: React.FC = () => {
    return (
        <div className='grid grid-cols-2 my-5 gap-5'>
            {achievementsData.map((achievement) => (
                <Achievement 
                    title={achievement.title} 
                    content={achievement.content} 
                    imgSrc={achievement.imgSrc}
                />
            ))}
        </div>
    );
};

export default achievementList;