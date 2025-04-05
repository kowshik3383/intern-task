import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Moon, 
  Sun, 
  Lock, 
  User, 
  Globe, 
  ShieldCheck, 
  CreditCard,
  Settings as SettingsIcon,
  LogOut,
  ChevronRight
} from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "/api/placeholder/40/40",
    plan: "Free"
  });

  // Load user data from localStorage on component mount
  useEffect(() => {
    try {
      // Attempt to retrieve user data from localStorage
      const userData = localStorage.getItem('user');
      
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        setUser({
          name: parsedUserData.first_name || "User",
          email: parsedUserData.email || "user@example.com",
          avatar: parsedUserData.profile || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.304493934.1732708042&semt=ais_hybrid",
          plan: parsedUserData.email || "Free"
        });
      } else {
        // Set default values if no user data in localStorage
        console.log("No user data found in localStorage");
      }
    } catch (error) {
      console.error("Error loading user data from localStorage:", error);
    }
  }, []);

  // Function to save user data to localStorage
  const saveUserData = (updatedData) => {
    try {
      const updatedUser = { ...user, ...updatedData };
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      setUser(updatedUser);
      alert("User information saved successfully!");
    } catch (error) {
      console.error("Error saving user data to localStorage:", error);
      alert("Failed to save user information.");
    }
  };

  const handleSubmitUserInfo = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const updatedData = {
      name: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone')
    };
    
    saveUserData(updatedData);
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">General Settings</h2>
            
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-800">Theme</h3>
                  <p className="text-sm text-gray-500">Toggle between light and dark mode</p>
                </div>
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2 rounded-full ${darkMode ? 'bg-indigo-100' : 'bg-gray-100'}`}
                >
                  {darkMode ? 
                    <Moon className="h-5 w-5 text-indigo-600" /> : 
                    <Sun className="h-5 w-5 text-amber-500" />
                  }
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-800">Language</h3>
                  <p className="text-sm text-gray-500">Select your preferred language</p>
                </div>
                <select className="form-select rounded border-gray-300 text-sm">
                  <option>English (US)</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-800">Time Zone</h3>
                  <p className="text-sm text-gray-500">Set your local time zone</p>
                </div>
                <select className="form-select rounded border-gray-300 text-sm">
                  <option>Eastern Time (ET)</option>
                  <option>Pacific Time (PT)</option>
                  <option>Central European Time (CET)</option>
                  <option>Japan Standard Time (JST)</option>
                </select>
              </div>
            </div>
          </div>
        );
      
      case 'account':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Account Settings</h2>
            
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center space-x-4">
                <img src={user.avatar} alt="Profile" className="rounded-full h-14 w-14" />
                <div>
                  <h3 className="font-medium text-gray-800">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="text-sm text-indigo-600 hover:text-indigo-800">
                  Change profile picture
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-medium text-gray-800 mb-4">Personal Information</h3>
              <form onSubmit={handleSubmitUserInfo} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    name="fullName"
                    defaultValue={user.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    defaultValue={user.email}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    defaultValue={user.phone || ""}
                    placeholder="Add a phone number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
        
      case 'notifications':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Notification Settings</h2>
            
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-medium text-gray-800 mb-4">Email Notifications</h3>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Receive email notifications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={emailNotifications}
                    onChange={() => setEmailNotifications(!emailNotifications)}
                  />
                  <div className={`w-11 h-6 rounded-full peer ${emailNotifications ? 'bg-indigo-600' : 'bg-gray-200'} peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                </label>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">SMS Notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={smsNotifications}
                      onChange={() => setSmsNotifications(!smsNotifications)}
                    />
                    <div className={`w-11 h-6 rounded-full peer ${smsNotifications ? 'bg-indigo-600' : 'bg-gray-200'} peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-medium text-gray-800 mb-4">Notification Types</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input id="updates" type="checkbox" className="h-4 w-4 text-indigo-600 rounded" defaultChecked />
                  <label htmlFor="updates" className="ml-2 text-sm text-gray-700">Product updates</label>
                </div>
                <div className="flex items-center">
                  <input id="security" type="checkbox" className="h-4 w-4 text-indigo-600 rounded" defaultChecked />
                  <label htmlFor="security" className="ml-2 text-sm text-gray-700">Security alerts</label>
                </div>
                <div className="flex items-center">
                  <input id="offers" type="checkbox" className="h-4 w-4 text-indigo-600 rounded" />
                  <label htmlFor="offers" className="ml-2 text-sm text-gray-700">Offers and promotions</label>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'security':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Security Settings</h2>
            
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-800">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={twoFactorAuth}
                    onChange={() => setTwoFactorAuth(!twoFactorAuth)}
                  />
                  <div className={`w-11 h-6 rounded-full peer ${twoFactorAuth ? 'bg-indigo-600' : 'bg-gray-200'} peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                </label>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-medium text-gray-800 mb-2">Password</h3>
              <p className="text-sm text-gray-500 mb-4">Change your password</p>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                Change Password
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-medium text-gray-800 mb-2">Device History</h3>
              <p className="text-sm text-gray-500 mb-4">See all devices that have logged into your account</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium text-sm">MacBook Pro - Chrome</p>
                    <p className="text-xs text-gray-500">New York, USA - Current device</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium text-sm">iPhone 15 - Safari</p>
                    <p className="text-xs text-gray-500">Boston, USA - Last active: 2 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'billing':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Billing Settings</h2>
            
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-800">Current Plan</h3>
                  <p className="text-sm text-gray-500">You are currently on the {user.plan} plan</p>
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm">
                  Upgrade
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-medium text-gray-800 mb-2">Payment Method</h3>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md mb-3">
                <CreditCard className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium text-sm">Visa ending in 4242</p>
                  <p className="text-xs text-gray-500">Expires 12/2027</p>
                </div>
              </div>
              <button className="text-sm text-indigo-600 hover:text-indigo-800">
                + Add new payment method
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-medium text-gray-800 mb-2">Billing History</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium text-sm">{user.plan} Plan - Monthly</p>
                    <p className="text-xs text-gray-500">Mar 1, 2025</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">$29.99</p>
                    <button className="text-xs text-indigo-600">View Receipt</button>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium text-sm">{user.plan} Plan - Monthly</p>
                    <p className="text-xs text-gray-500">Feb 1, 2025</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">$29.99</p>
                    <button className="text-xs text-indigo-600">View Receipt</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 h-screen p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <div className="flex items-center space-x-3">
                <img src={user.avatar} alt="User" className="rounded-full h-14 w-14" />
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.plan} Plan</p>
                </div>
              </div>
            </div>
            
            <nav className="p-2">
              <ul className="space-y-1">
                <li>
                  <button 
                    onClick={() => setActiveTab('general')}
                    className={`flex items-center w-full px-3 py-2 rounded-md text-sm ${activeTab === 'general' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <SettingsIcon className="h-4 w-4 mr-3" />
                    <span>General</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('account')}
                    className={`flex items-center w-full px-3 py-2 rounded-md text-sm ${activeTab === 'account' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <User className="h-4 w-4 mr-3" />
                    <span>Account</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('notifications')}
                    className={`flex items-center w-full px-3 py-2 rounded-md text-sm ${activeTab === 'notifications' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <Bell className="h-4 w-4 mr-3" />
                    <span>Notifications</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('security')}
                    className={`flex items-center w-full px-3 py-2 rounded-md text-sm ${activeTab === 'security' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <ShieldCheck className="h-4 w-4 mr-3" />
                    <span>Security</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('billing')}
                    className={`flex items-center w-full px-3 py-2 rounded-md text-sm ${activeTab === 'billing' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <CreditCard className="h-4 w-4 mr-3" />
                    <span>Billing</span>
                  </button>
                </li>
              </ul>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="flex items-center w-full px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50">
                  <LogOut className="h-4 w-4 mr-3" />
                  <span>Sign Out</span>
                </button>
              </div>
            </nav>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {renderTabContent()}
          </div>
        </div>
      </div>

   
    </div>
  );
}