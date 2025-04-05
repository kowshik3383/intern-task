import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import AdminStats from './AdminStats';
import AppointmentList from './AppointmentList';



const Admin3 = () => {
  return (
   <>
	  <div className="flex">
		<Sidebar />
		<div className="flex-1">
   
<AppointmentList/>
	  
		</div>
	  </div>
	  <div className="flex-1"></div>
	</>
  );
};

export default Admin3;
