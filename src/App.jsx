import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Loader from "./components/Loader";
import Sidebar from "./components/Sidebar";
import Register from "./components/Register"; // Import Register Component
import Home from "./components/dashboard/Home";
import Login from "./components/Login";
import Ap from "./components/dashboard/Ap";

import Consult from "./components/dashboard/Consult";
import CheckupForm from "./components/dashboard/CheckUp";
import Patient from "./components/dashboard/Patient";
import Pa from "./components/dashboard/Pa";
import Dash from "./components/dashboard/Dash";
import Pay from "./components/dashboard/Pay";
import Appointment from "./components/dashboard/Appointment";
import Das from "./components/dashboard/Das";
import EditProfile from "./components/dashboard/EditProfile";
import Notifications from "./components/dashboard/Notifications";
import Video from "./components/dashboard/Video";
import Medicine from "./components/dashboard/Medicine";
import Help from "./components/dashboard/Help";
import Helps from "./components/dashboard/Helps";
import Admin from "./components/dashboard/admin/Admin";
import Admin2 from "./components/dashboard/admin/Admin2";
import Admin3 from "./components/dashboard/admin/Admin3";
import Admin4 from "./components/dashboard/admin/Admin4";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); //  loading delay 
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
        <div className="transform scale-110">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="">
        
        <div className="">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Sidebar />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
           
            <Route path="/dashboard/appointments" element={<Das />} />
            <Route path="/appointments" element={<Ap />} />
            <Route path="/consultations" element={<Consult />} />
            <Route path="/checkups" element={<CheckupForm />} />
            <Route path="/patients" element={<Pa />} />
            <Route path="/dashboard" element={<Dash />} />
            <Route path="/payments" element={<Pay />} />
            <Route path="/profile" element={<EditProfile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Notifications />} />
            <Route path="/records" element={<Video />} />
            <Route path="/medications" element={<Medicine />} />
            <Route path="/help-support" element={<Helps />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/users" element={<Admin2 />} />
            <Route path="/admin/appointments" element={<Admin3 />} />
            <Route path="/admin/support" element={<Admin4 />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
