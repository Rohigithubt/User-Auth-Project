import React, { useEffect, useState } from "react";
import myImg from "../../assets/images/logo-dark.svg";
import { useAuthStore } from "./store/authStore";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [showForm, setShowForm] = useState(false);

  const { taskIndex, createTask, priorityIndex } = useAuthStore();

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
      const response = await createTask({
        name: taskName,
        description: taskDesc,
        priority: taskPriority,
      });

      if (response?.status) {
        setTaskName("");
        setTaskDesc("");
        setTaskPriority("");
        setShowForm(false);
        fetchData();
      }
    } catch (err) {
      console.error("Task creation failed", err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <img src={myImg} alt="Logo" style={{ height: "40px" }} />
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Task List</h4>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
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
                Add Task
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowForm(false)}
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
                  {priorities.map((p) => (
                    <option key={p._id} value={p.name}>
                      {p.name} ({p.status})
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
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-success" data-bs-dismiss="modal">
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>

    
      <table className="table table-bordered table-striped mt-3">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Task Name</th>
            <th>Description</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <tr key={task._id}>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.priority}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Task;
