import React, { useEffect, useState } from "react";
import { useAuthStore } from "./store/authStore";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Swal from "sweetalert2";
import { Modal } from "bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 7);
  const tasksPerPage = 7;

  const {
    indexPriority,
    taskIndex,
    createTask,
    editTask,
    updateTask,
    destroyTask,
  } = useAuthStore();

  const fetchData = async () => {
    try {
      const priorityRes = await indexPriority();
      if (priorityRes?.status) {
        setPriorities(priorityRes.data);
      }

      const taskRes = await taskIndex();
      if (taskRes?.status) {
        const sorted = [...taskRes.data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setTasks(sorted);
      }
    } catch (err) {
      console.error("Fetch failed", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setTaskName("");
    setTaskDesc("");
    setTaskPriority("");
    setEditingTaskId(null);
    setErrors({});
    setApiError(null);
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    setErrors({});
    setApiError(null);

    if (!taskName.trim()) {
      setErrors({ name: "Task name is required" });
      return;
    }

    if (!taskPriority) {
      setErrors({ priority: "Please select a priority" });
      return;
    }

    const payload = {
      name: taskName,
      description: taskDesc,
      priorityId: taskPriority,
    };

    try {
      let response;

      if (editingTaskId) {
        response = await updateTask({ ...payload, taskId: editingTaskId });
        if (response?.status) toast.success("Task updated successfully!");
      } else {
        response = await createTask(payload);
        if (response?.status) toast.success("Task added successfully!");
      }

      if (response?.status) {
        await fetchData();

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

  const handleEdit = async (taskId) => {
    try {
      const updatedTask = await editTask(taskId);
      if (updatedTask) {
        setTaskName(updatedTask.name);
        setTaskDesc(updatedTask.description);
        setTaskPriority(updatedTask.priorityId?._id || "");
        setEditingTaskId(updatedTask._id);
        setErrors({});
        setApiError(null);
      } else {
        Swal.fire({
          title: "Error",
          text: "Failed to fetch task data",
          icon: "error",
        });
      }
    } catch (err) {
      console.error("Edit fetch failed", err);
      Swal.fire({
        title: "Error",
        text: "Something went wrong while fetching task data",
        icon: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await destroyTask(id);
        if (response?.status) {
          await fetchData();
          Swal.fire({
            title: "Deleted!",
            text: "Task has been deleted.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
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
      text: `You are about to delete ${selectedIds.length} tasks.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete all!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      for (const id of selectedIds) {
        await destroyTask(id);
      }
      await fetchData();
      setSelectedIds([]);
      setSelectAll(false);
      Swal.fire("Deleted!", "Selected tasks have been deleted.", "success");
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
        <div className="row">
          <div className="col-md-12 col-xl-12 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Task List</h4>
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
                >
                  Add Task
                </button>
              </div>
            </div>


            <div className="mb-3 d-flex justify-content-end" style={{ marginRight: "150px", marginTop: "-55px" }}>
              <div className="search-box">
                <input
                  type="text"
                  className="search-txt"
                  placeholder="Search Task"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <a href="#" className="search-btn" onClick={(e) => e.preventDefault()}>
                  <i className="bi bi-search" style={{ fontSize: "20px" }}></i>
                </a>
              </div>
            </div>

            <div
              className="modal fade"
              id="taskModal"
              tabIndex="-1"
              aria-labelledby="taskModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <form
                  onSubmit={handleCreateOrUpdate}
                  className="modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="modal-header">
                    <h5 className="modal-title" id="taskModalLabel">
                      {editingTaskId ? "Edit Task" : "Add Task"}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={resetForm}
                    ></button>
                  </div>
                  <div className="modal-body">
                    {apiError && (
                      <div className="alert alert-danger" role="alert">
                        {apiError}
                      </div>
                    )}
                    <div className="mb-3">
                      <label htmlFor="taskName" className="form-label">
                        Task Name
                      </label>
                      <input
                        type="text"
                        id="taskName"
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                      />
                      {errors.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="taskDesc" className="form-label">
                        Description
                      </label>
                      <textarea
                        id="taskDesc"
                        className="form-control"
                        value={taskDesc}
                        onChange={(e) => setTaskDesc(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="taskPriority" className="form-label">
                        Priority
                      </label>
                      <select
                        id="taskPriority"
                        className={`form-control ${errors.priority ? "is-invalid" : ""}`}
                        value={taskPriority}
                        onChange={(e) => setTaskPriority(e.target.value)}
                      >
                        <option value="">Select Priority</option>
                        {priorities
                          .filter((priority) => priority.status === true)
                          .map((priority) => (
                            <option key={priority._id} value={priority._id}>
                              {priority.name}
                            </option>
                          ))}
                      </select>
                      {errors.priority && (
                        <div className="invalid-feedback">{errors.priority}</div>
                      )}
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={resetForm}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-success">
                      {editingTaskId ? "Update" : "Create"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={toggleSelectAll}
                        />
                      </th>
                      <th>S.No</th>
                      <th>Task Name</th>
                      <th>Description</th>
                      <th>Priority</th>
                      <th>Actions</th>
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
                          <td
                            style={{
                              maxWidth: "200px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                            title={task.name}
                          >
                            {task.name}
                          </td>
                          <td
                            style={{
                              maxWidth: "300px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                            title={task.description}
                          >
                            {task.description}
                          </td>
                          <td>{task.priorityId?.name || "-"}</td>
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
                          No tasks found
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
      </div>

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Task;
