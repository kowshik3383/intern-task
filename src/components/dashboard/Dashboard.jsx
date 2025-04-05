import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, Stethoscope, ClipboardList, ArrowRight } from "lucide-react";
import Charts from "./Charts";

const Dashboard = () => {
  const [stats, setStats] = useState({
    appointment_count: 0,
    checkup_count: 0,
    followup_count: 0,
    consultation_count: 0,
  });

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/dashboard/stats/${userId}`)
        .then((response) => {
          if (response.data) {
            setStats({
              appointment_count: response.data.appointment_count || 0,
              checkup_count: response.data.checkup_count || 0,
              followup_count: response.data.followup_count || 0,
              consultation_count: response.data.consultation_count || 0,
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching stats:", error);
        });
    }
  }, [userId]);

  const statItems = [
    { label: "Patients", count: stats.appointment_count, subtext: "Upcoming Appointments", icon: Calendar, color: "text-black" },
    { label: "Appointments", count: stats.checkup_count, subtext: "Scheduled Checkups", icon: Stethoscope, color: "text-red-500" },
    { label: "Follow-ups", count: stats.followup_count, subtext: "Pending Follow-ups", icon: Calendar, color: "text-black" },
    { label: "Consultations", count: stats.consultation_count, subtext: "New Consultations", icon: ClipboardList, color: "text-red-500" },
  ];

  return (
<>
    <div className="max-w-6xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <div
          key={index}
          className="flex flex-col justify-between p-5 bg-white shadow-lg rounded-lg border border-gray-200 transition transform hover:scale-105"
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
          <div className="mt-4">
            
          </div>
        </div>
      ))}


    </div>
<Charts/></>
  );
};

export default Dashboard;
