import { useState } from 'react';
import { FiMenu, FiBell, FiSearch, FiUser, FiLogOut } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import { AnimatePresence, motion } from 'framer-motion';
import logoFPT from '../../../app/assets/logo-fpt.png';
import ManageUsers from './partials/ManageUsers';

interface MenuItem {
  key: 'users' | 'reports';
  label: string;
  icon: IconType;
}

const menuItems: MenuItem[] = [
  { key: 'users', label: 'Users', icon: FiUser },
  { key: 'reports', label: 'Reports', icon: FiBell },
];

export default function AdminHome() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [active, setActive] = useState<'users' | 'reports'>('users');

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-gradient-to-b from-orange-400 to-orange-500 text-white">
        <div className="flex items-center justify-center h-19 border-b border-orange-800 bg-white shadow-sm">
          <img src={logoFPT} alt="FPT" className="h-12" />
        </div>
        <nav className="flex-1 p-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActive(item.key)}
                className={`
                  flex items-center w-full mb-3 p-3 rounded-lg transition 
                  ${isActive
                    ? 'bg-white bg-opacity-20 shadow-lg'
                    : 'hover:bg-white hover:bg-opacity-10'}
                `}
              >
                <Icon className={`mr-3 ${isActive ? 'text-black' : 'text-black'}`} size={20} />
                <span className={`font-medium ${isActive ? 'text-black' : 'text-black'}`}>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-orange-700 to-orange-900 text-white z-50 lg:hidden"
          >
            <div className="flex items-center justify-between h-20 px-4 border-b border-orange-800">
              <img src={logoFPT} alt="FPT" className="h-10" />
              <button onClick={() => setSidebarOpen(false)}>
                <FiMenu size={24} />
              </button>
            </div>
            <nav className="p-6">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => {
                      setActive(item.key);
                      setSidebarOpen(false);
                    }}
                    className={`
                      flex items-center w-full mb-3 p-3 rounded-lg transition 
                      ${isActive
                        ? 'bg-white bg-opacity-20 shadow-lg'
                        : 'hover:bg-white hover:bg-opacity-10'}
                    `}
                  >
                    <Icon className="mr-3" size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
          <div className="flex items-center">
            <button
              className="lg:hidden text-gray-600 mr-4"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu size={24} />
            </button>
            <div className="relative">
              <FiSearch className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 transition">
              <FiBell size={20} className="text-gray-600" />
            </button>
            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition">
                <FiUser size={20} className="text-gray-600" />
                <span className="text-gray-700">Admin</span>
              </button>
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <FiLogOut className="mr-2" /> Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {active === 'users' && <ManageUsers />}
          {active === 'reports' && (
            <div className="text-gray-600">
              <h2 className="text-2xl font-semibold mb-4">Reports</h2>
              <p>Chưa có dữ liệu. Module Reports sẽ lên sớm!</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
