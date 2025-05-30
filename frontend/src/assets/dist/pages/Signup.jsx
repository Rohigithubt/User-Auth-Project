import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../src/html/layouts/store/authStore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "../../../firebase"
import myImage from '../../../../src/assets/images/logo-dark.svg';
import googleimg from '../../../assets/src/assets/images/authentication/google.svg';
import twitterimg from '../../../assets/src/assets/images/authentication/twitter.svg';
import facookimg from '../../../assets/src/assets/images/authentication/facebook.svg';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const { register, isLoading } = useAuthStore();
  const [successMsg, setSuccessMsg] = useState("");
  const [submitError, setSubmitError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSuccessMsg("");
    try {
      await register(name, email, password);
      setSuccessMsg("Signup successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleGoogleSignup = async () => {
    setSubmitError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await register(user.displayName || "Google User", user.email, user.uid);
      setSuccessMsg("Signed up with Google! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      handleApiError(err);
    }


  };

  const handleApiError = (err) => {
    if (err?.response?.data?.message) {
      setSubmitError(err.response.data.message);
    } else if (typeof err === "string") {
      setSubmitError(err);
    } else {
      setSubmitError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="auth-main">
      <div className="auth-wrapper v3">
        <div className="auth-form">
          <div className="auth-header">
            <Link to="#"><img src={myImage} alt="logo" /></Link>
          </div>
          <div className="card my-5">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-end mb-4">
                <h3 className="mb-0"><b>Sign up</b></h3>
                <Link to="/login" className="link-primary">Already have an account?</Link>
              </div>
              <form onSubmit={handleSignUp}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group mb-3">
                      <label className="form-label">Name*</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Email Address*</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label">Password*</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

               
                {submitError && <p className="text-danger">{submitError}</p>}
                {successMsg && <p className="text-success">{successMsg}</p>}

                <p className="mt-4 text-sm text-muted">
                  By Signing up, you agree to our <a href="#" className="text-primary">Terms of Service</a> and <a href="#" className="text-primary">Privacy Policy</a>
                </p>

                <div className="d-grid mt-3">
                  <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </button>
                </div>
              </form>

              <div className="saprator mt-3">
                <span>Sign up with</span>
              </div>
              <div className="row">
                <div className="col-4">
                  <div className="d-grid">
                    <button onClick={handleGoogleSignup} className="btn mt-2 btn-light-primary bg-light text-muted">
                      <img src={googleimg} alt="google" />
                      <span className="d-none d-sm-inline-block"> Google</span>
                    </button>
                  </div>
                </div>
                <div className="col-4">
                  <div className="d-grid">
                    <button type="button" className="btn mt-2 btn-light-primary bg-light text-muted" disabled>
                      <img src={twitterimg} alt="twitter" />
                      <span className="d-none d-sm-inline-block"> Twitter</span>
                    </button>
                  </div>
                </div>
                <div className="col-4">
                  <div className="d-grid">
                    <button type="button" className="btn mt-2 btn-light-primary bg-light text-muted" disabled>
                      <img src={facookimg} alt="facebook" />
                      <span className="d-none d-sm-inline-block"> Facebook</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="auth-footer row">
            <div className="col my-1">
              <p className="m-0">Copyright © <a href="#">Codedthemes</a></p>
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
  );
};

export default Signup;
