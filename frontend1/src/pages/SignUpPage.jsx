import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./AuthForm.css";
import { useAuthStore } from "../store/authStore";
import { Mail, Lock, Loader } from "lucide-react";


const SignUpPage = () => {
  const [name,setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

        const { signup, isLoading, error } = useAuthStore();
		const navigate = useNavigate();

	const handleSignUp = async(e) => {
		e.preventDefault();
		try{
        await signup(email, password, name);
      navigate("/verify-email")
		}
		catch(error){
			console.log(error);
			
		}
        
	};
  

	return (
		<div className="login-page">
			<div className="login-card">
				<h2 className="form-title">SignUp Form</h2>
				<form onSubmit={handleSignUp} className="login-form">
          <input
           type="text"
           placeholder="Enter Your Name"
           value={name}
           onChange={(e)=> setName(e.target.value)}
           className="form-input" autoComplete="on"
						required
          />
					<input
						type="email"
						placeholder="Email address"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="form-input" autoComplete="on"
						required
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="form-input" autoComplete="on"
						required
					/>

					{error && <p className="text-red-600 font-semibold">{error}</p>}

					<div className="forgot-link">
						<Link to="/forgot-password">Forgot password?</Link>
					</div>

					<button type="submit" className="login-button">SignUp</button>
				</form>

				<p className="signup-prompt">
					Already have an account? <Link to="/login">Login</Link>
				</p>
			</div>
		</div>
	);
};

export default SignUpPage;