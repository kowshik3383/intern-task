import { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, Stethoscope, ClipboardList, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Appoint from "./Appoint";

const AppointmentsDashboard = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  const [stats, setStats] = useState({
    appointment_count: 0,
    checkup_count: 0,
    followup_count: 0,
    consultation_count: 0,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id) {
      setUserId(user.id);
      fetchStats(user.id);
    }
  }, []);

  const fetchStats = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/appointments/stats/${id}`);
      if (response.data) {
        setStats({
          appointment_count: response.data.appointment_count || 0,
          checkup_count: response.data.checkup_count || 0,
          followup_count: response.data.checkup_count || 0,
          consultation_count: response.data.consultation_count || 0,
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  // Define routes for each card
  const statItems = [
    { label: "Appointments", count: stats.appointment_count, subtext: "Upcoming Appointments", icon: Calendar, route: "/dashboard/appointments" },
    { label: "Checkups", count: stats.checkup_count, subtext: "Scheduled Checkups", icon: Stethoscope, route: "/checkups" },
    { label: "Follow-ups", count: stats.followup_count, subtext: "Pending Follow-ups", icon: Calendar, route: "/followups" },
    { label: "Consultations", count: stats.consultation_count, subtext: "New Consultations", icon: ClipboardList, route: "/consultations" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        {statItems.map((item, index) => (
          <div 
            key={index} 
            className="flex flex-col justify-between p-5 bg-white shadow-lg rounded-lg border border-gray-200 hover:scale-105 cursor-pointer transition-transform duration-200"
            onClick={() => navigate(item.route)} // 👈 Make it clickable
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <item.icon size={20} className="text-gray-800" />
                <h3 className="text-lg font-semibold">{item.label}</h3>
              </div>
              <ArrowRight size={18} className="text-gray-500" />
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold">{item.count}</p>
              <p className="text-sm text-gray-500">{item.subtext}</p>
            </div>
          </div>
        ))}
      </div>
      <Appoint />
    </div>
  );
};

export default AppointmentsDashboard;
