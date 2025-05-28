import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "./store/authStore";


const UserTaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const tasksPerPage = 7;

  const { taskIndex } = useAuthStore();

  const fetchTasks = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const userId2 = localStorage.getItem("createdBy")
      const response = await taskIndex(userId2);

      if (response?.status) {
        const sorted = [...response.data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setUsers(sorted);
      }
      if (response?.status) {
        const userId = localStorage.getItem("userId");
        const filteredAndSorted = response.data
          .filter(task => task.AssignedUserId === userId)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setTasks(filteredAndSorted);
      }

    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const totalPages = Math.ceil(tasks.length / tasksPerPage);
  const indexOfLast = page * tasksPerPage;
  const indexOfFirst = indexOfLast - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirst, indexOfLast);

  return (
    <div className="pc-container">
      <div className="pc-content">
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
              <h4>Assigned Task</h4>
            </div>

            <div className="card">
              <div className="card-body">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th style={{ width: "60px" }}>S.No</th>
                      <th>Task</th>
                      <th>Task Description</th>
                      <th>Priority</th>
                      <th>Select Status</th>
                    </tr>
                  </thead>
                  <tbody>

                    {currentTasks.length ? (
                      currentTasks
                        .filter((task) => {
                          const userId = localStorage.getItem("userId");
                          return task.AssignedUserId === userId;
                        })
                        .map((task, idx) => (
                          <tr key={task._id}>
                            <td>{indexOfFirst + idx + 1}</td>
                            <td>{task.name}</td>
                            <td>{task.description}</td>
                            <td>{task.priorityName}</td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No task details found
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
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default UserTaskList;
