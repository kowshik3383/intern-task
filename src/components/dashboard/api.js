import axios from "axios";

const API_URL = "http://localhost:5000/appointments";

export const addAppointment = async (appointment) => {
  return await axios.post(API_URL, appointment);
};

export const getAppointments = async (user_id) => {
  return await axios.get(`${API_URL}/${user_id}`);
};

export const updateAppointment = async (id, appointment) => {
  return await axios.put(`${API_URL}/${id}`, appointment);
};

export const deleteAppointment = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
