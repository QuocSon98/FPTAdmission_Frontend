import React from 'react';
// import { Link } from 'react-router-dom';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//npm install @fortawesome/free-brands-svg-icons
import { faFacebook, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="copyright">
              © 2024 Bản quyền thuộc về Trường Đại học FPT.
            </div>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a href="https://zalo.com" target="_blank" rel="noopener noreferrer">
                 {/* <FontAwesomeIcon icon={faZalo} /> */}
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTiktok} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h3>HÀ NỘI</h3>
              <p>Khu Giáo dục và Đào tạo – Khu Công nghệ cao Hòa Lạc – Km29 Đại lộ Thăng Long, H. Thạch Thất, TP. Hà Nội</p>
              <p>Điện thoại: (024) 7300 5588</p>
              <p>Email: tuyensinhhanoi@fpt.edu.vn</p>
            </div>
            <div className="footer-col">
              <h3>TP. HỒ CHÍ MINH</h3>
              <p>Lô E2a-7, Đường D1 Khu Công nghệ cao, P. Long Thạnh Mỹ, TP. Thủ Đức, TP. Hồ Chí Minh</p>
              <p>Điện thoại: (028) 7300 5588</p>
              <p>Email:  tuyensinhhcm@fpt.edu.vn</p>
            </div>
            <div className="footer-col">
              <h3>ĐÀ NẴNG</h3>
              <p>Khu đô thị công nghệ FPT Đà Nẵng, P. Hoà Hải, Q. Ngũ Hành Sơn, TP. Đà Nẵng</p>
              <p>Điện thoại: (0236) 730 0999</p>
              <p>Email: tuyensinhdanang@fpt.edu.vn</p>
            </div>
            <div className="footer-col">
              <h3>CẦN THƠ</h3>
              <p>Số 600 Đường Nguyễn Văn Cừ (nối dài), P. An Bình, Q. Ninh Kiều, TP. Cần Thơ</p>
              <p>Điện thoại: (0292) 730 3636</p>
              <p>Email: tuyensinhcantho@fpt.edu.vn</p>
            </div>
            <div className="footer-col">
              <h3>Quy Nhơn</h3>
              <p>Khu đô thị mới An Phú Thịnh, Phường Nhơn Bình & Phường Đống Đa, TP. Quy Nhơn, Bình Định</p>
              <p>Điện thoại: (0256) 7300 999</p>
              <p>Email: tuyensinhquynhon@fpt.edu.vn</p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="copyright">
              © 2024 Bản quyền thuộc về Trường Đại học FPT.
            </div>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a href="https://zalo.com" target="_blank" rel="noopener noreferrer">
                 <FontAwesomeIcon icon={faZalo} />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTiktok} />
              </a>
            </div>
          </div>
        </div>
      </div> */}
    </footer>
  );
};

export default Footer; 