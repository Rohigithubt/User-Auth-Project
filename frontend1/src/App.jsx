import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authStore'
import { useEffect } from 'react'
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./Pages/SignUpPage";
import DashBoard from "./pages/DashBoard";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";



function App() {
  // const [count, setCount] = useState(0)
  const [state, setState] = useState("")
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth(); // ✅ Restore user session on reload
  }, [checkAuth]);

  return (
    <>
    <Routes>
     <Route  exact path="/" element={ <LoginPage />}/>
     <Route  exact path="/login" element={ <LoginPage />}/>

     <Route exact path="/dashboard" element={ <DashBoard />}/>
     <Route exact path="/signup" element={< SignUpPage />}/>
     <Route exact path="/forgot-password" element={< ForgotPassword />}/>
     <Route exact path="/verify-email" element={<VerifyEmail />} />

    
     

     </Routes>
    </>
  )
}

export default App
