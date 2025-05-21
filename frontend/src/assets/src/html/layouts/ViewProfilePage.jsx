import React, { useEffect, useState } from 'react';
import { useAuthStore } from './store/authStore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';

const ViewProfilePage = () => {
  const { editProfile, isLoading, error } = useAuthStore();
  const [profileData, setProfileData] = useState({ name: '', email: '', img: '' });

  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      editProfile(userId)
        .then((res) => {
          const { name = '', email = '', img = '' } = res.data || {};
          setProfileData({ name, email, img });
        })
        .catch(() => {
          toast.error('Failed to load user data.');
        });
    }
  }, [userId]);

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="auth-main">
        <div className="auth-wrapper v3">
          <div className="auth-form">
            <div className="card my-5">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-end mb-4">
                  <h3 className="mb-0"><b>Profile Details</b></h3>
                </div>

                {/* Profile Image */}
                <div className="text-center mb-4">
                  {profileData.img ? (
                    <img
                      src={`http://localhost:3000/uploads/${profileData.img}`}
                      alt="Profile"
                      className="rounded-circle"
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                  ) : (
                    <div
                      className="rounded-circle bg-secondary d-inline-block"
                      style={{
                        width: '100px',
                        height: '100px',
                        lineHeight: '100px',
                        color: '#fff',
                        textAlign: 'center'
                      }}
                    >
                      No Image
                    </div>
                  )}
                </div>

                {isLoading && <p className="text-center text-muted mb-2">Loading...</p>}
                {error && <p className="text-danger text-center mb-2">{error}</p>}

                <div className="mb-3">
                  <label className="form-label mb-1">
                    <b>Name :- </b>{profileData.name}
                  </label>
                </div>

                <div className="mb-3">
                  <label className="form-label mb-1">
                    <b>Email :- </b>{profileData.email}
                  </label>
                </div>

                <div className="text-center mt-4">
                  <Link to="/profile-page" className="btn btn-primary">
                    Edit Profile
                  </Link>
                </div>
                <div className="text-center mt-3">
                  <Link to="/">Go to Dashboard</Link>
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

export default ViewProfilePage;
