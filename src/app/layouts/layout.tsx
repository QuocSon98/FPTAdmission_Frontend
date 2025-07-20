import React from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import { Outlet } from 'react-router-dom';
import ChatWidget from '../pages/public/chatbox/component/ChatWidget';

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <Header />
      <main>
        <Outlet />
      </main>
      <ChatWidget />
      <Footer />
    </div>
  );
};

export default Layout; 