import React from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { Outlet } from 'react-router-dom'

const ProtectedLayout = () => {

  return (
    <>
    <Sidebar />
    <Topbar />

    <div className="content">
      <Outlet />
    </div>
    </>
      

  )
}

export default ProtectedLayout



/*
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const ProtectedLayout = () => (
  <>
<Sidebar />
<Topbar />
    <div className="content">
      <Outlet />
    </div>
  </>
);

export default ProtectedLayout;

*/ 