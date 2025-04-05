import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import AdminStats from './AdminStats';



const Admin = () => {
  return (
   <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
   
<AdminStats/>
      
        </div>
      </div>
      <div className="flex-1"></div>
    </>
  );
};

export default Admin;
