// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import logo from '../../assets/logo.png';
// import './Header.css';

// const Header: React.FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <header className="header">
//       <div className="header-top">
//         <div className="container">
//           <div className="header-top-content">
//             <div className="logoTC">
//               <Link to="/">
//                 <img className='imgTC' src={logo} alt="FPT University" />
//               </Link>
//             </div>
//             <div className="header-right">
//               <div className="language-switch">
//                 <button className="lang-btn active">VI</button>
//                 <button className="lang-btn">EN</button>
//               </div>
//               <div className="search-box">
//                 <input type="text" placeholder="Tìm kiếm..." />
//                 <button type="button">
//                   search
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <nav className="main-nav">
//         <div className="containerTC">
//           <button className="mobile-menu-btn" onClick={toggleMenu}>
//             <span></span>
//             <span></span>
//             <span></span>
//           </button>
//           <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
//             <li><Link to="/">Trang chủ</Link></li>
//             <li><Link to="/gioi-thieu">Giới thiệu</Link></li>
//             <li><Link to="/tin-tuc">Tin tức & Sự kiện</Link></li>
//             <li><Link to="/nganh-hoc">Ngành học</Link></li>
//             <li><Link to="/tuyen-sinh">Tuyển sinh</Link></li>
//             <li><Link to="/trai-nghiem">Trải nghiệm toàn cầu</Link></li>
//             <li><Link to="/sinh-vien">Sinh viên</Link></li>
//             <li><Link to="/cuu-sinh-vien">Cựu Sinh viên</Link></li>
//             <li><Link to="/lien-he">Liên hệ</Link></li>
//           </ul>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header; 

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-white shadow-md">
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="w-70">
              <Link to="/">
                <img className="w-full h-auto" src={logo} alt="FPT University" />
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex">
                <input 
                  type="text" 
                  placeholder="Tìm kiếm..." 
                  className="px-15 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button 
                  type="button"
                  className="px-4 py-2 bg-orange-500 text-white rounded-r-md hover:bg-orange-600"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav className="bg-orange-600">
        <div className="max-w-8xl mx-auto px-7 flex justify-center">
          <div className="relative">
            <button 
              className="md:hidden p-2 text-white"
              onClick={toggleMenu}
            >
              <div className="space-y-2">
                <span className="block w-8 h-0.5 bg-white"></span>
                <span className="block w-8 h-0.5 bg-white"></span>
                <span className="block w-8 h-0.5 bg-white"></span>
              </div>
            </button>
            <ul className={`${isMenuOpen ? 'block' : 'hidden'} md:flex md:space-x-6 py-4 md:py-0 ${isMenuOpen ? 'absolute top-full left-0 right-0 bg-orange-500' : ''}uppercase`}>
              <li><Link to="/" className="block py-4 px-5 text-white hover:bg-orange-700 font-semibold text-xl ">Trang chủ</Link></li>
              <li><Link to="/introduction" className="block py-4 px-5 text-white hover:bg-orange-700 font-semibold text-xl">Giới thiệu</Link></li>
              <li><Link to="/tin-tuc" className="block py-4 px-5 text-white hover:bg-orange-700 font-semibold text-xl">Tin tức & Sự kiện</Link></li>
              <li><Link to="/major" className="block py-4 px-5 text-white hover:bg-orange-700 font-semibold text-xl">Ngành học</Link></li>
              <li><Link to="/tuyen-sinh" className="block py-4 px-5 text-white hover:bg-orange-700 font-semibold text-xl">Tuyển sinh</Link></li>
              <li><Link to="/contract" className="block py-4 px-5 text-white hover:bg-orange-700 font-semibold text-xl">Liên hệ</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;