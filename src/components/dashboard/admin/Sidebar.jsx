import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home,
  Users,
  Calendar,
  Landmark,
  Settings,
  Menu,
  ChevronRight,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    first_name: 'User',
    last_name: '',
    profile_pic: 'https://via.placeholder.com/40',
    department: '',
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('doctorData'));
    if (storedUser) {
      setUser({
        first_name: storedUser.first_name || 'User',
        last_name: storedUser.last_name || '',
        profile_pic: storedUser.profile_pic
          ? `https://www.zarvisgenix.com/assets/logo-Q43MSskw.png`
          : 'https://via.placeholder.com/40',
        department: storedUser.department || '',
      });
    }
  }, []);

  const menuItems = [
    { id: 'dashboard', path: '/admin', icon: Home, label: 'Dashboard' },
    { id: 'users', path: '/admin/users', icon: Users, label: 'Users' },
    { id: 'appointments', path: '/admin/appointments', icon: Calendar, label: 'Appointments' },
    { id: 'support', path: '/admin/support', icon: Landmark, label: 'Support' },
    { id: 'settings', path: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className={`h-screen bg-white border-r border-gray-200 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="mx-auto h-8 w-8 rounded-md">
          <img src="https://www.zarvisgenix.com/assets/logo-Q43MSskw.png" className="text-white font-bold text-lg"/>
        </div>
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="text-gray-500 hover:text-gray-700 "
        >
          {collapsed ? <ChevronRight size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className="py-4">
        <div className="px-4 mb-6">
          <div className="flex justify-center">
            <div className="h-10 w-10">
              <img
                className="h-8 w-8 rounded-full border-2 object-cover"
                src={user.profile_pic}
                alt="User profile"
              />
            </div>
          </div>
        </div>

        <nav>
          <ul>
            {menuItems.map((item) => (
              <li key={item.id} className="mb-1">
                <button
                  onClick={() => navigate(item.path)}
                  className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={20} className={location.pathname === item.path ? 'text-blue-600' : 'text-gray-500'} />
                  {!collapsed && <span className="ml-3 text-sm font-medium">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
