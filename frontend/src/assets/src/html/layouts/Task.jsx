import React, { useEffect, useState } from "react";
import { useAuthStore } from "./store/authStore";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Swal from "sweetalert2";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [editingTaskId, setEditingTaskId] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const tasksPerPage = 7;

  const {
    index,
    taskIndex,
    createTask,
    editTask,
    updateTask,
    destroyTask,
  } = useAuthStore();

  const fetchData = async () => {
    try {
      const priorityResponse = await index();
      if (priorityResponse?.status) {
        setPriorities(priorityResponse.data);
      }

      const taskResponse = await taskIndex();
      if (taskResponse?.status) {
        setTasks(taskResponse.data);
      }
    } catch (err) {
      console.error("Fetch failed", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: taskName,
        description: taskDesc,
        priorityId: taskPriority,
      };

      const response = editingTaskId
        ? await updateTask({ ...payload, taskId: editingTaskId })
        : await createTask(payload);

      if (response?.status) {
        setTaskName("");
        setTaskDesc("");
        setTaskPriority("");
        setEditingTaskId(null);
        fetchData();
      }
    } catch (err) {
      console.error("Task save failed", err);
    }
  };

  const handleEdit = async(task) => {
    setTaskName(task.name);
    setTaskDesc(task.description);
    setTaskPriority(task.priorityId?._id || "");
    setEditingTaskId(task._id);
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
        const response = await destroyTask(id);
        if (response?.status) {
          Swal.fire({
            title: "Deleted!",
            text: "Your task has been deleted.",
            icon: "success",
          });
          fetchData();
        }
      } catch (err) {
        console.error("Delete failed", err);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete task.",
          icon: "error",
        });
      }
    }
  };

  const indexOfLast = page * tasksPerPage;
  const indexOfFirst = indexOfLast - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="row">
          <div className="col-md-12 col-xl-12 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0">Task List</h4>
              <button
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#taskModal"
                onClick={() => {
                  setTaskName("");
                  setTaskDesc("");
                  setTaskPriority("");
                  setEditingTaskId(null);
                }}
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
                <form onSubmit={handleCreateTask} className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="taskModalLabel">
                      {editingTaskId ? "Edit Task" : "Add Task"}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={() => setEditingTaskId(null)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Task Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Task Description</label>
                      <textarea
                        className="form-control"
                        value={taskDesc}
                        onChange={(e) => setTaskDesc(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Select Priority</label>
                      <select
                        className="form-select"
                        value={taskPriority}
                        onChange={(e) => setTaskPriority(e.target.value)}
                        required
                      >
                        <option value="">-- Select Priority --</option>
                        {priorities.map((p) => (
                          <option key={p._id} value={p._id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-success"
                      data-bs-dismiss="modal"
                    >
                      {editingTaskId ? "Update Task" : "Create Task"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <table className="table table-bordered table-striped mt-3">
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
                    {currentTasks.length > 0 ? (
                      currentTasks.map((task, index) => (
                        <tr key={task._id}>
                          <td>{indexOfFirst + index + 1}</td>
                          <td>{task.name}</td>
                          <td>{task.description}</td>
                          <td>{task.priorityId?.name || "N/A"}</td>
                          <td>
                            <button
                              className="btn btn-warning btn-sm me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#taskModal"
                              onClick={() => handleEdit(task)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm ml-2"
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
                          No tasks found.
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
                      onChange={(e, value) => navigate(`?page=${value}`)}
                      color="primary"
                      shape="rounded"
                      renderItem={(item) => <PaginationItem {...item} />}
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
