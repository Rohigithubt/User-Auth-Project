import React, { useState, useEffect } from "react";
import "../assets/css/style.css";
import "../assets/fonts/tabler-icons.min.css";
import myImg from "../assets/images/user/avatar-2.jpg";
import myImg1 from "../assets/images/user/avatar-1.jpg";
import myImg2 from "../assets/images/user/avatar-2.jpg";
import myImg3 from "../assets/images/user/avatar-3.jpg";
import myImg4 from "../assets/images/user/avatar-4.jpg";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../src/html/layouts/store/authStore";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Header = ({ isSidebarHidden, toggleSidebar }) => {
  const navigate = useNavigate();
  const { user, logout, editProfile } = useAuthStore();
  const [profileData, setProfileData] = useState({ name: '', profileImage: '' });

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      editProfile(userId)
        .then((res) => {
          const { name = '', profileImage = '' } = res.data || {};
          setProfileData({ name, profileImage });
        })
        .catch(() => {
          toast.error('Failed to load user data.');
        });
    }
  }, [userId]);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    });

    if (result.isConfirmed) {
      await Swal.fire({
        title: "Logged out!",
        text: "You have been logged out successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      try {
        await logout();
        localStorage.removeItem("token");
        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };

  const notifications = [
    {
      img: myImg1,
      time: "3:00 AM",
      message: "It's ",
      bold: "Cristina danny's",
      desc: " birthday today.",
      ago: "2 min ago",
    },
    {
      img: myImg2,
      time: "6:00 PM",
      message: "",
      bold: "Aida Burg",
      desc: " commented your post.",
      ago: "5 August",
    },
    {
      img: myImg3,
      time: "2:45 PM",
      message: "",
      bold: "There was a failure to your setup.",
      desc: "",
      ago: "7 hours ago",
    },
    {
      img: myImg4,
      time: "9:10 PM",
      message: "Cristina Danny ",
      bold: "invited to join ",
      desc: "Meeting.",
      ago: "Daily scrum meeting time",
    },
  ];

  return (
    <header className={`pc-header ${isSidebarHidden ? "expanded-header" : ""}`}>
      <div className="me-auto pc-mob-drp">
        <ul className="list-unstyled">
          <li className="pc-h-item pc-sidebar-collapse">
            <button
              className="pc-head-link ms-0"
              onClick={toggleSidebar}
              style={{ background: "transparent", border: "none" }}
            >
              <i className="ti ti-menu-2"></i>
            </button>
          </li>
        </ul>
      </div>

      <div className="ms-auto">
        <ul className="list-unstyled d-flex align-items-center mb-0">
          <li className="dropdown pc-h-item">
            <a className="pc-head-link dropdown-toggle arrow-none me-0" data-bs-toggle="dropdown" href="#" role="button">
              <i className="ti ti-mail"></i>
            </a>
            <div className="dropdown-menu dropdown-notification dropdown-menu-end pc-h-dropdown">
              <div className="dropdown-header d-flex align-items-center justify-content-between">
                <h5 className="m-0">Message</h5>
                <a href="#!" className="pc-head-link bg-transparent">
                  <i className="ti ti-x text-danger"></i>
                </a>
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-header px-0 text-wrap header-notification-scroll position-relative" style={{ maxHeight: "calc(100vh - 215px)" }}>
                <div className="list-group list-group-flush w-100">
                  {notifications.map((item, idx) => (
                    <a key={idx} className="list-group-item list-group-item-action">
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <img src={item.img} alt="user" className="user-avtar" />
                        </div>
                        <div className="flex-grow-1 ms-1">
                          <span className="float-end text-muted">{item.time}</span>
                          <p className="text-body mb-1">
                            {item.message}
                            <b>{item.bold}</b>
                            {item.desc}
                          </p>
                          <span className="text-muted">{item.ago}</span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <div className="text-center py-2">
                <a href="#!" className="link-primary">View all</a>
              </div>
            </div>
          </li>

          <li className="dropdown pc-h-item header-user-profile">
            <a className="pc-head-link dropdown-toggle arrow-none me-0" data-bs-toggle="dropdown" href="#" role="button" data-bs-auto-close="outside">
              <img
                src={profileData?.profileImage ? `http://localhost:3000/uploads/${profileData.profileImage}?t=${Date.now()}` : myImg}
                alt="user"
                className="user-avtar"
              />
              <span>{profileData?.name || "User"}</span>
            </a>
            <div className="dropdown-menu dropdown-user-profile dropdown-menu-end pc-h-dropdown">
              <div className="dropdown-header">
                <div className="d-flex mb-1">
                  <div className="flex-shrink-0">
                    <img
                      src={profileData?.profileImage ? `http://localhost:3000/uploads/${profileData.profileImage}?t=${Date.now()}` : myImg}
                      alt="Profile"
                      className="user-avtar wid-35"
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="mb-1">{profileData?.name || "User"}</h6>
                    <span>Software Developer</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="pc-head-link bg-transparent"
                    style={{ border: "none", outline: "none", padding: "6px" }}
                  >
                    <i className="ti ti-power text-danger"></i>
                  </button>
                </div>
              </div>

              <ul className="nav drp-tabs nav-fill nav-tabs" id="mydrpTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="drp-t1"
                    data-bs-toggle="tab"
                    data-bs-target="#drp-tab-1"
                    type="button"
                    role="tab"
                    aria-controls="drp-tab-1"
                    aria-selected="true"
                  >
                    <i className="ti ti-user"></i> Profile
                  </button>
                </li>
              </ul>

              <div className="tab-content" id="mysrpTabContent">
                <div
                  className="tab-pane fade show active"
                  id="drp-tab-1"
                  role="tabpanel"
                  aria-labelledby="drp-t1"
                >
                  {[
                    {
                      icon: "ti-edit-circle",
                      label: "Edit Profile",
                      onClick: () => navigate("/profile-page"),
                    },
                    {
                      icon: "ti-user",
                      label: "View Profile",
                      onClick: () => navigate("/viewprofile-page"),
                    },
                    {
                      icon: "ti-power",
                      label: "Logout",
                      onClick: handleLogout,
                    },
                  ].map((item, idx) => (
                    <a
                      key={idx}
                      href="#!"
                      className="dropdown-item"
                      onClick={(e) => {
                        e.preventDefault();
                        item.onClick();
                      }}
                      style={{
                        border: "none",
                        background: "transparent",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <i className={`ti ${item.icon}`} style={{ marginRight: "8px" }}></i>
                      <span>{item.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
