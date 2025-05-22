import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Signup from './assets/dist/pages/Signup';
import ForgotPassword from './assets/dist/pages/ForgotPassword';
import Dashboard from './assets/src/html/dashboard/Dashboard';
import SidebarMenu from './assets/src/html/layouts/SidebarMenu';
import SamplePage from './assets/src/html/other/SamplePage';
import HeadPageMeta from './assets/src/html/layouts/HeadPageMeta';
import HeadCSS from './assets/src/html/layouts/HeadCSS';
import Breadcrumb from './assets/src/html/layouts/Breadcrumb';
import FooterBlock from './assets/src/html/layouts/FooterBlock';
import FooterJS from './assets/src/html/layouts/FooterJS';
import Header from './assets/dist/layouts/Header';
import Task from './assets/src/html/layouts/Task';
import Priority from './assets/src/html/layouts/Priority';
import LoginPage from './assets/dist/pages/LoginPage';
import ProtectedRoute from './assets/src/html/layouts/ProtectedRoute';
import ResetPassword from './assets/dist/pages/ResetPassword';
import ProfilePage from './assets/src/html/layouts/ProfilePage';
import ViewProfilePage from './assets/src/html/layouts/ViewProfilePage';
import ProtectedLayout from './assets/src/html/layouts/ProtectedLayout';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/header" element={<Header />} />
            <Route path="/sidebar-menu" element={<SidebarMenu />} />
<Route path="/profile-page" element={<ProfilePage />} />
<Route path="/viewprofile-page" element={<ViewProfilePage />} />
            <Route path="/sample-page" element={<SamplePage />} />
            <Route path="/head-pagemeta" element={<HeadPageMeta />} />
            <Route path="/head-css" element={<HeadCSS />} />
            <Route path="/Bread-crumb" element={<Breadcrumb />} />
            <Route path="/footer-block" element={<FooterBlock />} />
            <Route path="/footer-js" element={<FooterJS />} />
            <Route path="/task" element={<Task />} />
            <Route path="/priority" element={<Priority />} />
          </Route>
        </Route>

        <Route path="/*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
