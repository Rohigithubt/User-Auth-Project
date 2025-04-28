import React, { useState } from 'react'
import { useEffect,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const VerifyEmail = () => {

     const [code,setCode] =useState(["","","","","",""]);
     const inputRefs = useRef([]);
     const navigate = useNavigate();

     const {error,isLoading,verifyEmail} = useAuthStore();

     const handleChange = (index, value) => {
      const newCode = [...code];
  
      if (value.length > 1) {
        const pastedCode = value.slice(0, 6).split("");
        for (let i = 0; i < 6; i++) {
          newCode[i] = pastedCode[i] || "";
        }
        setCode(newCode);
  
        const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
        const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
        inputRefs.current[focusIndex].focus();
      } else {
        newCode[index] = value;
        setCode(newCode);
  
        if (value && index < 5) {
          inputRefs.current[index + 1].focus();
        }
      }
    };

    const handleKeyDown = (index, e) => {
      if (e.key === "Backspace" && !code[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const verificationCode = code.join("");
      try {
        await verifyEmail(verificationCode);
        navigate("/");
        toast.success("Email verified successfully");
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      if (code.every((digit) => digit !== "")) {
        handleSubmit(new Event("submit"));
      }
    }, [code]);



  return (
    <div className='verify-email'>
      <div className='verify-email-page'>
        <h2 className="text-3xl font-bold text-blue-800 pt-4">Verify Your Email</h2>
        <p className='text-center pl-9 pr-9 pt-8 font-semibold'>Enter the 6-digit code sent to your email address.</p>

        <form onSubmit={handleSubmit} className='space-x-9 ml-8 mr-0 mt-10'>
					<div className='flex justify-between'>
						{code.map((digit, index) => (
							<input
								key={index}
								ref={(el) => (inputRefs.current[index] = el)}
								type='text'
								maxLength='6'
								value={digit}
								onChange={(e) => handleChange(index, e.target.value)}
								onKeyDown={(e) => handleKeyDown(index, e)}
								className='w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none'
							/>
						))}
					</div>
					{error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
					<button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						type='submit'
						disabled={isLoading || code.some((digit) => !digit)}
						className='btn'
					>
						{isLoading ? "Verifying..." : "Verify Email"}
					</button>
				</form>

           
      </div>
    </div>
  )
}

export default VerifyEmail;
https://github.com/Rohigithubt/mern-advanced-auth/tree/69142ead92ae9d6137a6e2e48abb1a6e53ee8c1f/frontend1