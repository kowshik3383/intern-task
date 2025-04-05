import React, { useState, useEffect } from "react";
import { addAppointment, getAppointments, updateAppointment, deleteAppointment } from "./api";
import { Calendar, Clock, User, Briefcase, FileText, NotebookTabs, MapPin, Phone, AlertTriangle, X, Plus, Trash, Edit, Check } from "lucide-react";
import {  AlertCircle, Heart } from 'lucide-react';


import { Tag, ChevronRight, Bell } from "lucide-react";

const Appointment = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user.id;
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    details: "",
    occupation: "",
    appointment_date: "",
    special_notes: "",
    address: "",
    mobile: "",
    medical_complication: "",
  });

  useEffect(() => {
    if (user_id) {
      fetchAppointments();
    }
  }, [user_id]);

  const fetchAppointments = async () => {
    const res = await getAppointments(user_id);
    setAppointments(res.data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addAppointment({ user_id, ...form });
    setForm({
      first_name: "",
      last_name: "",
      details: "",
      occupation: "",
      appointment_date: "",
      special_notes: "",
      address: "",
      mobile: "",
      medical_complication: "",
    });
    fetchAppointments();
  };

  const handleDelete = async (id) => {
    await deleteAppointment(id);
    fetchAppointments();
    closeModal();
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    await updateAppointment(selectedAppointment.id, form);
    fetchAppointments();
    setIsEditMode(false);
    closeModal();
  };

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setForm(appointment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
    setIsEditMode(false);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
 <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Calendar size={20} className="mr-2 text-blue-500" />
            Your Appointments
          </h2>
          
          {appointments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No appointments found. Add your first appointment above.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {appointments.map((app, index) => (
    <div
      key={app.id}
      onClick={() => openModal(app)}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-100 to-transparent rounded-bl-full opacity-70"></div>
      <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-tr from-indigo-100 via-purple-100 to-transparent rounded-full opacity-50"></div>
      
      {/* Status indicator */}
      <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
        index % 3 === 0 ? "bg-green-500" : index % 3 === 1 ? "bg-amber-500" : "bg-blue-500"
      } animate-pulse`}></div>
      
      <div className="p-6 relative">
        {/* Patient info header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold mr-3">
              {app.first_name?.charAt(0)}{app.last_name?.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                {app.first_name} {app.last_name}
              </h3>
              <div className="flex items-center mt-0.5">
                <Tag size={12} className="text-blue-500 mr-1" />
                <span className="text-xs text-gray-500 font-medium">
                  {app.occupation || "No occupation listed"}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Appointment details with elegant styling */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center p-2.5 bg-blue-50 rounded-lg">
            <Calendar size={16} className="text-blue-600 mr-3" />
            <div>
              <div className="text-sm font-medium text-gray-800">{formatDate(app.appointment_date)}</div>
              <div className="text-xs text-gray-500 flex items-center mt-0.5">
                <Clock size={10} className="mr-1" />
                {new Date(app.appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
          
          {app.mobile && (
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <Phone size={14} className="text-purple-600" />
              </div>
              <span className="text-sm text-gray-700">{app.mobile}</span>
            </div>
          )}
          
          {app.address && (
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                <MapPin size={14} className="text-amber-600" />
              </div>
              <span className="text-sm text-gray-700 truncate max-w-[180px]">{app.address}</span>
            </div>
          )}
        </div>
        
        {/* Notes section with stylish treatment */}
        {app.special_notes && (
          <div className="relative mt-4 pt-4 border-t border-dashed border-gray-200">
            <div className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 bg-white px-3">
              <Bell size={16} className="text-blue-500" />
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-xs italic text-gray-600 leading-relaxed">
              {app.special_notes.length > 90
                ? `${app.special_notes.substring(0, 90)}...`
                : app.special_notes}
            </div>
          </div>
        )}
        
        {/* Attractive button */}
        <div className="mt-4 flex justify-end">
          <div className="group-hover:bg-blue-600 bg-blue-500 text-white text-xs font-semibold py-1.5 px-3 rounded-full flex items-center transition-colors duration-300">
            View Details <ChevronRight size={14} className="ml-1 group-hover:ml-2 transition-all" />
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
          )}
        </div>
        <h1 className="text-3xl font-bold text-blue-600 mb-8">Appointment Management</h1>
        
        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Plus size={20} className="mr-2 text-blue-500" />
            New Appointment
          </h2>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">First Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="first_name"
                  value={form.first_name}
                  placeholder="First Name"
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Last Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="last_name"
                  value={form.last_name}
                  placeholder="Last Name"
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Occupation</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="occupation"
                  value={form.occupation}
                  placeholder="Occupation"
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Appointment Date</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={16} className="text-gray-400" />
                </div>
                <input
                  type="datetime-local"
                  name="appointment_date"
                  value={form.appointment_date}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Mobile</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="mobile"
                  value={form.mobile}
                  placeholder="Mobile Number"
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  placeholder="Address"
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Details</label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <FileText size={16} className="text-gray-400" />
                </div>
                <textarea
                  name="details"
                  value={form.details}
                  placeholder="Details"
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  rows="2"
                ></textarea>
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Special Notes</label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <NotebookTabs size={16} className="text-gray-400" />
                </div>
                <textarea
                  name="special_notes"
                  value={form.special_notes}
                  placeholder="Special Notes"
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  rows="2"
                ></textarea>
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Medical Complications</label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <AlertTriangle size={16} className="text-gray-400" />
                </div>
                <textarea
                  name="medical_complication"
                  value={form.medical_complication}
                  placeholder="Medical Complications"
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  rows="2"
                ></textarea>
              </div>
            </div>
            
            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus size={18} className="mr-2" />
                Add Appointment
              </button>
            </div>
          </form>
        </div>
        
        {/* Appointments List */}
       
      </div>
      
      {/* Modal */}
      {isModalOpen && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-xl font-bold text-gray-800">
                {isEditMode ? "Edit Appointment" : "Appointment Details"}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              {isEditMode ? (
                <form onSubmit={handleEdit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      value={form.first_name}
                      onChange={handleChange}
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      value={form.last_name}
                      onChange={handleChange}
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Occupation</label>
                    <input
                      type="text"
                      name="occupation"
                      value={form.occupation}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Appointment Date</label>
                    <input7Y87G87Y87Y7YG87Y878Y8H87Y7
                      type="datetime-local"
                      name="appointment_date"
                      value={form.appointment_date}
                      onChange={handleChange}
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Mobile</label>
                    <input
                      type="text"
                      name="mobile"
                      value={form.mobile}
                      onChange={handleChange}
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Details</label>
                    <textarea
                      name="details"
                      value={form.details}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      rows="3"
                    ></textarea>
                  </div>
                  
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Special Notes</label>
                    <textarea
                      name="special_notes"
                      value={form.special_notes}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      rows="2"
                    ></textarea>
                  </div>
                  
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Medical Complications</label>
                    <textarea
                      name="medical_complication"
                      value={form.medical_complication}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      rows="2"
                    ></textarea>
                  </div>
                  
                  <div className="md:col-span-2 mt-4 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Check size={18} className="inline mr-1" />
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                  <div className="bg-white rounded-lg shadow-md ">
    <div className="flex justify-between">
  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <User className="mr-2 text-blue-600" size={20} />
        Appointment Details
      </h3>
 <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button></div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded-md">
            <h4 className="font-medium text-gray-500 text-sm flex items-center">
              <User className="mr-2 text-blue-600" size={16} />
              Name
            </h4>
            <p className="text-gray-800 pl-6">
              {selectedAppointment.first_name} {selectedAppointment.last_name}
            </p>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-md">
            <h4 className="font-medium text-gray-500 text-sm flex items-center">
              <Briefcase className="mr-2 text-blue-600" size={16} />
              Occupation
            </h4>
            <p className="text-gray-800 pl-6">{selectedAppointment.occupation || "N/A"}</p>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-md">
            <h4 className="font-medium text-gray-500 text-sm flex items-center">
              <Calendar className="mr-2 text-blue-600" size={16} />
              Appointment Date
            </h4>
            <p className="text-gray-800 pl-6">{formatDate(selectedAppointment.appointment_date)}</p>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-md">
            <h4 className="font-medium text-gray-500 text-sm flex items-center">
              <Phone className="mr-2 text-blue-600" size={16} />
              Mobile
            </h4>
            <p className="text-gray-800 pl-6">{selectedAppointment.mobile}</p>
          </div>
          
          <div className="md:col-span-2 p-3 bg-gray-50 rounded-md">
            <h4 className="font-medium text-gray-500 text-sm flex items-center">
              <MapPin className="mr-2 text-blue-600" size={16} />
              Address
            </h4>
            <p className="text-gray-800 pl-6">{selectedAppointment.address}</p>
          </div>
          
          {selectedAppointment.details && (
            <div className="md:col-span-2 p-3 bg-gray-50 rounded-md">
              <h4 className="font-medium text-gray-500 text-sm flex items-center">
                <FileText className="mr-2 text-blue-600" size={16} />
                Details
              </h4>
              <p className="text-gray-800 pl-6">{selectedAppointment.details}</p>
            </div>
          )}
          
          {selectedAppointment.special_notes && (
            <div className="md:col-span-2 p-3 bg-gray-50 rounded-md">
              <h4 className="font-medium text-gray-500 text-sm flex items-center">
                <AlertCircle className="mr-2 text-amber-500" size={16} />
                Special Notes
              </h4>
              <p className="text-gray-800 pl-6">{selectedAppointment.special_notes}</p>
            </div>
          )}
          
          {selectedAppointment.medical_complication && (
            <div className="md:col-span-2 p-3 bg-gray-50 rounded-md">
              <h4 className="font-medium text-gray-500 text-sm flex items-center">
                <Heart className="mr-2 text-red-600" size={16} />
                Medical Complications
              </h4>
              <p className="text-gray-800 pl-6">{selectedAppointment.medical_complication}</p>
            </div>
          )}
        </div>
      </div>
    </div>
              )}
            </div>
            
            <div className="border-t p-4 flex justify-end space-x-3 bg-gray-50">
              {isEditMode ? null : (
                <>
                  <button
                    onClick={toggleEditMode}
                    className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Edit size={18} className="inline mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(selectedAppointment.id)}
                    className="py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <Trash size={18} className="inline mr-1" />
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;