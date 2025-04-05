import { useState, useEffect } from "react";
import { 
  Calendar, Stethoscope, ClipboardList, ArrowRight, X, 
  Calendar as CalendarIcon, ChevronRight, Filter, User, 
  Phone, MapPin, FileText, Clock, AlertCircle, Check, Loader
} from "lucide-react";

const Appoint = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [filterLabel, setFilterLabel] = useState("Today");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id) {
      setUserId(user.id);
      fetchAppointments(getTodayDate(), getTodayDate());
    } else {
      setError("User not found. Please log in.");
    }
  }, []);

  const getTodayDate = () => new Date().toISOString().split("T")[0];
  
  const getFormattedDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getAppointmentTime = (dateString) => {
    if (!dateString) return "No time specified";
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date";
    
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const fetchAppointments = async (start, end) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `http://localhost:5000/appointments/${userId}?start_date=${start}&end_date=${end}`
      );
      
      if (!response.ok) {
        throw new Error("Server responded with an error");
      }
      
      const data = await response.json();
      setAppointments(data);
      setSelectedAppointment(null);
    } catch (err) {
      setError("Failed to fetch appointments. Please try again later.");
      console.error("Error fetching appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchWithDates = () => {
    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }
    
    // Create date objects for comparison
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start > end) {
      setError("Start date cannot be after end date.");
      return;
    }
    
    setModalOpen(false);
    fetchAppointments(startDate, endDate);
    
    // Set appropriate filter label
    if (startDate === endDate) {
      if (startDate === getTodayDate()) {
        setFilterLabel("Today");
      } else {
        setFilterLabel(getFormattedDate(startDate));
      }
    } else {
      setFilterLabel(`${startDate} - ${endDate}`);
    }
  };
  
  const quickDateFilters = [
    { label: "Today", handler: () => {
      const today = getTodayDate();
      setStartDate(today);
      setEndDate(today);
      fetchAppointments(today, today);
      setFilterLabel("Today");
    }},
    { label: "This Week", handler: () => {
      const today = new Date();
      const start = new Date(today);
      start.setDate(today.getDate() - today.getDay());
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      
      const startStr = start.toISOString().split("T")[0];
      const endStr = end.toISOString().split("T")[0];
      
      setStartDate(startStr);
      setEndDate(endStr);
      fetchAppointments(startStr, endStr);
      setFilterLabel("This Week");
    }},
    { label: "This Month", handler: () => {
      const today = new Date();
      const start = new Date(today.getFullYear(), today.getMonth(), 1);
      const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      
      const startStr = start.toISOString().split("T")[0];
      const endStr = end.toISOString().split("T")[0];
      
      setStartDate(startStr);
      setEndDate(endStr);
      fetchAppointments(startStr, endStr);
      setFilterLabel("This Month");
    }}
  ];

  const getStatusClass = (appointment) => {
    // In a real application, you'd use actual status data
    // This is just for demonstration
    const appointmentDate = new Date(appointment.appointment_date);
    const today = new Date();
    
    if (appointmentDate < today) {
      return "bg-gray-100 border-gray-300";
    } else if (appointmentDate.toDateString() === today.toDateString()) {
      return "bg-blue-50 border-blue-300";
    } else {
      return "bg-green-50 border-green-300";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-xl border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center">
          <Calendar className="h-6 w-6 text-blue-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <button 
              onClick={() => setModalOpen(true)}
              className="flex items-center px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
            >
              <Filter className="h-4 w-4 mr-2" />
              <span>{filterLabel}</span>
            </button>
          </div>
          
          <div className="flex gap-2">
            {quickDateFilters.map((filter) => (
              <button 
                key={filter.label}
                onClick={filter.handler}
                className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <p>{error}</p>
        </div>
      )}

      {/* Main content */}
      <div className="flex gap-6">
        {/* Appointments List */}
        <div className="w-5/12">
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
              <ClipboardList className="h-5 w-5 mr-2 text-blue-600" />
              Appointment List
            </h2>
            <p className="text-sm text-gray-500">{appointments.length} appointments found</p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader className="h-8 w-8 text-blue-500 animate-spin mb-4" />
              <p className="text-gray-500">Loading appointments...</p>
            </div>
          ) : appointments.length > 0 ? (
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {appointments.map((appt) => (
                <div
                  key={appt.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border-l-4 hover:shadow-md ${
                    selectedAppointment?.id === appt.id 
                      ? "border-blue-600 shadow-md" 
                      : `${getStatusClass(appt)}`
                  }`}
                  onClick={() => setSelectedAppointment(appt)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {appt.first_name} {appt.last_name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{appt.occupation}</p>
                    </div>
                    <ChevronRight className={`h-5 w-5 transition-colors ${
                      selectedAppointment?.id === appt.id ? "text-blue-600" : "text-gray-400"
                    }`} />
                  </div>
                  
                  <div className="mt-2 flex items-center">
                    <Clock className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-500">
                      {getFormattedDate(appt.appointment_date)} at {getAppointmentTime(appt.appointment_date)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <CalendarIcon className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">No appointments found</p>
              <p className="text-sm text-gray-400 mt-1">Try changing your date filter</p>
            </div>
          )}
        </div>

        {/* Appointment Details */}
        <div className="w-7/12">
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-1 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Appointment Details
            </h2>
            <p className="text-sm text-gray-500">
              {selectedAppointment ? "Patient information and appointment notes" : "Select an appointment to view details"}
            </p>
          </div>

          {selectedAppointment ? (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
                <h3 className="text-xl font-bold">{selectedAppointment.first_name} {selectedAppointment.last_name}</h3>
                <p className="opacity-90 mt-1">{selectedAppointment.occupation}</p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <div className="bg-blue-50 p-2 rounded-lg mr-3">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Appointment Date</p>
                      <p className="font-medium text-gray-800">{getFormattedDate(selectedAppointment.appointment_date)}</p>
                      <p className="text-sm text-gray-600">{getAppointmentTime(selectedAppointment.appointment_date)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-violet-50 p-2 rounded-lg mr-3">
                      <User className="h-5 w-5 text-violet-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Patient ID</p>
                      <p className="font-medium text-gray-800">#{selectedAppointment.id}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-amber-50 p-2 rounded-lg mr-3">
                      <Phone className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Contact</p>
                      <p className="font-medium text-gray-800">
                        {selectedAppointment.mobile || "Not provided"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-emerald-50 p-2 rounded-lg mr-3">
                      <MapPin className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium text-gray-800">
                        {selectedAppointment.address || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 border-t border-gray-100 pt-4">
                  <div className="mb-2 flex items-center">
                    <FileText className="h-4 w-4 text-gray-500 mr-2" />
                    <h4 className="font-medium text-gray-700">Special Notes</h4>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-gray-600">
                      {selectedAppointment.special_notes || "No additional notes provided for this appointment."}
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end gap-3">
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center">
                    <Check className="h-4 w-4 mr-2" />
                    Mark as Complete
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <ArrowRight className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">No appointment selected</p>
              <p className="text-sm text-gray-400 mt-1">Select an appointment from the list to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Date Picker Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <Filter className="h-4 w-4 mr-2 text-blue-600" />
                Filter Appointments
              </h3>
              <button 
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <div className="relative">
                    <input 
                      type="date" 
                      value={startDate} 
                      onChange={(e) => setStartDate(e.target.value)} 
                      className="p-2 pl-10 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <Calendar className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <div className="relative">
                    <input 
                      type="date" 
                      value={endDate} 
                      onChange={(e) => setEndDate(e.target.value)} 
                      className="p-2 pl-10 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <Calendar className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                  </div>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm text-gray-500 mb-2">Quick Filters:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickDateFilters.map((filter) => (
                      <button 
                        key={filter.label}
                        onClick={() => {
                          filter.handler();
                          setModalOpen(false);
                        }}
                        className="px-3 py-1.5 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md transition-colors"
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button 
                  onClick={() => setModalOpen(false)} 
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleFetchWithDates} 
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appoint;