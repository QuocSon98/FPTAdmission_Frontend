import React from 'react';
import './Contract.css'; // Assuming you have a CSS file for styling
import Admission from './form/admission';

const Contract: React.FC = () => {

    // Render
    return (
        <>
            {/* Banner */}
            <div className='flex items-center justify-center text-center relative h-[300px]'>
                <img src="/src/app/assets/img03.png" alt="" className='brightness-[0.6]' />
                <h1 className='absolute text-[50px] text-white text-shadow-[2px_2px_4px_rgba(0_0_0_/_0.7)]'>LIÊN HỆ VỚI CHÚNG TÔI</h1>
            </div>
            {/* Campus Contract Information */}
            <div className='mx-45 my-10'>
                <div className='text-[40px]'>
                    <h1>Trường Đại học FPT</h1>
                </div>
                <div className='campus-info'>
                    <h1>HÀ NỘI</h1>
                    <h3>Khu Giáo dục và Đào tạo – Khu Công nghệ cao Hòa Lạc – Km29 Đại lộ Thăng Long, H. Thạch Thất, TP. Hà Nội</h3>
                    <h3>Điện thoại: (024) 7300 5588</h3>
                    <h3>Email: tuyensinh.hanoi@fpt.edu.vn</h3>
                </div>
                <div className='campus-info'>
                    <h1>TP. HỒ CHÍ MINH</h1>
                    <h3>Lô E2a-7, Đường D1 Khu Công nghệ cao, P. Long Thạnh Mỹ, TP. Thủ Đức, TP. Hồ Chí Minh</h3>
                    <h3>Điện thoại: (028) 7300 5588</h3>
                    <h3>Email: daihoc.hcm@fpt.edu.vn</h3>
                </div>
                <div className='campus-info'>
                    <h1>ĐÀ NẴNG</h1>
                    <h3>Khu đô thị công nghệ FPT Đà Nẵng, P. Hoà Hải, Q. Ngũ Hành Sơn, TP. Đà Nẵng</h3>
                    <h3>Điện thoại: (0236) 730 0999</h3>
                    <h3>Email: dnuni@fe.edu.vn</h3>
                </div>
                <div className='campus-info'>
                    <h1>CẦN THƠ</h1>
                    <h3>Số 600 Đường Nguyễn Văn Cừ (nối dài), P. An Bình, Q. Ninh Kiều, TP. Cần Thơ</h3>
                    <h3>Điện thoại: (0292) 730 3636</h3>
                    <h3>Email: fptu.cantho@fe.edu.vn</h3>
                </div>
                <div className='campus-info'>
                    <h1>QUY NHƠN</h1>
                    <h3>Khu đô thị mới An Phú Thịnh, Phường Nhơn Bình & Phường Đống Đa, TP. Quy Nhơn, Bình Định</h3>
                    <h3>Điện thoại: (0256) 7300 999</h3>
                    <h3>Email: qnuni@fe.edu.vn</h3>
                </div>
            </div>
            {/* Admission Register Form */}
            <div className='mx-45 my-10'>
                <Admission />
            </div>
        </>
    );
};

export default Contract;
