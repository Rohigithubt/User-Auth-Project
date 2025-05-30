import React, { useState } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import myImage from "../../../assets/images/logo-dark.svg";
import { useAuthStore } from "../../src/html/layouts/store/authStore";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { resetPassword } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();


const {token,id} = useParams();
console.log(token,"token");
console.log(id,"id");


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      if (password !== confirmPassword) {
        throw new Error("Password and Confirm Password do not match");
      }

      await resetPassword(token, password, confirmPassword);
      setIsSubmitted(true);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || error.message);
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
                  <b>Reset Password</b>
                </h3>
                <Link to="/login" className="link-primary">Back to Login</Link>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label className="form-label">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="New Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  {errorMessage && (
                    <p className="text-danger mt-1 mb-2">{errorMessage}</p>
                  )}

                  <div className="d-grid mt-3">
                    <button type="submit" className="btn btn-primary">
                      {isLoading ? "Please wait..." : "Reset Password"}
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h5 className="pt-3 text-success">
                    <b>Your password has been successfully changed.</b>
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

export default ResetPassword;
