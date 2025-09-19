import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Home, Calendar, Video, Pill, User, Bell, Settings, LogOut } from 'lucide-react';

type TabType = 'dashboard' | 'appointments' | 'consultation' | 'pharmacy' | 'profile';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'consultation', label: 'Video Consultation', icon: Video },
    { id: 'pharmacy', label: 'Pharmacy', icon: Pill },
    { id: 'profile', label: 'Medical Profile', icon: User },
  ];

  const { logout } = useAuth();

  return (
    <>
      {/* Mobile sidebar backdrop */}
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden opacity-0 pointer-events-none" />
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-xl z-30 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-800">Medi-Mitra Portal</h1>
            <p className="text-sm text-gray-500 mt-1">Patient Dashboard</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 px-3">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onTabChange(item.id as TabType)}
                      className={`w-full flex items-center px-3 py-2.5 text-left rounded-lg transition-colors duration-200 ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer actions */}
          <div className="p-3 border-t border-gray-200">
            <button className="w-full flex items-center px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <Bell className="w-5 h-5 mr-3 text-gray-400" />
              <span className="font-medium">Notifications</span>
            </button>
            <button className="w-full flex items-center px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <Settings className="w-5 h-5 mr-3 text-gray-400" />
              <span className="font-medium">Settings</span>
            </button>
            <button onClick={logout} className="w-full flex items-center px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
              <LogOut className="w-5 h-5 mr-3 text-red-500" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;