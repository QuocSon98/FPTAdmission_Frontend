// import React from 'react';
// // import { Link } from 'react-router-dom';
// import './Footer.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// //npm install @fortawesome/free-brands-svg-icons
// import { faFacebook, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';

// const Footer: React.FC = () => {
//   return (
//     <footer className="footer">
//       <div className="footer-top">
//         <div className="container">
//           <div className="footer-grid">
//             <div className="footer-col">
//               <h3>HÀ NỘI</h3>
//               <p>Khu Giáo dục và Đào tạo – Khu Công nghệ cao Hòa Lạc – Km29 Đại lộ Thăng Long, H. Thạch Thất, TP. Hà Nội</p>
//               <p>Điện thoại: (024) 7300 5588</p>
//               <p>Email: tuyensinhhanoi@fpt.edu.vn</p>
//             </div>
//             <div className="footer-col">
//               <h3>TP. HỒ CHÍ MINH</h3>
//               <p>Lô E2a-7, Đường D1 Khu Công nghệ cao, P. Long Thạnh Mỹ, TP. Thủ Đức, TP. Hồ Chí Minh</p>
//               <p>Điện thoại: (028) 7300 5588</p>
//               <p>Email:  tuyensinhhcm@fpt.edu.vn</p>
//             </div>
//             <div className="footer-col">
//               <h3>ĐÀ NẴNG</h3>
//               <p>Khu đô thị công nghệ FPT Đà Nẵng, P. Hoà Hải, Q. Ngũ Hành Sơn, TP. Đà Nẵng</p>
//               <p>Điện thoại: (0236) 730 0999</p>
//               <p>Email: tuyensinhdanang@fpt.edu.vn</p>
//             </div>
//             <div className="footer-col">
//               <h3>CẦN THƠ</h3>
//               <p>Số 600 Đường Nguyễn Văn Cừ (nối dài), P. An Bình, Q. Ninh Kiều, TP. Cần Thơ</p>
//               <p>Điện thoại: (0292) 730 3636</p>
//               <p>Email: tuyensinhcantho@fpt.edu.vn</p>
//             </div>
//             <div className="footer-col">
//               <h3>Quy Nhơn</h3>
//               <p>Khu đô thị mới An Phú Thịnh, Phường Nhơn Bình & Phường Đống Đa, TP. Quy Nhơn, Bình Định</p>
//               <p>Điện thoại: (0256) 7300 999</p>
//               <p>Email: tuyensinhquynhon@fpt.edu.vn</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="footer-bottom">
//         <div className="container">
//           <div className="footer-bottom-content">
//             <div className="copyright">
//               © 2024 Bản quyền thuộc về Trường Đại học FPT.
//             </div>
//             <div className="social-links">
//               <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
//                 <FontAwesomeIcon icon={faFacebook} />
//               </a>
//               <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
//                 <FontAwesomeIcon icon={faYoutube} />
//               </a>
//               <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
//                 <FontAwesomeIcon icon={faTiktok} />
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer; 

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-10 pb-5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-10 border-t-2 border-b-2  border-solid border-orange-500 p-5">
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-orange-600">HÀ NỘI</h3>
            <p className="text-gray-950 text-sm">Khu Giáo dục và Đào tạo – Khu Công nghệ cao Hòa Lạc – Km29 Đại lộ Thăng Long, H. Thạch Thất, TP. Hà Nội</p>
            <p className="text-gray-950 text-sm">Điện thoại: (024) 7300 5588</p>
            <p className="text-gray-950 text-sm">Email: tuyensinhhanoi@fpt.edu.vn</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg text-orange-600">TP. HỒ CHÍ MINH</h3>
            <p className="text-gray-950 text-sm">Lô E2a-7, Đường D1 Khu Công nghệ cao, P. Long Thạnh Mỹ, TP. Thủ Đức, TP. Hồ Chí Minh</p>
            <p className="text-gray-950 text-sm">Điện thoại: (028) 7300 5588</p>
            <p className="text-gray-950 text-sm">Email: tuyensinhhcm@fpt.edu.vn</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg text-orange-600">ĐÀ NẴNG</h3>
            <p className="text-gray-950 text-sm">Khu đô thị công nghệ FPT Đà Nẵng, P. Hoà Hải, Q. Ngũ Hành Sơn, TP. Đà Nẵng</p>
            <p className="text-gray-950 text-sm">Điện thoại: (0236) 730 0999</p>
            <p className="text-gray-950 text-sm">Email: tuyensinhdanang@fpt.edu.vn</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg text-orange-600">CẦN THƠ</h3>
            <p className="text-gray-950 text-sm">Số 600 Đường Nguyễn Văn Cừ (nối dài), P. An Bình, Q. Ninh Kiều, TP. Cần Thơ</p>
            <p className="text-gray-950 text-sm">Điện thoại: (0292) 730 3636</p>
            <p className="text-gray-950 text-sm">Email: tuyensinhcantho@fpt.edu.vn</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg text-orange-600">QUY NHƠN</h3>
            <p className="text-gray-950 text-sm">Khu đô thị mới An Phú Thịnh, Phường Nhơn Bình & Phường Đống Đa, TP. Quy Nhơn, Bình Định</p>
            <p className="text-gray-950 text-sm">Điện thoại: (0256) 7300 999</p>
            <p className="text-gray-950 text-sm">Email: tuyensinhquynhon@fpt.edu.vn</p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-5 ">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-950 text-sm mb-4 md:mb-0">
              © 2024 Bản quyền thuộc về Trường Đại học FPT.
            </div>
            <div className="flex space-x-6 ">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 text-xl">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 text-xl">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black text-xl">
                <FontAwesomeIcon icon={faTiktok} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;