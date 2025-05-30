import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import myImage from '../../../assets/images/logo-dark.svg';
import { useAuthStore } from "../../src/html/layouts/store/authStore";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { forgetPassword } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.includes("@")) {
      setErrorMessage("Invalid email address");
      return;
    }

    setIsLoading(true);
    try {
      await forgetPassword(email);
      setIsSubmitted(true);
    } catch (error) {
      setErrorMessage(error.message || "Failed to send reset email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-main">
      <div className="auth-wrapper v3">
        <div className="auth-form">
          <div className="auth-header">
            <a href="#">
              <img src={myImage} alt="img" />
            </a>
          </div>
          <div className="card my-5">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-end mb-4">
                <h3 className="mb-0">
                  <b>Forgot Password</b>
                </h3>
                <Link to="/login" className="link-primary">Back to Login</Link>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {errorMessage && (
                    <p className="text-danger mt-1 mb-2">{errorMessage}</p>
                  )}

                  <p className="mt-4 text-sm text-muted">
                    Do not forget to check your SPAM box.
                  </p>

                  <div className="d-grid mt-3">
                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                      {isLoading ? "Wait..." : "Send Password Reset Email"}
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h5 className="pt-3">
                    <b>If an account exists for {email}, you will receive a password reset link shortly.</b>
                  </h5>
                  <p className="mt-4">
                    <Link to="/login">
                      <b className="link-primary">← Back To Login</b>
                    </Link>
                  </p>
                </>
              )}
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
  );
};

export default ForgotPassword;
