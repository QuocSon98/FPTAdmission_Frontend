import React from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Home from '../pages/public/homePage/home';

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <Header />
      <main>
        <Home />
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 