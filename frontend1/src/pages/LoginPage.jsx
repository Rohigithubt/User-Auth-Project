import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './AuthForm.css'
import { useAuthStore } from "../store/authStore";


const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

        const { login, isLoading, error } = useAuthStore();
		const navigate = useNavigate();

	const handleLogin = async(e) => {
		e.preventDefault();
        await login(email, password);
      navigate("/dashboard")
        // console.log("hello");
        
	};

	return (
		<div className="login-page">
			<div className="login-card">
			


				<h2 className="form-title">Login Form</h2>

				<form onSubmit={handleLogin} className="login-form">
					<input
						type="email"
						placeholder="Email address"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="form-input" autoComplete="off"
						required
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="form-input" autoComplete="off"
						required
					/>

					<div className="forgot-link">
						<Link to="/forgot-password">Forgot password?</Link>
					</div>

					<button type="submit" className="login-button">Login</button>
				</form>

				<p className="signup-prompt">
					Not a member? <Link to="/signup">Signup now</Link>
				</p>
			</div>
		</div>
	);
};

export default LoginPage;