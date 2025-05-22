import React, { useEffect, useState } from 'react';
import { useAuthStore } from './store/authStore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';

const backendBaseURL = 'http://localhost:3000'; 

const ProfilePage = () => {
  const { user, editProfile, updateProfile, isLoading, error } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    img: null,
    preview: '',
  });

  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      editProfile(userId)
        .then((res) => {
          const { name = '', email = '', img = '' ,password=''} = res.data || {};
          const imageURL = img ? `${backendBaseURL}${img}` : '';
          setFormData({ name, email, password, img, preview: imageURL });
        })
        .catch(() => {
          toast.error('Failed to load user data.');
        });
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (formData.preview) {
        URL.revokeObjectURL(formData.preview); 
      }
      setFormData((prev) => ({
        ...prev,
        img: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = new FormData();
    data.append('userId', userId);
    data.append('name', formData.name);
    data.append('email', formData.email);
    
    if (formData.password.trim()) {
      data.append('password', formData.password);
    }

    if (formData.img && formData.img !== 'null') {
      data.append('image', formData.img);
    }

    await updateProfile(data);
    toast.success('Profile updated successfully!');
    setFormData((prev) => ({ ...prev, password: '' }));
  } catch (err) {
    toast.error('Failed to update profile.');
  }
};

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="auth-main">
        <div className="auth-wrapper v3">
          <div className="auth-form">
            <div className="card my-5">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-end mb-4">
                  <h3 className="mb-0"><b>Edit Profile</b></h3>
                </div>

                {isLoading && <p className="text-center text-muted mb-2">Loading...</p>}
                {error && <p className="text-danger text-center mb-2">{error}</p>}

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="text-center mb-3">
                    {formData.preview && (
                      <img
                        src={formData.preview}
                        alt="Profile"
                        className="rounded-circle"
                        width="100"
                        height="100"
                      />
                    )}
                  </div>

                  <div className="form-group mb-3">
                    <label className="form-label">Upload Profile Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="form-label">Name</label>
                    <input
                      name="name"
                      type="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Your Name"
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="form-label">Email</label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Your Email"
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="form-label">New Password</label>
                    <input
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="New Password"
                    />
                  </div>

                  <div className="d-grid mt-4">
                    <button type="submit" className="btn btn-primary">
                      Update Profile
                    </button>
                  </div>
                  <div className="text-center mt-3">
                    <Link to="/">Go to Dashboard</Link>
                  </div>
                </form>
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
    </>
  );
};

export default ProfilePage;
