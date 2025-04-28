import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import './AuthForm.css';

const DeletePage = () => {
  const [userId, setUserId] = useState('');
  const [isDeleted,setisDeleted] =useState(false);
  const { destroy, isLoading, error } = useAuthStore();
  const navigate= useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await destroy(userId);
      setUserId(''); 
    } catch (error) {
      console.error('Delete failed', error);
    }
    navigate("/login");
  };

  return (
    <>
    <div className='delete'>
    <div className="delete-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h2 className='text-3xl font-bold text-blue-700'>Delete User</h2>
      <form onSubmit={handleDelete}   className="login-form">
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
          className='delete-in'
        />
        <button type="submit" disabled={isLoading} className='delete-btn'>
          {isLoading ? 'Deleting...' : 'Delete User'}
        </button>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </form>
    </div>
    </div>
    </>
  );
};

export default DeletePage;
