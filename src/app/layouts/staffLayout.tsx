import React from 'react';
import { Outlet } from 'react-router-dom';
import StaffNavbar from '../components/navbar/staffNavbar';
import NotiPopup from '../pages/staff/notification/NotiPopup';

const StaffLayout: React.FC = () => {
  return (
    <div className="layout">
        <StaffNavbar/>
      <main>
        <Outlet />
      </main>
      <NotiPopup />
    </div>
  );
};

export default StaffLayout; 