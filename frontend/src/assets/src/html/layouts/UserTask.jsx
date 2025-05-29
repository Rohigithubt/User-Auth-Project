import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Swal from "sweetalert2";
import { Modal } from "bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "./store/authStore";

const UserTask = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [usersname, setUsersname] = useState("");
  const [emailId, setEmailId] = useState("");
  const [userstate, setUserstate] = useState(true);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  console.log(userstate, "userstate");


  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const tasksPerPage = 7;

  const { indexUser, registerUser, editProfile, updateProfile, destroy } = useAuthStore();

  const fetchTasks = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await indexUser(userId);
      if (response?.status) {
        const sorted = [...response.data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setTasks(sorted);
      }
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const resetForm = () => {
    setUsersname("");
    setEmailId("");
    setUserstate(true);
    setEditingTaskId(null);
    setErrors({});
    setApiError(null);
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    setErrors({});
    setApiError(null);

    if (!usersname.trim()) {
      setErrors({ name: "User name is required" });
      return;
    }
    if (!emailId.trim()) {
      setErrors({ email: "Email is required" });
      return;
    }

    const userId = localStorage.getItem("userId");
    const payload = {
      name: usersname,
      email: emailId,
      userstatus: userstate,
      createdBy: userId,
    };


    try {
      let response;

      if (editingTaskId) {
        response = await updateProfile({ ...payload, userId: editingTaskId });
        if (response?.status) toast.success("User updated successfully!");
      } else {
        response = await registerUser(payload);






        if (response?.status) toast.success("User created successfully!");
      }

      if (response?.status) {
        await fetchTasks();

        const modalEl = document.getElementById("taskModal");
        if (modalEl) {
          const modal = Modal.getOrCreateInstance(modalEl);
          modal.hide();
        }

        resetForm();

        if (!editingTaskId) {
          navigate("?page=1", { replace: true });
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        setApiError(response?.message || "An error occurred");
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || "Server error, please try again.";
      setApiError(message);
    }
  };

  const handleEdit = async (userId) => {
    try {
      const response = await editProfile(userId);
      if (response?.status) {
        const user = response.data;
        setUsersname(user.name);
        setEmailId(user.email);
        setUserstate(user?.userstatus);
        setEditingTaskId(user._id);
        setErrors({});
        setApiError(null);
      }
    } catch (err) {
      console.error("Edit fetch failed", err);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await destroy(id);
        if (response?.status) {
          await fetchTasks();
          Swal.fire("Deleted!", "User has been deleted.", "success");
        }
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${selectedIds.length} users.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete all!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      for (const id of selectedIds) {
        await destroy(id);
      }
      await fetchTasks();
      setSelectedIds([]);
      setSelectAll(false);
      Swal.fire("Deleted!", "Selected users have been deleted.", "success");
    }
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(currentTasks.map((task) => task._id));
    }
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const indexOfLast = page * tasksPerPage;
  const indexOfFirst = indexOfLast - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirst, indexOfLast);

  return (
    <div className="pc-container">
      <div className="pc-content">
        <ToastContainer />
        <style>{`
          .table {
            table-layout: fixed;
          }
          .table td {
            max-width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        `}</style>

        <div className="row">
          <div className="col-md-12 col-xl-12 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Created User Details</h4>
              <div>
                {selectedIds.length > 0 && (
                  <button className="btn btn-danger me-2" onClick={handleBulkDelete}>
                    Delete Selected
                  </button>
                )}
                <button
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#taskModal"
                  onClick={resetForm}
                  style={{ marginRight: "90px" }}
                >
                  Create User
                </button>
              </div>
            </div>

            <div
              className="mb-3 d-flex justify-content-end"
              style={{ marginRight: "5px", marginTop: "-55px" }}
            >
              <div className="search-box">
                <input
                  type="text"
                  className="search-txt"
                  placeholder="Search User"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <a href="#" className="search-btn" onClick={(e) => e.preventDefault()}>
                  <i className="bi bi-search" style={{ fontSize: "20px" }}></i>
                </a>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th style={{ width: "50px" }}>
                        <input type="checkbox" checked={selectAll} onChange={toggleSelectAll} />
                      </th>
                      <th style={{ width: "60px" }}>S.No</th>
                      <th>User Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTasks.length ? (
                      currentTasks.map((task, idx) => (
                        <tr key={task._id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(task._id)}
                              onChange={() => handleCheckboxChange(task._id)}
                            />
                          </td>
                          <td>{indexOfFirst + idx + 1}</td>
                          <td title={task.name}>{task.name || "No user"}</td>
                          <td title={task.email}>{task.email}</td>
                          <td title={task.userstatus}>{task.userstatus ? "Active" : "Inactive"}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-warning me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#taskModal"
                              onClick={() => handleEdit(task._id)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(task._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No user details found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {totalPages > 1 && (
                  <div className="d-flex justify-content-center mt-4">
                    <Pagination
                      count={totalPages}
                      page={page}
                      renderItem={(item) => (
                        <PaginationItem
                          component="a"
                          {...item}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`?page=${item.page}`);
                          }}
                        />
                      )}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="taskModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">{editingTaskId ? "Edit User" : "Create User"}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <form onSubmit={handleCreateOrUpdate}>
                <div className="modal-body">
                  {apiError && <div className="alert alert-danger">{apiError}</div>}
                  <div className="mb-3">
                    <label>User Name</label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
                      value={usersname}
                      onChange={(e) => setUsersname(e.target.value)}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>
                  <div className="mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      value={emailId}
                      onChange={(e) => setEmailId(e.target.value)}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                  <div className="mb-3">
                    <label>Status</label>
                    <select
                      className="form-select"
                      value={userstate}
                      onChange={(e) => setUserstate(e.target.value)}
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingTaskId ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTask;
