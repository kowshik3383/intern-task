import React from 'react';
import Sidebar from './Sidebar';

import SupportTickets from './SupportTickets';



const Admin4 = () => {
  return (
   <>
	  <div className="flex">
		<Sidebar />
		<div className="flex-1">
   
<SupportTickets/>
	  
		</div>
	  </div>
	  <div className="flex-1"></div>
	</>
  );
};

export default Admin4;
