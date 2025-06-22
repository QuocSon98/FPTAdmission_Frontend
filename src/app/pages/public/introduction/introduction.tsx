import React from 'react'
import TitleBanner from '../../../components/banner/TitleBanner'
import Information from './fragment/information'
import AchievementList from './dataIni/achievementList' // Adjust the import path as necessary
import './Introduction.css' // Assuming you have a CSS file for styling

const Introduction: React.FC = () => {
    return (
        <>
            {/* Banner */}
            <TitleBanner title='GIỚI THIỆU' />
            {/* Introduction Content */}
            <div className='mx-60 my-5'>
                <div className=''>
                    <h1 className='text-center text-[40px] text-title'>Trường Đại học FPT</h1>
                    <Information title='Khát vọng đổi thay' content='Là trường đại học thế hệ mới được hình thành trong lòng doanh nghiệp, Trường Đại học FPT hiểu rõ nhu cầu của thị trường và nhạy bén nắm bắt xu hướng khoa học công nghệ để từ đó xây dựng và triển khai chương trình đào tạo khác biệt, chú trọng phát triển cá nhân gắn liền với đa dạng trải nghiệm đồng thời cung cấp kiến thức cập nhật từ những chương trình đào tạo được kiểm định đạt chuẩn quốc tế cùng kỹ năng nghề nghiệp và năng lực tự học suốt đời cho người học, khát vọng phát triển nền kinh tế tri thức và kiến tạo xã hội hạnh phúc'/>
                    <div className='my-10'>
                        <img src="https://daihoc.fpt.edu.vn/wp-content/uploads/2024/11/128519036_1735296023299592_2956495484616895293_n-1536x1058.avif" alt="" />
                        <p className='text-[#7A7A7A] text-center'>
                            TS. Lê Trường Tùng, Chủ tịch Hội đồng trường Trường Đại học FPT
                        </p>
                    </div>
                    <Information title='Sứ mệnh' content='“Cung cấp năng lực cạnh tranh toàn cầu cho đông đảo người học, góp phần mở mang bờ cõi trí tuệ đất nước”' />
                    <Information title='Tầm nhìn' content='Thể hiện trong từ khóa iGSM (Industry Relevant – Global – Smart Education – Mega)
                    Trở thành một hệ thống giáo dục Mega mang tính quốc tế, đáp ứng nhu cầu xã hội và dựa trên các công nghệ đào tạo tiên tiến nhất.' />
                    <Information title='Triết lý giáo dục' content='Giáo dục và đào tạo là tổ chức và quản trị việc tự học của người học.' />
                </div>
                <div className=''>
                    <h1 className='text-center text-[40px] text-title'>Đẳng cấp quốc tế - Giải thưởng và thành tựu</h1>
                    <AchievementList />
                </div>
            </div>
        </>
    )
}

export default Introduction