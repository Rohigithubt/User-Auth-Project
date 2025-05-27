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


