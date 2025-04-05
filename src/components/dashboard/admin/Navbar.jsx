import React, { useState, useEffect } from 'react';
import { Search, Bell, MessageSquare, Calendar, Settings, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [user, setUser] = useState({
	first_name: 'User',
	last_name: '',
	profile_pic: 'https://via.placeholder.com/40',
  });

  useEffect(() => {
	const storedUser = JSON.parse(localStorage.getItem('doctorData'));
	if (storedUser) {
	  setUser({
		first_name: storedUser.first_name || 'User',
		last_name: storedUser.last_name || '',
		profile_pic: storedUser.profile_pic
		  ? `http://localhost:5000${storedUser.profile_pic}`
		  : 'https://via.placeholder.com/40',
	  });
	}
  }, []);

  const toggleDropdown = (dropdown) => {
	setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
	const handleClickOutside = () => setActiveDropdown(null);
	document.addEventListener('click', handleClickOutside);
	return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Prevent dropdown close when clicking inside dropdown
  const handleDropdownClick = (e) => {
	e.stopPropagation();
  };

  // Prevent dropdown toggle when clicking inside dropdown button
  const handleButtonClick = (e, dropdown) => {
	e.stopPropagation();
	toggleDropdown(dropdown);
  };

  return (
	<nav className="bg-white border-b border-gray-100 ">
	  <div className="max-w-7xl mx-auto px-4">
		<div className="flex justify-between h-14 items-center">
		  {/* Logo and brand */}
		  <div className="flex items-center">
			<Calendar className="h-5 w-5 text-indigo-600" />
			<span className="ml-2 text-lg font-semibold text-gray-800">Dashboard</span>
		  </div>

		  {/* Search bar */}
		  <div className="hidden md:flex flex-1 items-center justify-center px-6">
			<div className="relative w-full max-w-lg">
			  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
				<Search className="h-4 w-4 text-gray-400" />
			  </div>
			  <input
				className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all"
				type="search"
				placeholder="Search..."
			  />
			</div>
		  </div>

		  {/* Right side icons */}
		  <div className="flex items-center space-x-1">
			{/* Notifications */}
			<div className="relative">
			  <button
				onClick={(e) => handleButtonClick(e, 'notifications')}
				className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
			  >
				{user.notifications_count > 0 && (
				  <span className="absolute top-1 right-1 bg-red-500 text-white rounded-full  w-4 h-4 flex items-center justify-center text-xs">
					{user.notifications_count > 9 ? '9+' : user.notifications_count}
				  </span>
				)}
				<Bell className="h-5 w-5" />
			  </button>

			  {activeDropdown === 'notifications' && (
				<div 
				  className="absolute right-0 mt-2 w-72 rounded-lg shadow-lg bg-white  z-10 overflow-hidden"
				  onClick={handleDropdownClick}
				>
				  <div className="py-2 px-4 bg-gray-50 border-b border-gray-100">
					<h3 className="text-sm font-medium text-gray-700">Notifications</h3>
				  </div>
				  <div className="max-h-64 overflow-y-auto">
					<div className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
					  <p className="text-sm font-medium">New appointment request</p>
					  <p className="text-xs text-gray-500 mt-1">Jane Smith - 10:00 AM</p>
					</div>
					{/* Empty state */}
					{!user.notifications_count && (
					  <div className="p-4 text-center text-gray-500 text-sm">
						No notifications
					  </div>
					)}
				  </div>
				  {user.notifications_count > 0 && (
					<div className="py-2 px-4 bg-gray-50 border-t border-gray-100">
					  <a href="#" className="text-xs font-medium text-indigo-600 hover:text-indigo-500">
						View all
					  </a>
					</div>
				  )}
				</div>
			  )}
			</div>

			{/* Messages */}
			<div className="relative">
			  <button
				onClick={(e) => handleButtonClick(e, 'messages')}
				className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
			  >
				{user.messages_count > 0 && (
				  <span className="absolute top-1 right-1 bg-red-500 text-white rounded-full  w-4 h-4 flex items-center justify-center text-xs">
					{user.messages_count > 9 ? '9+' : user.messages_count}
				  </span>
				)}
				<MessageSquare className="h-5 w-5" />
			  </button>

			  {activeDropdown === 'messages' && (
				<div 
				  className="absolute right-0 mt-2 w-72 rounded-lg shadow-lg bg-white z-10 overflow-hidden"
				  onClick={handleDropdownClick}
				>
				  <div className="py-2 px-4 bg-gray-50 border-b border-gray-100">
					<h3 className="text-sm font-medium text-gray-700">Messages</h3>
				  </div>
				  <div className="max-h-64 overflow-y-auto">
					<div className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
					  <p className="text-sm font-medium">Dr. Sarah Johnson</p>
					  <p className="text-xs text-gray-500 mt-1">Can we reschedule?</p>
					</div>
					{/* Empty state */}
					{!user.messages_count && (
					  <div className="p-4 text-center text-gray-500 text-sm">
						No messages
					  </div>
					)}
				  </div>
				  {user.messages_count > 0 && (
					<div className="py-2 px-4 bg-gray-50 border-t border-gray-100">
					  <a href="#" className="text-xs font-medium text-indigo-600 hover:text-indigo-500">
						View all
					  </a>
					</div>
				  )}
				</div>
			  )}
			</div>

			{/* Profile avatar only */}
			<div className="relative ml-2">
			  <button 
				onClick={(e) => handleButtonClick(e, 'profile')} 
				className="focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full"
			  >
				<img
				  className="h-8 w-8 rounded-full object-cover ring-2 ring-gray-100"
				  src={user.profile_pic}
				  alt="Profile"
				/>
			  </button>

			  {activeDropdown === 'profile' && (
				<div 
				  className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white  z-10 overflow-hidden"
				  onClick={handleDropdownClick}
				>
				  {/* User info */}
				  <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
					<p className="text-sm font-medium text-gray-900">{user.first_name} {user.last_name}</p>
				  </div>
				  
				  <div className="py-1">
					<a href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
					  <User className="mr-3 h-4 w-4 text-gray-400" />
					  Your Profile
					</a>
					<a href="/dashboard/appointments" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
					  <Calendar className="mr-3 h-4 w-4 text-gray-400" />
					  Appointments
					</a>
					<a href="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
					  <Settings className="mr-3 h-4 w-4 text-gray-400" />
					  Settings
					</a>
					<div className="border-t border-gray-100"></div>
					<a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
					  <LogOut className="mr-3 h-4 w-4 text-gray-400" />
					  Sign out
					</a>
				  </div>
				</div>
			  )}
			</div>
		  </div>
		</div>
	  </div>
	</nav>
  );
};

export default Navbar;