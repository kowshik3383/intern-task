import React, { useState, useEffect } from "react";
import { 
  User, Camera, Mail, Phone, Home, Briefcase, Building, Hospital, 
  Key, Save, Loader, X, Check, AlertCircle, ChevronRight, 
  Shield, MapPin, BookOpen, Bell, Settings, UserCheck, Calendar
} from "lucide-react";
import axios from "axios";

const EditProfile = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    mobile: "",
    phone: "",
    nhs_number: "",
    address: "",
    doctor_role: "",
    department: "",
    hospital: "",
    password: "",
    profile_pic: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/get-user/${userId}`);
        setUserData(response.data);
        setFormData({ ...response.data, password: "" });
      } catch (error) {
        console.error("Error fetching profile:", error);
        setErrorMessage("Failed to load profile data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  const handleChange = (e) => {
    if (e.target.name === "profile_pic") {
      setFormData({ ...formData, profile_pic: e.target.files[0] });
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setSuccessMessage("");
    setErrorMessage("");

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/edit-profile/${userId}`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      
      setUserData(formData);
      setSuccessMessage(response.data.message || "Profile updated successfully!");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage("Failed to update profile. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };



  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
              <Loader size={32} className="text-blue-600 animate-spin" />
            </div>
            <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            </div>
          </div>
          <p className="text-lg font-medium text-gray-800">Loading Profile</p>
          <p className="text-sm text-gray-500 mt-1">Please wait while we fetch your data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Notifications */}
      {successMessage && (
        <div className="fixed top-4 right-4 z-50 flex items-center bg-green-50 text-green-800 px-4 py-3 rounded-lg shadow-lg border-l-4 border-green-500 animate-fade-in-down max-w-md">
          <Check size={20} className="text-green-500 mr-3 flex-shrink-0" />
          <p>{successMessage}</p>
          <button onClick={() => setSuccessMessage("")} className="ml-auto">
            <X size={18} className="text-green-500 hover:text-green-700" />
          </button>
        </div>
      )}
      
      {errorMessage && (
        <div className="fixed top-4 right-4 z-50 flex items-center bg-red-50 text-red-800 px-4 py-3 rounded-lg shadow-lg border-l-4 border-red-500 animate-fade-in-down max-w-md">
          <AlertCircle size={20} className="text-red-500 mr-3 flex-shrink-0" />
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage("")} className="ml-auto">
            <X size={18} className="text-red-500 hover:text-red-700" />
          </button>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
       

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:grid md:grid-cols-12">
            {/* Profile Header */}
            <div className="col-span-12 bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="relative group mb-4 sm:mb-0">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-lg group-hover:border-white/60 transition duration-300">
                    <div className="w-full h-full  absolute"></div>
                    <img
                      src={previewImage || `http://localhost:5000${userData.profile_pic}`}
                      alt="Profile"
                      className="w-full h-full object-cover relative z-10"
                    />
                  </div>
                  <label className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-lg cursor-pointer group-hover:bg-blue-50 transition duration-300 z-20">
                    <Camera size={20} className="text-blue-600" />
                    <input 
                      type="file" 
                      name="profile_pic" 
                      onChange={handleChange} 
                      className="hidden" 
                      accept="image/*"
                    />
                  </label>
                </div>
                <div className="ml-0 sm:ml-8 text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-white">
                    {userData.first_name} {userData.last_name}
                  </h2>
                  <div className="flex flex-col sm:flex-row items-center mt-1">
                    <span className="text-blue-100 flex items-center">
                      <Briefcase size={16} className="mr-1" />
                      <span>{userData.doctor_role || "Medical Professional"}</span>
                    </span>
                    <span className="hidden sm:block text-blue-200 mx-2">•</span>
                    <span className="text-blue-100 flex items-center">
                      <Building size={16} className="mr-1" />
                      <span>{userData.department || "Department"}</span>
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
                    <span className="bg-white/10 text-white text-xs px-3 py-1 rounded-full flex items-center">
                      <Hospital size={12} className="mr-1" />
                      {userData.hospital || "Hospital"}
                    </span>
                    <span className="bg-white/10 text-white text-xs px-3 py-1 rounded-full flex items-center">
                      <Shield size={12} className="mr-1" />
                      NHS #{userData.nhs_number || "Not Set"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="col-span-12 border-b border-gray-200">
              <nav className="flex overflow-x-auto">
                <button 
                  onClick={() => handleTabClick("personal")}
                  className={`flex items-center px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition duration-200 focus:outline-none
                    ${activeTab === "personal" 
                      ? "border-blue-500 text-blue-600" 
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
                >
                  <User size={18} className="mr-2" />
                  Personal Information
                </button>
                <button 
                  onClick={() => handleTabClick("professional")}
                  className={`flex items-center px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition duration-200 focus:outline-none
                    ${activeTab === "professional" 
                      ? "border-blue-500 text-blue-600" 
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
                >
                  <BookOpen size={18} className="mr-2" />
                  Professional Details
                </button>
                <button 
                  onClick={() => handleTabClick("contact")}
                  className={`flex items-center px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition duration-200 focus:outline-none
                    ${activeTab === "contact" 
                      ? "border-blue-500 text-blue-600" 
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
                >
                  <Phone size={18} className="mr-2" />
                  Contact Information
                </button>
                <button 
                  onClick={() => handleTabClick("security")}
                  className={`flex items-center px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition duration-200 focus:outline-none
                    ${activeTab === "security" 
                      ? "border-blue-500 text-blue-600" 
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
                >
                  <Key size={18} className="mr-2" />
                  Security Settings
                </button>
              </nav>
            </div>

            {/* Main Content */}
            <div className="col-span-12 p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information Tab */}
                {activeTab === "personal" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                      <h2 className="text-xl font-bold text-gray-800 flex items-center">
                        <UserCheck size={22} className="mr-2 text-blue-600" />
                        Personal Information
                      </h2>
                      <span className="text-sm text-gray-500">Basic profile details</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User size={16} className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                            placeholder="Your first name"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User size={16} className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                            placeholder="Your last name"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Gender
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <select
                            name="gender"
                            value={formData.gender || ""}
                            onChange={handleChange}
                            className="block w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer_not_to_say">Prefer not to say</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <ChevronRight size={16} className="text-gray-400" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          NHS Number
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Shield size={16} className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="nhs_number"
                            value={formData.nhs_number || ""}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                            placeholder="Your NHS number"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <Bell size={18} className="text-blue-500" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-blue-800">Profile Visibility</h3>
                          <div className="mt-2 text-sm text-blue-700">
                            <p>Your personal information is visible to hospital staff and administration only.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Professional Tab */}
                {activeTab === "professional" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                      <h2 className="text-xl font-bold text-gray-800 flex items-center">
                        <Briefcase size={22} className="mr-2 text-blue-600" />
                        Professional Details
                      </h2>
                      <span className="text-sm text-gray-500">Your medical career information</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Doctor Role
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Briefcase size={16} className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="doctor_role"
                            value={formData.doctor_role || ""}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                            placeholder="e.g. Cardiologist, Surgeon"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Department
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Building size={16} className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="department"
                            value={formData.department || ""}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                            placeholder="e.g. Cardiology, Surgery"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Hospital
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Hospital size={16} className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="hospital"
                          value={formData.hospital || ""}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                          placeholder="Your hospital name"
                        />
                      </div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <Calendar size={18} className="text-blue-500" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-blue-800">Your Schedule</h3>
                          <div className="mt-2 text-sm text-blue-700">
                            <p>This information will be used to display your availability in the hospital scheduling system.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact Info Tab */}
                {activeTab === "contact" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                      <h2 className="text-xl font-bold text-gray-800 flex items-center">
                        <Phone size={22} className="mr-2 text-blue-600" />
                        Contact Information
                      </h2>
                      <span className="text-sm text-gray-500">How others can reach you</span>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail size={16} className="text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                          placeholder="Your email address"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mobile Number
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone size={16} className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="mobile"
                            value={formData.mobile || ""}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                            placeholder="Your mobile number"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone size={16} className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="phone"
                            value={formData.phone || ""}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                            placeholder="Your office/landline"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                          <MapPin size={16} className="text-gray-400" />
                        </div>
                        <textarea
                          name="address"
                          value={formData.address || ""}
                          onChange={handleChange}
                          rows="3"
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                          placeholder="Your address"
                        />
                      </div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <Shield size={18} className="text-blue-500" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-blue-800">Contact Privacy</h3>
                          <div className="mt-2 text-sm text-blue-700">
                            <p>Your contact information is protected and only shared with authorized personnel.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === "security" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                      <h2 className="text-xl font-bold text-gray-800 flex items-center">
                        <Key size={22} className="mr-2 text-blue-600" />
                        Security Settings
                      </h2>
                      <span className="text-sm text-gray-500">Manage your account security</span>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Key size={16} className="text-gray-400" />
                        </div>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                          placeholder="Leave blank to keep current password"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Password should be at least 8 characters and include a mix of letters, numbers, and symbols.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <AlertCircle size={18} className="text-yellow-600" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">Security Reminder</h3>
                          <div className="mt-2 text-sm text-yellow-700">
                            <p>For security reasons, please use a strong, unique password that you don't use elsewhere.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
                      <div className="p-4 flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-800">Two-Factor Authentication</h3>
                          <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 ml-4">
                         <input type="checkbox" id="toggle" className="sr-only peer" />
                          <label htmlFor="toggle" className="flex items-center w-12 h-6 rounded-full bg-gray-300 peer-checked:bg-blue-500 cursor-pointer transition-colors duration-300 ease-in-out">
                            <div className="w-4 h-4 bg-white rounded-full shadow-md transform translate-x-1 peer-checked:translate-x-7 transition duration-300 ease-in-out"></div>
                          </label>
                        </div>
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-800">Account Activity Alerts</h3>
                          <p className="text-sm text-gray-500 mt-1">Get notified of unusual login attempts</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 ml-4">
                          <input type="checkbox" id="toggle2" className="sr-only peer" defaultChecked />
                          <label htmlFor="toggle2" className="flex items-center w-12 h-6 rounded-full bg-gray-300 peer-checked:bg-blue-500 cursor-pointer transition-colors duration-300 ease-in-out">
                            <div className="w-4 h-4 bg-white rounded-full shadow-md transform translate-x-1 peer-checked:translate-x-7 transition duration-300 ease-in-out"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <p className="text-sm text-gray-500 mb-4 md:mb-0">
                      Last updated: {new Date().toLocaleDateString()}
                    </p>
                    <div className="flex items-center space-x-4">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() => window.history.back()}
                      >
                        <X size={16} className="mr-2" />
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={updating}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150 disabled:opacity-70"
                      >
                        {updating ? (
                          <>
                            <Loader size={16} className="animate-spin mr-2" />
                            Updating Profile...
                          </>
                        ) : (
                          <>
                            <Save size={16} className="mr-2" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Footer with additional actions */}
        <div className="mt-8 flex justify-end">
          <div className="flex items-center space-x-2 text-gray-500 text-sm">
            <Settings size={14} />
            <span>Need more account settings?</span>
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
              Visit account dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;