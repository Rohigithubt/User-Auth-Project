import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useAuthStore } from "./store/authStore";
import Swal from "sweetalert2";
import { Modal } from 'bootstrap'; 


const Priority = () => {
  const [priorities, setPriorities] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Active");
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const prioritiesPerPage = 7;

  const { indexPriority, createPriority, editPriority, updatePriority, destroyPriority } = useAuthStore();

  const fetchPriorities = async () => {
    try {
      const response = await indexPriority();
      if (response?.status) {
        const sorted = [...response.data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPriorities(sorted);
      }
    } catch (err) {
      console.error("Failed to fetch priorities", err);
    }
  };

  useEffect(() => {
    fetchPriorities();
  }, []);

  const resetForm = () => {
    setTitle("");
    setStatus("Active");
    setEditId(null);
    setErrors({});
    setApiError(null);
  };

  const handleCreateOrUpdate = async (e) => {
  e.preventDefault();
  setErrors({});
  setApiError(null);

  if (!title.trim()) {
    setErrors({ title: "Priority name is required" });
    return;
  }

  try {
    const isActive = status === "Active";
    let response;

    if (editId) {
      response = await updatePriority({
        priorityId: editId,
        name: title,
        status: isActive,
      });
    } else {
      response = await createPriority(title, isActive);
    }

    if (response?.status) {
      await fetchPriorities();

      const modalEl = document.getElementById("priorityModal");
      if (modalEl) {
        const modal = Modal.getOrCreateInstance(modalEl); 
        modal.hide();
      }

      resetForm();

      if (!editId) {
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
  const handleEdit = async (id) => {
    try {
      const response = await editPriority(id);
      if (response?.status) {
        const data = response.data;
        setTitle(data.name);
        setStatus(data.status ? "Active" : "Inactive");
        setEditId(id);
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
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await destroyPriority(id);
        if (response?.status) {
          await fetchPriorities();
          Swal.fire({
            title: "Deleted!",
            text: "Priority has been deleted.",
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

  const totalPages = Math.ceil(priorities.length / prioritiesPerPage);
  const indexOfLast = page * prioritiesPerPage;
  const indexOfFirst = indexOfLast - prioritiesPerPage;
  const currentPriorities = priorities.slice(indexOfFirst, indexOfLast);

  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="row">
          <div className="col-md-12 col-xl-12 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Priority List</h4>
              <button
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#priorityModal"
                onClick={() => {
                  resetForm();
                }}
              >
                Add Priority
              </button>
            </div>

            <div
              className="modal fade"
              id="priorityModal"
              tabIndex="-1"
              aria-labelledby="priorityModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <form
                  onSubmit={handleCreateOrUpdate}
                  className="modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="modal-header">
                    <h5 className="modal-title" id="priorityModalLabel">
                      {editId ? "Edit Priority" : "Add Priority"}
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
                      <label htmlFor="priorityName" className="form-label">
                        Priority Name
                      </label>
                      <input
                        type="text"
                        id="priorityName"
                        className={`form-control ${
                          errors.title ? "is-invalid" : ""
                        }`}
                        placeholder="Enter Priority Name"
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value);
                          setErrors({});
                          setApiError(null);
                        }}
                      />
                      {errors.title && (
                        <div className="invalid-feedback">{errors.title}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="priorityStatus" className="form-label">
                        Status
                      </label>
                      <select
                        id="priorityStatus"
                        className="form-control"
                        value={status}
                        onChange={(e) => {
                          setStatus(e.target.value);
                          setApiError(null);
                        }}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
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
                    <button type="submit" className="btn btn-success" >
                      {editId ? "Update" : "Create"}
                 
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
                      <th>Priority Name</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPriorities.length ? (
                      currentPriorities.map((item, idx) => (
                        <tr key={item._id}>
                          <td>{indexOfFirst + idx + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.status ? "Active" : "Inactive"}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-warning me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#priorityModal"
                              onClick={() => handleEdit(item._id)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(item._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No priorities found
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

export default Priority;
