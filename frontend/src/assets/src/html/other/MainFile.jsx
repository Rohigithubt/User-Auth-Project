import React from 'react';
import Sidebar from '../layouts/Sidebar';
import Topbar from '../layouts/Topbar';
import { Outlet } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';

const MainFile = () => {
  console.log("tokennn enter dashboard")
  return (
    <div className="main-layout" style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Topbar />  
          <div className="main-content" style={{ padding: '1rem' }}>
          <Dashboard />
          </div>
        {/* <div className="main-content" style={{ padding: '1rem' }}>
         
        </div> */}
      </div>
    </div>
  );
};

export default MainFile;
