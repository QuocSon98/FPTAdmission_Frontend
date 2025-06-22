import React from 'react';
import { Outlet } from 'react-router-dom';
import StaffNavbar from '../components/navbar/staffNavbar';

const StaffLayout: React.FC = () => {
  return (
    <div className="layout">
        <StaffNavbar/>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default StaffLayout; 