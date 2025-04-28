import React from 'react';
import { useAuthStore } from '../store/authStore';


const EditProfile = () => {
  const { userId, editProfile, isLoading, error } = useAuthStore();

  const handleEditProfile = async () => {
    try {
      if (userId) {
        await editProfile(userId);
        alert('Profile updated successfully!');
      } else {
        alert('User ID not found');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update profile.');
    }
  };

  return (
    <div style={{ padding: "20px"}}>
      <h2>Edit Profile</h2>

      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>

      <button onClick={handleEditProfile} disabled={isLoading}>
        {isLoading ? 'Updating...' : 'Update Profile'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default EditProfile;
