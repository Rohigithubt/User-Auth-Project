import React, { useEffect, useState } from "react";
import { useAuthStore } from "./store/authStore";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Swal from "sweetalert2";
import { Modal } from "bootstrap";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
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
      const response = editingTaskId
        ? await updateTask({ ...payload, taskId: editingTaskId })
        : await createTask(payload);

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

  const totalPages = Math.ceil(tasks.length / tasksPerPage);
  const indexOfLast = page * tasksPerPage;
  const indexOfFirst = indexOfLast - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirst, indexOfLast);

  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="row">
          <div className="col-md-12 col-xl-12 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Task List</h4>
              <button
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#taskModal"
                onClick={resetForm}
              >
                Add Task
              </button>
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
                        placeholder="Enter Task Name"
                        value={taskName}
                        onChange={(e) => {
                          setTaskName(e.target.value);
                          setErrors({});
                          setApiError(null);
                        }}
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
                        placeholder="Enter Task Description"
                        value={taskDesc}
                        onChange={(e) => {
                          setTaskDesc(e.target.value);
                          setApiError(null);
                        }}
                      ></textarea>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="taskPriority" className="form-label">
                        Priority
                      </label>
                      <select
                        id="taskPriority"
                        className={`form-control ${errors.priority ? "is-invalid" : ""}`}
                        value={taskPriority}
                        onChange={(e) => {
                          setTaskPriority(e.target.value);
                          setApiError(null);
                        }}
                      >
                        <option value="">Select Priority</option>
                        {priorities.map((priority) => (
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
                          <td>{indexOfFirst + idx + 1}</td>
                          <td>{task.name}</td>
                          <td>{task.description}</td>
                          <td>{task.priorityId?.name || "N/A"}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-warning me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#taskModal"
                              onClick={() => handleEdit(task)}
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
                        <td colSpan="5" className="text-center">
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
    </div>
  );
};

export default Task;
