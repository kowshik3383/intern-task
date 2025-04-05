import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, Clipboard, Edit, Trash2, ChevronDown, ChevronUp, Phone, MapPin, Briefcase, AlertCircle, User, FileText, Plus } from "lucide-react";

const Consultation = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user.id;
  const [appointments, setAppointments] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    firstname: "",
    lastname: "",
    details: "",
    occupation: "",
    consultation_date: "",
    special_notes: "",
    address: "",
    mobile: "",
    medical_complications: ""
  });

  // Fetch all appointments for the logged-in user
  useEffect(() => {
    if (user_id) {
      axios.get(`http://localhost:5000/api/user/patients/${user_id}`)
        .then((res) => setAppointments(res.data))
        .catch((err) => console.error(err));
    }
  }, [user_id]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create or update an appointment
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.id) {
      // Update existing appointment
      axios.put(`http://localhost:5000/api/user/patients/${formData.id}`, formData)
        .then(() => {
          setAppointments(appointments.map(app => app.id === formData.id ? formData : app));
          setFormData({ id: null, firstname: "", lastname: "", details: "", occupation: "", consultation_date: "", special_notes: "", address: "", mobile: "", medical_complications: "" });
        })
        .catch((err) => console.error(err));
    } else {
      // Create new appointment
      axios.post("http://localhost:5000/api/user/patients", { ...formData, user_id })
        .then((res) => {
          setAppointments([...appointments, { ...formData, id: res.data.id }]);
          setFormData({ id: null, firstname: "", lastname: "", details: "", occupation: "", consultation_date: "", special_notes: "", address: "", mobile: "", medical_complications: "" });
        })
        .catch((err) => console.error(err));
    }
  };

  // Edit an appointment (populate the form)
  const handleEdit = (appointment) => {
    setFormData(appointment);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete an appointment
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/user/patients/${id}`)
      .then(() => {
        setAppointments(appointments.filter(app => app.id !== id));
      })
      .catch((err) => console.error(err));
  };

  // Toggle expanded view
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
 <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
          <Clipboard className="mr-2" size={24} />
          Consultations
        </h2>
        
        {appointments.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">No consultations found</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {appointments.map((appointment) => (
              <li key={appointment.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="p-4 bg-gray-50 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <Calendar size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{appointment.firstname} {appointment.lastname}</h3>
                      <p className="text-gray-600">{formatDate(appointment.consultation_date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => toggleExpand(appointment.id)}
                      className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition"
                      aria-label="View details"
                    >
                      {expandedId === appointment.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    <button 
                      onClick={() => handleEdit(appointment)}
                      className="p-2 text-gray-500 hover:text-green-600 rounded-full hover:bg-green-50 transition"
                      aria-label="Edit"
                    >
                      <Edit size={20} />
                    </button>
                    <button 
                      onClick={() => handleDelete(appointment.id)}
                      className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50 transition"
                      aria-label="Delete"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                
                {expandedId === appointment.id && (
                  <div className="p-4 bg-white border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Consultation Details</h4>
                          <p className="mt-1">{appointment.details || "No details provided"}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Special Notes</h4>
                          <p className="mt-1">{appointment.special_notes || "No special notes"}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Medical Complications</h4>
                          <p className="mt-1">{appointment.medical_complications || "None"}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Contact Information</h4>
                          <div className="mt-1 space-y-2">
                            <p className="flex items-center">
                              <Phone size={16} className="mr-2 text-gray-400" />
                              {appointment.mobile}
                            </p>
                            <p className="flex items-center">
                              <MapPin size={16} className="mr-2 text-gray-400" />
                              {appointment.address}
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Occupation</h4>
                          <p className="mt-1 flex items-center">
                            <Briefcase size={16} className="mr-2 text-gray-400" />
                            {appointment.occupation || "Not specified"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">

        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
          {formData.id ? (
            <><Edit className="mr-2" size={24} /> Edit Consultation</>
          ) : (
            <><Plus className="mr-2" size={24} /> New Consultation</>
          )}
        </h2>
        
        {/* Appointment Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">First Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
                required
                className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Last Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
                required
                className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>
          
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Consultation Details</label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <FileText size={18} className="text-gray-400" />
              </div>
              <textarea
                name="details"
                placeholder="Detailed information about the consultation"
                value={formData.details}
                onChange={handleChange}
                required
                className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-24"
              ></textarea>
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Occupation</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="occupation"
                placeholder="Occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Consultation Date</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={18} className="text-gray-400" />
              </div>
              <input
                type="date"
                name="consultation_date"
                value={formData.consultation_date}
                onChange={handleChange}
                required
                className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Mobile</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone size={18} className="text-gray-400" />
              </div>
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>
          
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Medical Complications</label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <AlertCircle size={18} className="text-gray-400" />
              </div>
              <textarea
                name="medical_complications"
                placeholder="Any medical complications"
                value={formData.medical_complications}
                onChange={handleChange}
                className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-20"
              ></textarea>
            </div>
          </div>
          
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Special Notes</label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <Clipboard size={18} className="text-gray-400" />
              </div>
              <textarea
                name="special_notes"
                placeholder="Any special notes"
                value={formData.special_notes}
                onChange={handleChange}
                className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-20"
              ></textarea>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md font-medium transition flex items-center justify-center"
            >
              {formData.id ? (
                <>
                  <Edit className="mr-2" size={18} />
                  Update Consultation
                </>
              ) : (
                <>
                  <Plus className="mr-2" size={18} />
                  Create Consultation
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Appointment List */}
     
    </div>
  );
};

export default Consultation;