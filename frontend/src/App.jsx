import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import LoginPage from './assets/dist/pages/LoginPage'
import Signup from './assets/dist/pages/Signup'
import ForgotPassword from './assets/dist/pages/ForgotPassword'
import Dashboard from './assets/src/html/dashboard/Dashboard'
// import Header from './assets/dist/layouts/Header'
import Sidebar from './assets/src/html/layouts/Sidebar'
import SidebarMenu from './assets/src/html/layouts/SidebarMenu'
// import HeaderContent from './assets/src/html/layouts/HeaderContent'
import SamplePage from './assets/src/html/other/SamplePage'
import HeadPageMeta from './assets/src/html/layouts/HeadPageMeta'
import HeadCSS from './assets/src/html/layouts/HeadCSS'
import Breadcrumb from './assets/src/html/layouts/Breadcrumb'
import Topbar from './assets/src/html/layouts/Topbar'
import FooterBlock from './assets/src/html/layouts/FooterBlock'
import FooterJS from './assets/src/html/layouts/FooterJS'
import MainFile from './assets/src/html/other/MainFile'
import Header from './assets/dist/layouts/Header'
import ProtectedRoute from './assets/src/html/layouts/ProtectedRoute'
import Task from './assets/src/html/layouts/Task'
import Priority from './assets/src/html/layouts/Priority'
import LoginPage from './assets/dist/pages/LoginPage'
// import MainFile from './assets/src/html/other/MainFile'

const App = () => {
    
  return (
    <>
      <BrowserRouter>
            <Sidebar />
              <Topbar />  
        <Routes>
        {/* <Route path='/' element={<MainFile />} /> */}
        
      <Route element={<ProtectedRoute />}>
        {/* <Route path='/' element={<MainFile />} /> */}
        <Route path='/' element={<Dashboard />} />
        <Route path='/sidebar' element={<Sidebar />} />
        <Route path='/topbar' element={<Topbar />} />
        <Route path='/header' element={<Header />} />
          <Route path='/sidebar-menu' element={<SidebarMenu />} />
          <Route path='/sample-page' element={<SamplePage />} />
          <Route path='/head-pagemeta' element={<HeadPageMeta />} />
          <Route path='/head-css' element={<HeadCSS />} />
          <Route path='/Bread-crumb' element={<Breadcrumb />} />
          <Route path='/footer-block' element={<FooterBlock />} />
          <Route path='/footer-js' element={<FooterJS />} />
          <Route path='/task' element={<Task />} />
          <Route path='/priority' element={<Priority />} />

      </Route>

      
         {/* <Route
            path="/"
            element={<ProtectedRoute Component={MainFile} />}
          /> */}

          
         
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
       


         








          




        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
