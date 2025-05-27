import { create } from "zustand";
import axios from "axios";

const API_URL = 'http://localhost:3000/api';
const API_URL2 = 'http://localhost:3000/api/priority';
const API_URL3 = 'http://localhost:3000/api/task';

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  message: null,

   index: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      console.log("userId:", userId);

      const response = await axios.post(`${API_URL}/`, { userId });

      set({ isLoading: false });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Something went wrong";
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  indexUser: async (userId) => {
  set({ isLoading: true, error: null });
  try {
    console.log(userId, "userIduserId");

    const response = await axios.post(`${API_URL}/index-user`, { userId: userId });
    set({ isLoading: false });
    return response.data;
  } catch (error) {
    set({ error: error.response?.data?.error || "Something went wrong", isLoading: false });
    throw error;
  }
},


  register: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/register`, { name, email, password});

      
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || "Error signing up", isLoading: false });
      throw error;
    }
  },

registerUser: async (payload) => {
  set({ isLoading: true, error: null });
  try {
    const response = await axios.post(`${API_URL}/register-user`, payload);

    if (response.data?.status) {
      set({
        user: payload, 
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      throw new Error(response.data?.message || "Registration failed");
    }

    return response.data;
  } catch (error) {
    set({
      error: error.response?.data?.message || "Error signing up",
      isLoading: false,
    });
    throw error;
  }
},
  
  login: async (email, password) => {
  set({ isLoading: true, error: null });
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const { token, user } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('userId', user._id); 
    localStorage.setItem('createdBy',user.createdBy); 

    set({ user, isAuthenticated: true, error: null, isLoading: false });
    return response;
  } catch (error) {
    set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
    throw error;
  }
},

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({ user: null, isAuthenticated: false, error: null, isLoading: false });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || "Error verifying email", isLoading: false });
      throw error;
    }
  },

  forgetPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/forget-password`, { email });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      const errMsg = error?.response?.data?.error || error?.response?.data?.message || "Error sending reset password email";
      set({ error: errMsg, isLoading: false });
      throw new Error(errMsg);
    }
  },

  resetPassword: async (token, password, confirmPassword) => {
    set({ isLoading: true, error: null });
    try {
      if (!token) throw new Error("Token is missing or invalid");
      const response = await axios.post(`${API_URL}/reset-password`, { password, confirmPassword, token });
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || error.message || "Reset password failed", isLoading: false });
      throw error;
    }
  },

    editProfile: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/edit-profile`, { userId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ isLoading: false, user: response.data.data });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.error || "Failed to fetch profile",
        isLoading: false,
      });
      throw error;
    }
  },

  updateProfile: async (profileData) => {
    set({ isLoading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/update-profile`, profileData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ isLoading: false, user: response.data.user });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.error || "Failed to update profile",
        isLoading: false,
      });
      throw error;
    }
  },

  destroy: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/destroy`, { userId });
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || "Error deleting user", isLoading: false });
      throw error;
    }
  },

  // editprofile: async (userId) => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     const response = await axios.post(`${API_URL}/edit-profile`, { userId });
  //     set((state) => ({ user: { ...state.user, ...response.data.user }, error: null, isLoading: false }));
  //   } catch (error) {
  //     set({ error: error.response?.data?.message || "Error editing profile", isLoading: false });
  //     throw error;
  //   }
  // },

  // updateprofile: async (userId, password) => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     const response = await axios.post(`${API_URL}/update-profile`, { userId, password });
  //     set((state) => ({ user: { ...state.user, ...response.data.user }, error: null, isLoading: false }));
  //   } catch (error) {
  //     set({ error: error.response?.data?.error || "Error updating profile", isLoading: false });
  //     throw error;
  //   }
  // },



  

  indexPriority: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      console.log(userId,"userIduserId");
      
      const response = await axios.post(`${API_URL2}`,{userId:userId});
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.error || "Something went wrong", isLoading: false });
      throw error;
    }
  },

  createPriority: async (title, isactive,userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL2}/create`, { name: title, status: isactive , createdBy: userId});
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.error || "Failed to create priority", isLoading: false });
      throw error;
    }
  },

  editPriority: async (priorityId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL2}/edit`, { priorityId });
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.error || "Failed to fetch priority data", isLoading: false });
      throw error;
    }
  },

  updatePriority: async (priorityData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL2}/update`, priorityData);
      console.log(priorityData,"priorityDatapriorityData");
      
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.error || "Failed to update priority", isLoading: false });
      throw error;
    }
  },

  destroyPriority: async (priorityId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL2}/destroy`, { priorityId });
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.error || "Failed to delete priority", isLoading: false });
      throw error;
    }
  },




  taskIndex: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL3}/`,{userId:userId});
      console.log(response.data,"ressssss");
      
      
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.error || "Something went wrong", isLoading: false });
      throw error;
    }
  },

  createTask: async (taskData) => {
    try {
      const response = await axios.post(`${API_URL3}/create`, taskData);
      console.log(response,"responseeeeeeeee");

      console.log(taskData,"taskData");
      
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  },

  editTask: async (taskId) => {
    try {
      const response = await axios.post(`${API_URL3}/edit`, { taskId });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching task for edit:", error);
      throw error;
    }
  },

  updateTask: async (taskData) => {
    try {
      const response = await axios.post(`${API_URL3}/update`, taskData);
      return response.data.task;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  },

  destroyTask: async (taskId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL3}/destroy`, { taskId });
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.error || "Failed to delete task", isLoading: false });
      throw error;
    }
  },

}));


