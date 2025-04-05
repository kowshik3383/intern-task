import React from 'react';
import Sidebar from '../ui/Sidebar';
import Navbar from '../ui/Navbar';
import Appointment from './Appointment';


const Das = () => {
  return (
   <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
      <Appointment/>
        </div>
      </div>
      <div className="flex-1"></div>
    </>
  );
};

export default Das;
