import React, { useEffect, useState } from 'react';
import { GrHomeRounded } from "react-icons/gr";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { HiOutlineLogout } from "react-icons/hi";
import logoFPT from '../../assets/logo-fpt.png';
import { Bell } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    href: string;
}

const navItems: NavItem[] = [
    // { id: 'dashboard', label: 'Dashboard', icon: <AiOutlineHome size={20} />, href: '#' },
    // { id: 'profile', label: 'Profile', icon: <AiOutlineUser size={20} />, href: '#' },
    // { id: 'analytics', label: 'Analytics', icon: <AiOutlineBarChart size={20} />, href: '#' },
    // { id: 'calendar', label: 'Calendar', icon: <AiOutlineCalendar size={20} />, href: '#' },
    // { id: 'documents', label: 'Documents', icon: <AiOutlineFileText size={20} />, href: '#' },
    // { id: 'messages', label: 'Messages', icon: <AiOutlineMail size={20} />, href: '#' },
    // { id: 'search', label: 'Search', icon: <AiOutlineSearch size={20} />, href: '#' },
    // { id: 'settings', label: 'Settings', icon: <AiOutlineSetting size={20} />, href: '#' },
    { id: 'schedule', label: 'Schedule', icon: <RiCalendarScheduleLine size={20} />, href: '/staff' },
    { id: 'notification', label: 'Notification', icon: <Bell size={20} />, href: '/staff/notification' },
    // { id: 'logout', label: 'Logout', icon: <HiOutlineLogout size={20} />, href: '#'},
];

const StaffNavbar: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [activeItem, setActiveItem] = useState('');
    const [account, setAccount] = useState({});

    const getAccount = () => {
        const accountData = localStorage.getItem("account");
        if (accountData) {
            setAccount(JSON.parse(accountData));
        }
    }

    useEffect(() => {
        const currentPath = location.pathname;
        const currentItem = navItems.find(item => item.href === currentPath);
        if (currentItem) {
            setActiveItem(currentItem.id);
        }
        getAccount();
    }, [location.pathname]);

    const handleNavigation = (item: NavItem) => {
        setActiveItem(item.id);
        navigate(item.href);
    };

    const handleLogout = () => {
        setActiveItem('logout');
        localStorage.removeItem("account");
        localStorage.removeItem("token");
        navigate('/');
    };


    return (
        <div className={`fixed left-0 top-0 h-full bg-gradient-to-b from-orange-400 to-red-400 border-r border-orange-500 transition-all duration-300 ease-in-out z-50`}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-orange-800">
                <div className="flex items-center space-x-3">
                    {/* Circle Logo */}
                    <div className="w-57 h-57 bg-orange-100 rounded-full flex items-center justify-center">
                        <img src={logoFPT} alt="FPT University Logo" className="" />
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="py-6">
                <ul className="space-y-2 px-3">
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <a
                                href={item.href}
                                onClick={() => handleNavigation(item)}
                                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${activeItem === item.id
                                    ? 'bg-orange-300 text-white shadow-lg shadow-blue-600/25'
                                    : 'text-gray-200 hover:text-white hover:bg-orange-400'
                                    }`}
                            >
                                <div className={`transition-transform duration-200 ${activeItem === item.id ? 'scale-110' : 'group-hover:scale-105'
                                    }`}>
                                    {item.icon}
                                </div>
                                <span className="font-medium text-sm">{item.label}</span>
                            </a>
                        </li>
                    ))}
                    <li>
                        <a
                            onClick={handleLogout}
                            className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${activeItem === 'logout'
                                ? 'bg-orange-300 text-white shadow-lg shadow-blue-600/25'
                                : 'text-gray-200 hover:text-white hover:bg-orange-400'
                                }`}
                        >
                            <div className={`transition-transform duration-200 ${activeItem === 'logout' ? 'scale-110' : 'group-hover:scale-105'
                                }`}>
                                {<HiOutlineLogout size={20} />}
                            </div>
                            <span className="font-medium text-sm">Logout</span>
                        </a>
                    </li>
                </ul>
            </nav>

            {/* User Profile Section */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-orange-800">
                <div className={`flex items-center space-x-3`}>
                    <div className="w-8 h-8 bg-gradient-to-br rounded-full flex items-center justify-center">
                        <img src={account.image} alt="User Avatar" className="w-full h-full rounded-full object-cover" />
                    </div>
                    <div className="text-white">
                        <p className="text-sm font-medium">{account.userName}</p>
                        <p className="text-xs text-gray-400">{account.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StaffNavbar;