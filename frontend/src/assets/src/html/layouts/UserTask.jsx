import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useAuthStore } from "./store/authStore";
import Swal from "sweetalert2";
import { Modal } from "bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserTask = () => {
  const [priorities, setPriorities] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Active");
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 7);
  const prioritiesPerPage = 7;

  const { indexPriority, createPriority, editPriority, updatePriority, destroyPriority } =
    useAuthStore();

  const fetchPriorities = async () => {
    try {

     const userId = localStorage.getItem("userId")
     
     const response = await indexPriority(userId);
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
  

   const userId = localStorage.getItem("userId")
      if (editId) {
        
        response = await updatePriority({
          priorityId: editId,
          name: title,
          status: isActive,
           createdBy: userId,
        });
        toast.success("Priority updated successfully!");
      }
       else {
         
        response = await createPriority(title, isActive,userId);
        toast.success("Priority added successfully!");
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

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${selectedIds.length} priorities.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete all!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      for (const id of selectedIds) {
        await destroyPriority(id);
      }
      await fetchPriorities();
      setSelectedIds([]);
      setSelectAll(false);
      Swal.fire("Deleted!", "Selected priorities have been deleted.", "success");
    }
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(currentPriorities.map((item) => item._id));
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

  const filteredPriorities = priorities.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPriorities.length / prioritiesPerPage);
  const indexOfLast = page * prioritiesPerPage;
  const indexOfFirst = indexOfLast - prioritiesPerPage;
  const currentPriorities = filteredPriorities.slice(indexOfFirst, indexOfLast);

  return (
    <div className="pc-container">
      <div className="pc-content">
        <style>{`
          .table {
            table-layout: fixed;
          }
          .table td.priority-name {
            max-width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        `}</style>
        <div className="row">
          <div className="col-md-12 col-xl-12 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Priority List</h4>
              <div>
                {selectedIds.length > 0 && (
                  <button className="btn btn-danger me-2" onClick={handleBulkDelete}>
                    Delete Selected
                  </button>
                )}
                <button
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#priorityModal"
                  onClick={resetForm}
                >
                  Add Priority
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
                        className={`form-control ${errors.title ? "is-invalid" : ""}`}
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
                    <button type="submit" className="btn btn-success">
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
                      <th style={{ width: "50px" }}>
                        <input type="checkbox" checked={selectAll} onChange={toggleSelectAll} />
                      </th>
                      <th style={{ width: "60px" }}>S.No</th>
                      <th style={{ width: "200px" }}>Priority Name</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPriorities.length ? (
                      currentPriorities.map((item, idx) => (
                        <tr key={item._id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(item._id)}
                              onChange={() => handleCheckboxChange(item._id)}
                            />
                          </td>
                          <td>{indexOfFirst + idx + 1}</td>
                          <td className="priority-name" title={item.name}>
                            {item.name}
                          </td>
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
                        <td colSpan="5" className="text-center">
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
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default UserTask;

