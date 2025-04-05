import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Calendar, 
  Clipboard, 
  Trash2, 
  User, 
  FileText, 
  Briefcase, 
  Phone, 
  MapPin, 
  AlertCircle, 
  Plus, 
  X, 
  Info,
  ClipboardList
} from "lucide-react";

const CheckupForm = () => {
  const [checkups, setCheckups] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    details: "",
    occupation: "",
    checkupDate: "",
    notes: "",
    address: "",
    mobile: "",
    complications: ""
  });
  const [selectedCheckup, setSelectedCheckup] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  useEffect(() => {
    if (userId) {
      fetchCheckups();
    }
  }, [userId]);

  const fetchCheckups = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/user/checkup/${userId}`);
      setCheckups(response.data);
    } catch (error) {
      console.error("Error fetching checkup records", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/user/checkup", { ...formData, userId });
      fetchCheckups();
      setFormData({
        firstName: "",
        lastName: "",
        details: "",
        occupation: "",
        checkupDate: "",
        notes: "",
        address: "",
        mobile: "",
        complications: ""
      });
    } catch (error) {
      console.error("Error adding checkup", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/checkup/${id}`);
      fetchCheckups();
      if (selectedCheckup && selectedCheckup.id === id) {
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error deleting checkup", error);
    }
  };

  const openModal = (checkup) => {
    setSelectedCheckup(checkup);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
            <ClipboardList className="mr-2 text-blue-600" size={28} />
            Medical Checkup Form
          </h2>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">First Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
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
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Details</label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <FileText size={18} className="text-gray-400" />
                </div>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="Checkup details"
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-24"
                  required
                />
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
                  value={formData.occupation}
                  onChange={handleChange}
                  placeholder="Occupation"
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Checkup Date</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={18} className="text-gray-400" />
                </div>
                <input
                  type="date"
                  name="checkupDate"
                  value={formData.checkupDate}
                  onChange={handleChange}
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
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
                  value={formData.mo78bile}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
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
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Complications</label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <AlertCircle size={18} className="text-gray-400" />
                </div>
                <textarea
                  name="complications"
                  value={formData.complications}
                  onChange={handleChange}
                  placeholder="Any medical complications"
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-20"
                />
              </div>
            </div>
            
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Notes</label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <Clipboard size={18} className="text-gray-400" />
                </div>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Additional notes"
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-20"
                />
              </div>
            </div>
            
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium transition flex items-center justify-center"
              >
                <Plus size={18} className="mr-2" />
                Add Checkup Record
              </button>
            </div>
          </form>
        </div>
        
        {/* Checkup Records Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
            <FileText className="mr-2 text-blue-600" size={28} />
            Checkup Records
          </h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading records...</p>
            </div>
          ) : checkups.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
              <FileText size={40} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500">No checkup records found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {checkups.map((checkup) => (
                <div 
                  key={checkup.id} 
                  className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
                  onClick={() => openModal(checkup)}
                >
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {checkup.first_name} {checkup.last_name}
                      </h3>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-500">
                        <Info size={16} />
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <Calendar size={16} className="mr-2 text-blue-500" />
                      {formatDate(checkup.checkup_date)}
                    </div>
                    
                    <p className="text-gray-600 line-clamp-2 mb-3">{checkup.details}</p>
                    
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-sm text-blue-600 font-medium">View details</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(checkup.id);
                        }}
                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Modal */}
      {showModal && selectedCheckup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10 rounded-t-xl">
              <h3 className="text-xl font-bold text-gray-800">
                {selectedCheckup.first_name} {selectedCheckup.last_name}'s Checkup Details
              </h3>
              <button 
                onClick={closeModal}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Date</h4>
                    <p className="mt-1 flex items-center text-gray-800">
                      <Calendar size={16} className="mr-2 text-blue-500" />
                      {formatDate(selectedCheckup.checkup_date)}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Occupation</h4>
                    <p className="mt-1 flex items-center text-gray-800">
                      <Briefcase size={16} className="mr-2 text-blue-500" />
                      {selectedCheckup.occupation || "Not specified"}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Contact</h4>
                    <p className="mt-1 flex items-center text-gray-800">
                      <Phone size={16} className="mr-2 text-blue-500" />
                      {selectedCheckup.mobile || "Not provided"}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Address</h4>
                    <p className="mt-1 flex items-start text-gray-800">
                      <MapPin size={16} className="mr-2 text-blue-500 mt-1 flex-shrink-0" />
                      <span>{selectedCheckup.address || "Not provided"}</span>
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Checkup Details</h4>
                    <p className="mt-1 text-gray-800">{selectedCheckup.details || "No details provided"}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Complications</h4>
                    <p className="mt-1 text-gray-800">{selectedCheckup.complications || "None recorded"}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Additional Notes</h4>
                    <p className="mt-1 text-gray-800">{selectedCheckup.notes || "No additional notes"}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button
                  onClick={closeModal}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg mr-2 transition"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDelete(selectedCheckup.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-ceznter transition"
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckupForm;