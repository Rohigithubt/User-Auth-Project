import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore';
// import VerifyEmail from './VerifyEmail';

const ForgotPassword = () => {
  const [email,setEmail] =useState("");
  const [isSubmitted,setIsSubmitted] = useState(false);
  
  const {isLoading,forgotPassword} = useAuthStore();
  
  const handleSubmit=(e)=>{
     e.preventDefault();
     forgotPassword(email);
     setIsSubmitted(true);
  }



  return (
    <>
   <div className='forgot-password'>
     <div className='forgot-password-page'>
        <h2 className='text-3xl font-bold text-blue-800 p-6'><b>Forgot Password</b></h2>

        
        {!isSubmitted ?( 
          <>
          <p className='pl-9 pr-9'>Enter your email address and we'll send you a link to reset your password.</p>
          <form onSubmit={handleSubmit}>
          <input className='input' 
           type="email" 
           placeholder="Email address"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
            required />

           <button className='forgot-password-btn'>
            {isLoading ? "Wait" : "Send Reset Link"}</button>
            </form>
           <p className='login-link'><Link to="/login"><b style={{color:"white"}}>←Back To Login</b></Link></p>
           </>
        ) :(
          <>
          <h5 className='pl-9 pr-9 pt-9'><b>If an account exists for {email}, you will receive a password reset link shortly.</b></h5>

          <p className='login-linkkkkk'><Link to="/login"><b style={{color:"white"}}>←Back To Login</b></Link></p>
          </>
        )}
     </div>

   </div>
   </>
  )
};

export default ForgotPassword;
