import { create } from "zustand";
import axios from "axios";
// import { updateprofile } from "../../../Backend/controllers/userApiControllers";
// import { destroy } from "../../../Backend/controllers/userApiControllers";

// const API_URL = import.meta.env.MODE === "development" ? import.meta.env.VITE_API_URL : "/api";
const API_URL = 'http://localhost:3000/api'
const API_URL2 = 'http://localhost:3000/api/priority'
const API_URL3 = 'http://localhost:3000/api/task'



axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	// isCheckingAuth: true,
	message: null,

	register: async (name, email, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/register`, { name, email, password });
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
		} catch (error) {
			set({ error: error.response.data.message || "Error signing up", isLoading: false });
			throw error;
		}
	},
	login: async (email, password) => {
		set({ isLoading: true, error: null });
		try {
			// console.log(email,password)
			const response = await axios.post(`${API_URL}/login`, { email, password });
			set({
				isAuthenticated: true,
				user: response.data.user,
				error: null,
				isLoading: false,
			});
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
			set({ error: error.response.data.message || "Error verifying email", isLoading: false });
			throw error;
		}
	},
	// checkAuth: async () => {
	// 	set({ isCheckingAuth: true, error: null });
	// 	try {
	// 		const response = await axios.get(`${API_URL}/check-auth`);
	// 		set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
	// 	} catch (error) {
	// 		set({ error: null, isCheckingAuth: false, isAuthenticated: false });
	// 	}
	// },
	forgetPassword: async (email) => {
		set({ isLoading: true, error: null });
		try {
			console.log(API_URL, "API_URL")
			const response = await axios.post(`${API_URL}/forget-password`, { email });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error sending reset password email",
			});
			throw error;
		}
	},
	resetPassword: async (token, password, confirmPassword) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/reset-password`, {
				token,
				password,
				confirmPassword,
			});
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response?.data?.message || "Error resetting password",
			});
			throw error;
		}
	},

	destroy: async (userId) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/destroy`, { userId });
			set({ isLoading: false });
			return response.data;  // Optional: return response if you need it
		} catch (error) {
			set({
				error: error.response?.data?.message || "Error deleting user",
				isLoading: false,
			});
			throw error;
		}
	},

	editprofile: async (userId) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/edit-profile`, { userId });
			set((state) => ({
				user: { ...state.user, ...response.data.user },
				error: null,
				isLoading: false,
			}));
		} catch (error) {
			set({ error: error.response?.data?.message || "Error editing profile", isLoading: false });
			throw error;
		}
	},

	updateprofile: async (userId, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/update-profile`, {
				userId,
				password, // send password too
			});

			set((state) => ({
				user: { ...state.user, ...response.data.user },
				error: null,
				isLoading: false,
			}));
		} catch (error) {
			set({
				error: error.response?.data?.error || "Error updating profile",
				isLoading: false,
			});
			throw error;
		}
	},


	index: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL2}`);
			set({ isLoading: false });
			return response.data;
		} catch (error) {
			set({
				error: error.response?.data?.error || "Something went wrong",
				isLoading: false,
			});
			throw error;
		}
	},


	create: async (title, isactive) => {
		set({ isLoading: true, error: null });

		try {
			const response = await axios.post(`${API_URL2}/create`, { name: title, status: isactive });
			console.log(response, "response");

			set({ isLoading: false });
			return response.data;
		} catch (error) {
			set({
				error: error.response?.data?.error || "Failed to create priority",
				isLoading: false,
			});
			throw error;
		}
	},

	edit: async (priorityId) => {
		set({ isLoading: true, error: null });

		try {
			const response = await axios.post(`${API_URL2}/edit`, { priorityId });
			set({ isLoading: false });
			return response.data;
		} catch (error) {
			set({
				error: error.response?.data?.error || "Failed to fetch priority data",
				isLoading: false,
			});
			throw error;
		}
	},

	update: async (priorityData) => {
		console.log(priorityData, "priorityData")
		set({ isLoading: true, error: null });

		try {
			const response = await axios.post(`${API_URL2}/update`, priorityData);
			set({ isLoading: false });
			return response.data;
		} catch (error) {
			set({
				error: error.response?.data?.error || "Failed to update priority",
				isLoading: false,
			});
			throw error;
		}
	},

	destroy: async (priorityId) => {
		set({ isLoading: true, error: null });

		try {
			const response = await axios.post(`${API_URL2}/destroy`, { priorityId });
			set({ isLoading: false });
			return response.data;
		} catch (error) {
			set({
				error: error.response?.data?.error || "Failed to delete priority",
				isLoading: false,
			});
			throw error;
		}
	},



	//---------------------------------------------------task authstore.js------------------------------


	// index: async () => {
	// 	set({ isLoading: true, error: null });
	// 	try {
	// 		const response = await axios.post(`${API_URL3}`);
	// 		set({ isLoading: false });
	// 		return response.data;
	// 	} catch (error) {
	// 		set({
	// 			error: error.response?.data?.error || "Something went wrong",
	// 			isLoading: false,
	// 		});
	// 		throw error;
	// 	}
	// },


	// create: async (title, isactive) => {
	// 	set({ isLoading: true, error: null });

	// 	try {
	// 		const response = await axios.post(`${API_URL3}/create`, { name: title});
	// 		console.log(response, "response");

	// 		set({ isLoading: false });
	// 		return response.data;
	// 	} catch (error) {
	// 		set({
	// 			error: error.response?.data?.error || "Failed to create priority",
	// 			isLoading: false,
	// 		});
	// 		throw error;
	// 	}
	// },

	// edit: async (taskId) => {
	// 	set({ isLoading: true, error: null });

	// 	try {
	// 		const response = await axios.post(`${API_URL3}/edit`, { taskId });
	// 		set({ isLoading: false });
	// 		return response.data;
	// 	} catch (error) {
	// 		set({
	// 			error: error.response?.data?.error || "Failed to fetch priority data",
	// 			isLoading: false,
	// 		});
	// 		throw error;
	// 	}
	// },

	// update: async (updateData) => {
	// 	console.log(updateData, "priorityData")
	// 	set({ isLoading: true, error: null });

	// 	try {
	// 		const response = await axios.post(`${API_URL3}/update`, updateData);
	// 		set({ isLoading: false });
	// 		return response.data;
	// 	} catch (error) {
	// 		set({
	// 			error: error.response?.data?.error || "Failed to update priority",
	// 			isLoading: false,
	// 		});
	// 		throw error;
	// 	}
	// },

	// destroy: async (taskId) => {
	// 	set({ isLoading: true, error: null });

	// 	try {
	// 		const response = await axios.post(`${API_URL3}/destroy`, { taskId });
	// 		set({ isLoading: false });
	// 		return response.data;
	// 	} catch (error) {
	// 		set({
	// 			error: error.response?.data?.error || "Failed to delete priority",
	// 			isLoading: false,
	// 		});
	// 		throw error;
	// 	}
	// },


	taskIndex: async () => {
   set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL3}`);
			set({ isLoading: false });
			return response.data;
		} catch (error) {
			set({
				error: error.response?.data?.error || "Something went wrong",
				isLoading: false,
			});
			throw error;
		}
  },

  // Create a new task
  createTask: async (taskData) => {
    try {
      const response = await axios.post(`${API_URL3}/create`, taskData);
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
    set({
      error: error.response?.data?.error || "Failed to delete task",
      isLoading: false,
    });
    throw error;
  }
},



}));
