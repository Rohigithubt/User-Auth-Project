import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthForm.css";
import { useAuthStore } from "../store/authStore";
// import { Mail, Lock, Loader } from "lucide-react";
import { formatDate } from "../utils/date";

const DashBoard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
  
    navigate("/");
    logout();
  };
  console.log(user,"effgg");
  

  useEffect(() => {
    // Redirect to login if user is not available
    if (!user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="dashboard">
    <div className="Dashboard-page">
      <h2 className="text-3xl font-bold text-blue-800">Dashboard</h2>

      <div className="dashboard-profileinformation">
        <h3 className="text-xl left-0 font-bold">Profile Information</h3>
        <p style={{ padding: "8px", textAlign: "left" }}>
          <b>Name: </b> {user?.name}
        </p>
        <p style={{ padding: "8px", textAlign: "left" }}>
          <b>Email: </b> {user?.email}
        </p>
      </div>

      <div className="dashoard-accountactivity">
        <h3 className="text-xl left-0 font-bold">Account Activity</h3>
        <p style={{ padding: "8px", textAlign: "left" }}>
          <b>Joined: </b>
          {user?.createdAt &&
            new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
        </p>
        <p style={{ padding: "8px", textAlign: "left" }}>
          <b>Last Login: </b>
          {user?.lastLogin && formatDate(user.lastLogin)}
        </p>
      </div>
      <p className="edit-prompt">
      <Link to="/edit-profile">Edit Profile?</Link>
              </p>
      <p className="delete-prompt">
      <Link to="/destroy">Delete Profile?</Link>
              </p>

      <button onClick={handleLogout} className="dashboard-btn">
        Logout
      </button>
      
    </div>
    </div>
  );
};

export default DashBoard;
