import React, { useEffect, useState } from "react";
import { useAuthStore } from "./store/authStore";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const {
    index,
    priorityIndex,
    taskIndex,
    createTask,
    updateTask,
    destroyTask,
  } = useAuthStore();

  const fetchData = async () => {
    try {
      const priorityResponse = await priorityIndex();
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
        priority: taskPriority,
      };

      const response = editingTaskId
        ? await updateTask({ ...payload, _id: editingTaskId })
        : await createTask(payload);

      if (response?.status) {
        setTaskName("");
        setTaskDesc("");
        setTaskPriority("");
        setEditingTaskId(null);
        setShowForm(false);
        fetchData();
      }
    } catch (err) {
      console.error("Task save failed", err);
    }
  };

  useEffect(() => {
    const fetchPriorities = async () => {
      try {
        const response = await index();
        if (response?.status) {
          setPriorities(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch priorities", err);
      }
    };

    fetchPriorities();
  }, []);

  const handleEdit = (task) => {
    setTaskName(task.name);
    setTaskDesc(task.description);
    setTaskPriority(task.priority);
    setEditingTaskId(task._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this task?");
      if (!confirmDelete) return;

      const response = await destroyTask(id);
      if (response?.status) {
        fetchData();
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };




  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="row">
          <div className="col-md-12 col-xl-12 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0">Task List</h4>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setTaskName("");
                  setTaskDesc("");
                  setTaskPriority("");
                  setEditingTaskId(null);
                  setShowForm(true);
                }}
                data-bs-toggle="modal"
                data-bs-target="#taskModal"
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
                      onClick={() => {
                        setShowForm(false);
                        setEditingTaskId(null);
                      }}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Task Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter task name"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Task Description</label>
                      <textarea
                        className="form-control"
                        placeholder="Enter task description"
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
                        {priorities.length > 0 ? (
                          priorities.map((p) => (
                            <option key={p._id} value={p.name}>
                              {p.name} ({p.status ? "Active" : "Inactive"})
                            </option>
                          ))
                        ) : (
                          <option value="" disabled>
                            No priorities found
                          </option>
                        )}
                      </select>
                    </div>

                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        setShowForm(false);
                        setEditingTaskId(null);
                      }}
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
                      <th style={{ width: "5%" }}>S.No</th>
                      <th style={{ width: "25%" }}>Task Name</th>
                      <th style={{ width: "30%" }}>Description</th>
                      <th style={{ width: "20%" }}>Priority</th>
                      <th style={{ width: "20%" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.length > 0 ? (
                      tasks.map((task, index) => (
                        <tr key={task._id}>
                          <td>{index + 1}</td>
                          <td>{task.name}</td>
                          <td>{task.description}</td>
                          <td>
                            <span className={getPriorityClass(task.priority)}>
                              {task.priority}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-warning me-2"
                              onClick={() => handleEdit(task)}
                              data-bs-toggle="modal"
                              data-bs-target="#taskModal"
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
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
