import React from 'react';
import './Contract.css'; // Assuming you have a CSS file for styling
import TitleBanner from './../../../components/banner/titleBanner';
import { add } from 'date-fns';

const Contract: React.FC = () => {

    const campusInfo = [
        {
            campus: 'HÀ NỘI',
            address: 'Khu Giáo dục và Đào tạo – Khu Công nghệ cao Hòa Lạc – Km29 Đại lộ Thăng Long, H. Thạch Thất, TP. Hà Nội',
            phone: '(024) 7300 5588',
            email: 'tuyensinh.hanoi@fpt.edu.vn'
        },
        {
            campus: 'TP. HỒ CHÍ MINH',
            address: 'Lô E2a-7, Đường D1 Khu Công nghệ cao, P. Long Thạnh Mỹ, TP. Thủ Đức, TP. Hồ Chí Minh',
            phone: '(028) 7300 5588',
            email: 'daihoc.hcm@fpt.edu.vn'
        },
        {
            campus: 'ĐÀ NẴNG',
            address: 'Khu đô thị công nghệ FPT Đà Nẵng, P. Hoà Hải, Q. Ngũ Hành Sơn, TP. Đà Nẵng',
            phone: '(0236) 730 0999',
            email: 'dnuni@fe.edu.vn'
        },
        {
            campus: 'CẦN THƠ',
            address: 'Số 600 Đường Nguyễn Văn Cừ (nối dài), P. An Bình, Q. Ninh Kiều, TP. Cần Thơ',
            phone: '(0292) 730 3636',
            email: 'fptu.cantho@fe.edu.vn'
        },
        {
            campus: 'QUY NHƠN',
            address: 'Khu đô thị mới An Phú Thịnh, Phường Nhơn Bình & Phường Đống Đa, TP. Quy Nhơn, Bình Định',
            phone: '(0256) 7300 999',
            email: 'qnuni@fe.edu.vn'
        }
    ]

    // Render
    return (
        <>
            {/* Banner */}
            <TitleBanner title='LIÊN HỆ VỚI CHÚNG TÔI' />
            {/* Campus Contract Information */}
            <div className='mx-60 my-10'>
                <div className='text-[40px]'>
                    <h1>Trường Đại học FPT</h1>
                </div>
                {campusInfo.map(campus => (
                    <div className='campus-info'>
                        <h1>{campus.campus}</h1>
                        <h3>{campus.address}</h3>
                        <h3>Điện thoại: {campus.phone}</h3>
                        <h3>Email: {campus.email}</h3>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Contract;
