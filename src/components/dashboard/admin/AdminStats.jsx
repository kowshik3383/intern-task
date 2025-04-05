import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  UsersIcon, 
  CalendarIcon, 
  FileQuestionIcon, 
  ClipboardListIcon 
} from 'lucide-react';

const AdminStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/admin/stats")
      .then(response => {
        setStats(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4  border-r-4 border-blue-400 mx-auto mb-6"></div>
        <p className="text-2xl text-blue-800 font-semibold">Loading dashboard...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-md">
        <h2 className="text-3xl text-red-600 font-bold mb-6">Dashboard Error</h2>
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

  // Prepare data for chart
  const chartData = [
    { name: 'Appointments', count: stats.appointment_count },
    { name: 'Users', count: stats.users_count },
    { name: 'Consultations', count: stats.consultation_count },
    { name: 'Support Tickets', count: stats.support_count }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-1">
      <div className="container mx-auto max-w-7xl">
        <div className="bg-white  shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-6 md:p-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-4">
              Admin Dashboard
            </h1>
            <p className="text-center text-blue-100 text-lg md:text-xl max-w-2xl mx-auto">
              Comprehensive overview of your platform's key metrics and performance
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6 md:p-10">
            <StatCard 
              title="Appointments" 
              count={stats.appointment_count} 
              color="from-blue-500 to-blue-600" 
              icon={<CalendarIcon className="w-10 h-10" />} 
            />
            <StatCard 
              title="Users" 
              count={stats.users_count} 
              color="from-green-500 to-green-600" 
              icon={<UsersIcon className="w-10 h-10" />} 
            />
            <StatCard 
              title="Consultations" 
              count={stats.consultation_count} 
              color="from-purple-500 to-purple-600" 
              icon={<ClipboardListIcon className="w-10 h-10" />} 
            />
            <StatCard 
              title="Support Tickets" 
              count={stats.support_count} 
              color="from-red-500 to-red-600" 
              icon={<FileQuestionIcon className="w-10 h-10" />} 
            />
          </div>

          {/* Chart Section */}
          <div className="bg-white p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
              Statistical Overview
            </h2>
            <div className="bg-gray-50 rounded-2xl p-4 md:p-8 shadow-lg">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    vertical={false} 
                    stroke="#e0e0e0" 
                  />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    className="text-gray-600" 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    className="text-gray-600" 
                  />
                  <Tooltip 
                    cursor={{fill: 'rgba(0,0,0,0.05)'}} 
                    contentStyle={{
                      borderRadius: '10px', 
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      backgroundColor: 'white'
                    }}
                  />
                  <Legend 
                    verticalAlign="top" 
                    height={36} 
                    iconType="circle" 
                  />
                  <Bar 
                    dataKey="count" 
                    fill="#3B82F6" 
                    barSize={40} 
                    radius={[10, 10, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, count, color, icon }) => {
  return (
    <div className={`bg-gradient-to-br ${color} text-white p-6 rounded-2xl shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-3 opacity-80">{title}</h2>
          <p className="text-4xl font-bold">{count}</p>
        </div>
        <div className="opacity-70">{icon}</div>
      </div>
      <div className="mt-4 border-t border-white/20 pt-2 text-sm opacity-70">
        Total count for {title.toLowerCase()}
      </div>
    </div>
  );
};

export default AdminStats;