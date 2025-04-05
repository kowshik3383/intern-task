import React, { useState, useEffect } from "react";
import { User, Camera, Mail, Phone, Home, Briefcase, Building, Hospital, Key, Save, Loader } from "lucide-react";
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
	  } finally {
		setLoading(false);
	  }
	};

	if (userId) {
	  fetchUserProfile();
	}
  }, [userId]);

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
	  alert(response.data.message);
	} catch (error) {
	  console.error("Error updating profile:", error);
	  alert("Error updating profile");
	} finally {
	  setUpdating(false);
	}
  };

  if (loading) {
	return (
	  <div className="flex items-center justify-center h-screen">
		<div className="text-center">
		  <Loader className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4" />
		  <p className="text-gray-600">Loading profile data...</p>
		</div>
	  </div>
	);
  }

  return (
	<div className="max-w-4xl mx-auto mt-10 bg-white rounded-xl shadow-lg overflow-hidden">
	  <div className="md:flex">
		{/* Sidebar */}
		<div className="bg-gradient-to-b from-blue-500 to-blue-700 md:w-1/3 p-8">
		  <div className="flex flex-col items-center">
			<div className="relative group">
			  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
				<img
				  src={previewImage || `http://localhost:5000${userData.profile_pic}`}
				  alt="Profile"
				  className="w-full h-full object-cover"
				/>
			  </div>
			  <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg cursor-pointer group-hover:bg-blue-100 transition">
				<Camera size={18} className="text-blue-600" />
				<input 
				  type="file" 
				  name="profile_pic" 
				  onChange={handleChange} 
				  className="hidden" 
				  accept="image/*"
				/>
			  </label>
			</div>
			<h2 className="mt-4 text-xl font-bold text-white">
			  {userData.first_name} {userData.last_name}
			</h2>
			<p className="text-blue-100">{userData.doctor_role}</p>
			<p className="text-blue-100 text-sm">{userData.department}</p>
			
			{/* Navigation Tabs */}
			<div className="w-full mt-8 space-y-2">
			  <button 
				onClick={() => setActiveTab("personal")}
				className={`w-full text-left py-2 px-4 rounded-lg flex items-center space-x-3 transition 
				  ${activeTab === "personal" ? "bg-white text-blue-600" : "text-white hover:bg-blue-600"}`}
			  >
				<User size={18} />
				<span>Personal Info</span>
			  </button>
			  <button 
				onClick={() => setActiveTab("professional")}
				className={`w-full text-left py-2 px-4 rounded-lg flex items-center space-x-3 transition 
				  ${activeTab === "professional" ? "bg-white text-blue-600" : "text-white hover:bg-blue-600"}`}
			  >
				<Briefcase size={18} />
				<span>Professional</span>
			  </button>
			  <button 
				onClick={() => setActiveTab("contact")}
				className={`w-full text-left py-2 px-4 rounded-lg flex items-center space-x-3 transition 
				  ${activeTab === "contact" ? "bg-white text-blue-600" : "text-white hover:bg-blue-600"}`}
			  >
				<Phone size={18} />
				<span>Contact Info</span>
			  </button>
			  <button 
				onClick={() => setActiveTab("security")}
				className={`w-full text-left py-2 px-4 rounded-lg flex items-center space-x-3 transition 
				  ${activeTab === "security" ? "bg-white text-blue-600" : "text-white hover:bg-blue-600"}`}
			  >
				<Key size={18} />
				<span>Security</span>
			  </button>
			</div>
		  </div>
		</div>

		{/* Main Content */}
		<div className="p-8 md:w-2/3">
		  <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Your Profile</h1>
		  
		  <form onSubmit={handleSubmit} className="space-y-6">
			{/* Personal Information Tab */}
			{activeTab === "personal" && (
			  <div className="space-y-4">
				<h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
				  Personal Information
				</h2>
				<div className="grid grid-cols-2 gap-4">
				  <div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
					  First Name
					</label>
					<div className="relative">
					  <input
						type="text"
						name="first_name"
						value={formData.first_name}
						onChange={handleChange}
						className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					  />
					  <User size={16} className="absolute left-3 top-3 text-gray-400" />
					</div>
				  </div>
				  <div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
					  Last Name
					</label>
					<div className="relative">
					  <input
						type="text"
						name="last_name"
						value={formData.last_name}
						onChange={handleChange}
						className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					  />
					  <User size={16} className="absolute left-3 top-3 text-gray-400" />
					</div>
				  </div>
				</div>
				<div>
				  <label className="block text-sm font-medium text-gray-700 mb-1">
					Gender
				  </label>
				  <select
					name="gender"
					value={formData.gender || ""}
					onChange={handleChange}
					className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
				  >
					<option value="">Select Gender</option>
					<option value="male">Male</option>
					<option value="female">Female</option>
					<option value="other">Other</option>
					<option value="prefer_not_to_say">Prefer not to say</option>
				  </select>
				</div>
				<div>
				  <label className="block text-sm font-medium text-gray-700 mb-1">
					NHS Number
				  </label>
				  <input
					type="text"
					name="nhs_number"
					value={formData.nhs_number || ""}
					onChange={handleChange}
					className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
				  />
				</div>
			  </div>
			)}

			{/* Professional Tab */}
			{activeTab === "professional" && (
			  <div className="space-y-4">
				<h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
				  Professional Details
				</h2>
				<div>
				  <label className="block text-sm font-medium text-gray-700 mb-1">
					Doctor Role
				  </label>
				  <div className="relative">
					<input
					  type="text"
					  name="doctor_role"
					  value={formData.doctor_role || ""}
					  onChange={handleChange}
					  className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
					<Briefcase size={16} className="absolute left-3 top-3 text-gray-400" />
				  </div>
				</div>
				<div>
				  <label className="block text-sm font-medium text-gray-700 mb-1">
					Department
				  </label>
				  <div className="relative">
					<input
					  type="text"
					  name="department"
					  value={formData.department || ""}
					  onChange={handleChange}
					  className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
					<Building size={16} className="absolute left-3 top-3 text-gray-400" />
				  </div>
				</div>
				<div>
				  <label className="block text-sm font-medium text-gray-700 mb-1">
					Hospital
				  </label>
				  <div className="relative">
					<input
					  type="text"
					  name="hospital"
					  value={formData.hospital || ""}
					  onChange={handleChange}
					  className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
					<Hospital size={16} className="absolute left-3 top-3 text-gray-400" />
				  </div>
				</div>
			  </div>
			)}

			{/* Contact Info Tab */}
			{activeTab === "contact" && (
			  <div className="space-y-4">
				<h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
				  Contact Information
				</h2>
				<div>
				  <label className="block text-sm font-medium text-gray-700 mb-1">
					Email Address
				  </label>
				  <div className="relative">
					<input
					  type="email"
					  name="email"
					  value={formData.email}
					  onChange={handleChange}
					  className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
					<Mail size={16} className="absolute left-3 top-3 text-gray-400" />
				  </div>
				</div>
				<div className="grid grid-cols-2 gap-4">
				  <div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
					  Mobile Number
					</label>
					<div className="relative">
					  <input
						type="text"
						name="mobile"
						value={formData.mobile || ""}
						onChange={handleChange}
						className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					  />
					  <Phone size={16} className="absolute left-3 top-3 text-gray-400" />
					</div>
				  </div>
				  <div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
					  Phone Number
					</label>
					<div className="relative">
					  <input
						type="text"
						name="phone"
						value={formData.phone || ""}
						onChange={handleChange}
						className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					  />
					  <Phone size={16} className="absolute left-3 top-3 text-gray-400" />
					</div>
				  </div>
				</div>
				<div>
				  <label className="block text-sm font-medium text-gray-700 mb-1">
					Address
				  </label>
				  <div className="relative">
					<textarea
					  name="address"
					  value={formData.address || ""}
					  onChange={handleChange}
					  rows="3"
					  className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
					<Home size={16} className="absolute left-3 top-3 text-gray-400" />
				  </div>
				</div>
			  </div>
			)}

			{/* Security Tab */}
			{activeTab === "security" && (
			  <div className="space-y-4">
				<h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
				  Security Settings
				</h2>
				<div>
				  <label className="block text-sm font-medium text-gray-700 mb-1">
					New Password (leave blank to keep current)
				  </label>
				  <div className="relative">
					<input
					  type="password"
					  name="password"
					  value={formData.password}
					  onChange={handleChange}
					  className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
					<Key size={16} className="absolute left-3 top-3 text-gray-400" />
				  </div>
				</div>
			  </div>
			)}

			{/* Submit Button - Always visible */}
			<div className="pt-4 border-t border-gray-200">
			  <button
				type="submit"
				disabled={updating}
				className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
			  >
				{updating ? (
				  <>
					<Loader size={18} className="animate-spin" />
					<span>Updating...</span>
				  </>
				) : (
				  <>
					<Save size={18} />
					<span>Save Changes</span>
				  </>
				)}
			  </button>
			</div>
		  </form>
		</div>
	  </div>
	</div>
  );
};

export default EditProfile;