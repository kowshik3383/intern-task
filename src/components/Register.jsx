import { useState } from "react";
import axios from "axios";
import { User, Phone, Hospital, Briefcase, Mail, Lock, MapPin, FileText, Upload, UserPlus } from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "Male",
    email: "",
    password: "",
    mobile: "",
    phone: "",
    nhs_number: "",
    address: "",
    doctor_role: "General Physician",
    department: "Cardiology",
    hospital: "City Hospital",
    profile_pic: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const doctorRoles = ["General Physician", "Surgeon", "Pediatrician", "Cardiologist", "Orthopedic"];
  const departments = ["Cardiology", "Orthopedics", "Neurology", "Pediatrics", "General"];
  const hospitals = ["City Hospital", "Greenwood Medical", "Royal Care", "Sunshine Clinic"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profile_pic: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post("http://localhost:5000/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Store form data in localStorage, including profile picture path
      const storedData = { ...formData, profile_pic: response.data.profile_pic };
      localStorage.setItem("doctorData", JSON.stringify(storedData));

      setIsSubmitting(false);
      setActiveStep(4); // Success step
    } catch (error) {
      setIsSubmitting(false);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Doctor Registration</h2>
          <p className="mt-2 text-gray-600">Enter your information to create your account</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activeStep >= step ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step}
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  {step === 1 ? 'Personal' : step === 2 ? 'Contact' : 'Professional'}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between">
            <div className={`h-1 w-full ${activeStep >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
            <div className={`h-1 w-full ${activeStep >= 3 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
          </div>
        </div>

        {activeStep === 4 ? (
          <div className="bg-white shadow-lg rounded-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h3>
            <p className="text-gray-600 mb-6">Your account has been created. You can now log in.</p>
            <button 
              onClick={() => window.location.href='/login'} 
              className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Proceed to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              {/* Step 1: Personal Information */}
              {activeStep === 1 && (
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <User className="h-5 w-5 text-indigo-600 mr-2" />
                    <h3 className="text-xl font-medium text-gray-800">Personal Information</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input 
                        name="first_name" 
                        type="text" 
                        required 
                        value={formData.first_name} 
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="John"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input 
                        name="last_name" 
                        type="text" 
                        required 
                        value={formData.last_name} 
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                      <select 
                        name="gender" 
                        value={formData.gender} 
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">NHS Number</label>
                      <input 
                        name="nhs_number" 
                        type="text" 
                        required 
                        value={formData.nhs_number} 
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="123 456 7890"
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-200"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Contact Information */}
              {activeStep === 2 && (
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <Phone className="h-5 w-5 text-indigo-600 mr-2" />
                    <h3 className="text-xl font-medium text-gray-800">Contact Information</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <span className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          Email
                        </span>
                      </label>
                      <input 
                        name="email" 
                        type="email" 
                        required 
                        value={formData.email} 
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="doctor@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <span className="flex items-center">
                          <Lock className="h-4 w-4 mr-1" />
                          Password
                        </span>
                      </label>
                      <input 
                        name="password" 
                        type="password" 
                        required 
                        value={formData.password} 
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="********"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <span className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          Mobile
                        </span>
                      </label>
                      <input 
                        name="mobile" 
                        type="text" 
                        required 
                        value={formData.mobile} 
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="+44 7123 456789"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <span className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          Phone (Optional)
                        </span>
                      </label>
                      <input 
                        name="phone" 
                        type="text" 
                        value={formData.phone} 
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="+44 20 1234 5678"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          Address
                        </span>
                      </label>
                      <textarea 
                        name="address" 
                        required 
                        value={formData.address} 
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="123 Medical Street, London, UK"
                        rows="3"
                      ></textarea>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-300 transition duration-200"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-200"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Professional Information */}
              {activeStep === 3 && (
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <Briefcase className="h-5 w-5 text-indigo-600 mr-2" />
                    <h3 className="text-xl font-medium text-gray-800">Professional Information</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <span className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-1" />
                          Doctor Role
                        </span>
                      </label>
                      <select 
                        name="doctor_role" 
                        value={formData.doctor_role} 
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        {doctorRoles.map((role) => (
                          <option key={role}>{role}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <span className="flex items-center">
                          <FileText className="h-4 w-4 mr-1" />
                          Department
                        </span>
                      </label>
                      <select 
                        name="department" 
                        value={formData.department} 
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        {departments.map((dept) => (
                          <option key={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <span className="flex items-center">
                          <Hospital className="h-4 w-4 mr-1" />
                          Hospital
                        </span>
                      </label>
                      <select 
                        name="hospital" 
                        value={formData.hospital} 
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        {hospitals.map((hospital) => (
                          <option key={hospital}>{hospital}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <span className="flex items-center">
                          <Upload className="h-4 w-4 mr-1" />
                          Profile Picture
                        </span>
                      </label>
                      <div className="flex items-center">
                        <label className="flex flex-col items-center px-4 py-2 bg-white text-indigo-600 rounded-lg border border-indigo-400 cursor-pointer hover:bg-indigo-50 transition duration-200">
                          <Upload className="h-5 w-5" />
                          <span className="mt-2 text-sm">Upload Photo</span>
                          <input type="file" name="profile_pic" accept="image/*" onChange={handleFileChange} className="hidden" />
                        </label>
                        {imagePreview && (
                          <div className="ml-4">
                            <img src={imagePreview} alt="Preview" className="h-16 w-16 rounded-full object-cover border-2 border-indigo-400" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-300 transition duration-200"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex items-center ${isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} text-white py-2 px-6 rounded-lg transition duration-200`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <UserPlus className="h-5 w-5 mr-2" />
                          Register
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>
        )}

        {/* Sign in link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}