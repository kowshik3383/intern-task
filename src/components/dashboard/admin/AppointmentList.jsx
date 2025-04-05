import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Search, 
  User, 
  Calendar, 
  Phone, 
  MapPin, 
  AlertCircle, 
  Filter, 
  MoreVertical 
} from "lucide-react";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/get-appointments")
      .then((response) => {
        setAppointments(response.data);
        setFilteredAppointments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response?.data?.message || "Error fetching data");
        setLoading(false);
      });
  }, []);

  // Search functionality 
  useEffect(() => {
    const results = appointments.filter(appointment =>
      Object.values(appointment).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredAppointments(results);
  }, [searchTerm, appointments]);

  // Detailed view modal
  const AppointmentDetailModal = ({ appointment, onClose }) => {
    if (!appointment) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
          <h2 className="text-2xl font-bold mb-6 text-blue-600">Appointment Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-gray-600">Patient Name</p>
              <p>{appointment.first_name} {appointment.last_name}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Date & Time</p>
              <p>{new Date(appointment.appointment_date).toLocaleString()}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Mobile</p>
              <p>{appointment.mobile}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Address</p>
              <p>{appointment.address}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Medical Complication</p>
              <p>{appointment.medical_complication || 'None'}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Special Notes</p>
              <p>{appointment.special_notes || 'No additional notes'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-600 border-r-4 border-blue-400 mx-auto mb-6"></div>
        <p className="text-2xl text-blue-800 font-semibold">Loading appointments...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-md">
        <h2 className="text-3xl text-red-600 font-bold mb-6">Error Loading Appointments</h2>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      {selectedAppointment && (
        <AppointmentDetailModal 
          appointment={selectedAppointment} 
          onClose={() => setSelectedAppointment(null)} 
        />
      )}
      
      <div className="container mx-auto max-w-7xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-6 md:p-10 flex justify-between items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                Appointment Management
              </h1>
              <p className="text-blue-100 text-lg">
                Total Appointments: {filteredAppointments.length}
              </p>
            </div>
            
            {/* Search Input */}
            <div className="relative w-full max-w-md">
              <input 
                type="text" 
                placeholder="Search appointments..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white/20 text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
            </div>
          </div>

          {/* Appointments Table */}
          <div className="p-6 md:p-10 overflow-x-auto">
            <table className="w-full border-collapse rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-blue-50 text-blue-800">
                  <th className="px-4 py-3 text-left">Patient</th>
                  <th className="px-4 py-3 text-left">Appointment Details</th>
                  <th className="px-4 py-3 text-left">Contact</th>
                  <th className="px-4 py-3 text-left">Medical Info</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
                    <tr 
                      key={appointment.id} 
                      className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-3">
                          <User className="text-blue-500 w-6 h-6" />
                          <div>
                            <p className="font-semibold">{appointment.first_name} {appointment.last_name}</p>
                            <p className="text-sm text-gray-500">{appointment.occupation}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <Calendar className="text-green-500 w-5 h-5" />
                          <span>{new Date(appointment.appointment_date).toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-gray-500">{appointment.details}</p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <Phone className="text-blue-500 w-5 h-5" />
                          <span>{appointment.mobile}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="text-purple-500 w-5 h-5" />
                          <span className="text-sm text-gray-500">{appointment.address}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="text-red-500 w-5 h-5" />
                          <span>{appointment.medical_complication || 'No complications'}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <button 
                          onClick={() => setSelectedAppointment(appointment)}
                          className="text-blue-500 hover:text-blue-700 transition-colors"
                        >
                          <MoreVertical />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-500">
                      No appointments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentList;