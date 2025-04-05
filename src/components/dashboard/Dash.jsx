import React from 'react';
import Sidebar from '../ui/Sidebar';
import Navbar from '../ui/Navbar';

import Dashboard from './Dashboard';

const Dash = () => {
  return (
   <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-2">
          <Navbar />
      <Dashboard/>
        </div>
      </div>
      <div className="flex-1"></div>
    </>
  );
};

export default Dash;
