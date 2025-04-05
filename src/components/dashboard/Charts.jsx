import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { Activity, RefreshCw } from "lucide-react";

const Charts = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    setLoading(true);
    try {
      // Use your API endpoint here
      const res = await fetch(`http://localhost:5000/dashboard/stats/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      setStats(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching stats:", error);
      setError("Could not load your statistics. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchStats();
  }, [userId]);

  // Sample data for when we don't have stats yet
  const data = stats
    ? [
        { name: "Appointments", count: stats.appointment_count, fill: "#38bdf8" },
        { name: "Checkups", count: stats.checkup_count, fill: "#6366f1" },
        { name: "Consultations", count: stats.consultation_count, fill: "#8b5cf6" },
      ]
    : [];

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-md rounded-lg">
          <p className="font-semibold text-gray-800">{`${label}`}</p>
          <p className="text-lg font-bold text-blue-600">{`${payload[0].value} total`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">Medical Activity Summary</h2>
          </div>
          
          <button 
            onClick={fetchStats}
            disabled={loading}
            className="flex items-center px-3 py-1.5 text-sm font-medium rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200"
          >
            <RefreshCw className={`h-4 w-4 mr-1.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
        
        {error ? (
          <div className="py-12 text-center text-red-500">
            <p>{error}</p>
          </div>
        ) : loading ? (
          <div className="py-16 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500">Loading your statistics...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            <p>No data available</p>
          </div>
        ) : (
          <div className="relative">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                barSize={60}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#4b5563' }} 
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fill: '#4b5563' }} 
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={false}
                  width={40}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: "20px" }} />
                <Bar 
                  dataKey="count" 
                  radius={[8, 8, 0, 0]} 
                  animationDuration={1500}
                  animationEasing="ease-out"
                  label={{ 
                    position: 'top', 
                    fill: '#4b5563',
                    fontSize: 12,
                    fontWeight: 600
                  }}
                  fill="#3b82f6"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Charts;