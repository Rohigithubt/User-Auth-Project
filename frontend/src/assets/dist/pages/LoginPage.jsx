import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import myImage from '../../../assets/images/logo-dark.svg';
import googleimg from '../../../assets/src/assets/images/authentication/google.svg';
import twitterimg from '../../../assets/src/assets/images/authentication/twitter.svg';
import facookimg from '../../../assets/src/assets/images/authentication/facebook.svg';
import { useAuthStore } from "../../src/html/layouts/store/authStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "../../../firebase"; 

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

    const { login, isLoding } = useAuthStore();
  const navigate = useNavigate();

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    try {
      const success = await login(email, password);
      console.log(success,"successfrfr");
      
      if (success?.data?.status) {
        const token = success.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("isAuthenticated", "true");
        const userId = success?.data.user._id;
        localStorage.setItem("userId",userId);

        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 1000,
          onClose: () => {
            navigate("/");
          },
        });
      } else {
        setLoginError("Login failed. Please try again.");
      }
    } catch (err) {
      const errMsg = err.response?.data?.error || "Login error. Please try again.";
      setLoginError(errMsg);
    }
  };

  const handleGoogleLogin = async () => {
    setLoginError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const success = await login(user.email, user.uid); 
      if (success?.data?.status) {
        const token = success.data.token;
        // const createdId=success.data.createdBy;
        localStorage.setItem("token", token);
        localStorage.setItem("isAuthenticated", "true");
        // localStorage.setItem("createdBy",createdId)

        toast.success("Google login successful!", {
          position: "top-right",
          autoClose: 1000,
          onClose: () => {
            navigate("/");
          },
        });
      } else {
        setLoginError("Google login failed. Please try again.");
      }
    } catch (err) {
      const errMsg = err?.response?.data?.error || err?.message || "Google login failed.";
      setLoginError(errMsg);
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="loader-bg">
        <div className="loader-track">
          <div className="loader-fill"></div>
        </div>
      </div>

      <div className="auth-main">
        <div className="auth-wrapper v3">
          <div className="auth-form">
            <div className="auth-header">
              <Link to="#"><img src={myImage} alt="logo" /></Link>
            </div>
            <div className="card my-5">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-end mb-4">
                  <h3 className="mb-0"><b>Login</b></h3>
                  <Link to="/signup" className="link-primary">Don't have an account?</Link>
                </div>

                <form onSubmit={handleLogin}>
                  <div className="form-group mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="on"
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="off"
                      required
                    />
                  </div>

                  {loginError && (
                    <div className="text-danger mb-3">{loginError}</div>
                  )}

                  <div className="d-flex mt-1 justify-content-between">
                    <div></div>
                    <Link to="/forgot-password" className="text-secondary f-w-400">Forgot Password?</Link>
                  </div>

                  <div className="d-grid mt-4">
                    <button type="submit" className="btn btn-primary" disabled={isLoding}>
                      {isLoding ? "Logging in..." : "Login"}
                    </button>
                  </div>
                </form>

                <div className="saprator mt-3">
                  <span>Login with</span>
                </div>

                <div className="row">
                  <div className="col-4">
                    <div className="d-grid">
                      <button
                        type="button"
                        className="btn mt-2 btn-light-primary bg-light text-muted"
                        onClick={handleGoogleLogin}
                      >
                        <img src={googleimg} alt="img" />
                        <span className="d-none d-sm-inline-block"> Google</span>
                      </button>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-grid">
                      <button type="button" className="btn mt-2 btn-light-primary bg-light text-muted" disabled>
                        <img src={twitterimg} alt="img" />
                        <span className="d-none d-sm-inline-block"> Twitter</span>
                      </button>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-grid">
                      <button type="button" className="btn mt-2 btn-light-primary bg-light text-muted" disabled>
                        <img src={facookimg} alt="img" />
                        <span className="d-none d-sm-inline-block"> Facebook</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="auth-footer row">
              <div className="col my-1">
                <p className="m-0">
                  Copyright © <a href="#">Codedthemes</a>
                </p>
              </div>
              <div className="col-auto my-1">
                <ul className="list-inline footer-link mb-0">
                  <li className="list-inline-item"><a href="#">Home</a></li>
                  <li className="list-inline-item"><a href="#">Privacy Policy</a></li>
                  <li className="list-inline-item"><a href="#">Contact us</a></li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
