import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  Hospital, 
  UserCircle2, 
  Filter, 
  Search, 
  Trash2 
} from 'lucide-react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/get-user")
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Search and filter functionality
  useEffect(() => {
    const results = users.filter(user => 
      Object.values(user).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  // Function to delete a user
  const handleDelete = (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    axios.delete(`http://localhost:5000/delete-user/${userId}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== userId));
      })
      .catch(error => {
        console.error("Error deleting user:", error);
      });
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
      <p className="text-2xl text-blue-800 font-semibold">Loading users...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-md">
        <h2 className="text-3xl text-red-600 font-bold mb-6">Error Loading Users</h2>
        <p className="text-gray-700 text-lg mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-1">
      <div className="container  max-w-7xl">
        <div className="bg-white  overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-6 md:p-10 flex justify-between items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                User Management
              </h1>
              <p className="text-blue-100 text-lg">
                Total Users: {filteredUsers.length}
              </p>
            </div>
            
            {/* Search Input */}
            <div className="relative w-full max-w-md">
              <input 
                type="text" 
                placeholder="Search users..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white/20 text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
            </div>
          </div>

          {/* User Table */}
          <div className="p-6 md:p-10">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-blue-50 text-blue-800">
                    <th className="px-4 py-3 text-left">Profile</th>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Contact</th>
                    <th className="px-4 py-3 text-left">Professional Details</th>
                    <th className="px-4 py-3 text-left">Location</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr 
                      key={user.id} 
                      className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <img 
                          src={`http://localhost:5000${user.profile_pic}`} 
                          alt="Profile" 
                          className="w-16 h-16 rounded-full object-cover border-2 border-blue-200" 
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-gray-800">
                          {user.first_name} {user.last_name}
                        </div>
                        <div className="text-sm text-gray-500">{user.gender}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-blue-500" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-green-500" />
                          <span>{user.mobile}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <UserCircle2 className="w-4 h-4 text-purple-500" />
                          <span>{user.doctor_role}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Hospital className="w-4 h-4 text-indigo-500" />
                          <span>{user.department}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-red-500" />
                          <span>{user.address}</span>
                        </div>
                        <div className="text-sm text-gray-500">{user.hospital}</div>
                      </td>
                      <td className="px-4 py-3">
                        <button 
                          onClick={() => handleDelete(user.id)}
                          className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
