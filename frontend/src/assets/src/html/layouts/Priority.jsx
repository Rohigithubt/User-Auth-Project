import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useAuthStore } from "./store/authStore";
import Swal from "sweetalert2";

const Priority = () => {
  const [priorities, setPriorities] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Active");
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const prioritiesPerPage = 7;

  const { index, create, edit, update, destroy } = useAuthStore();

  const fetchPriorities = async () => {
    try {
      const response = await index();
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
    setShowForm(false);
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      const isactive = status === "Active";

      if (editId) {
        const response = await update({
          priorityId: editId,
          name: title,
          status: isactive,
        });
        if (response?.status) {
          await fetchPriorities();
          resetForm();
        }
      } else {
        const response = await create(title, isactive);
        if (response?.status) {
          await fetchPriorities();

          resetForm();

          navigate("?page=1", { replace: true });

          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    } catch (err) {
      console.error("Create/Update failed", err);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await edit(id);
      if (response?.status) {
        const data = response.data;
        setTitle(data.name);
        setStatus(data.status ? "Active" : "Inactive");
        setEditId(id);
        setShowForm(true);
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
        const response = await destroy(id);
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
                  setShowForm(true);
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
                    <div className="mb-3">
                      <label className="form-label">Priority Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Priority Name"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select
                        className="form-control"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
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
                    <button
                      type="submit"
                      className="btn btn-success"
                      data-bs-dismiss="modal"
                    >
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
                      page={page}
                      count={totalPages}
                      color="primary"
                      renderItem={(item) => (
                        <PaginationItem
                          {...item}
                          onClick={() => {
                            const targetPage = item.page;
                            navigate(`?page=${targetPage}`);
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
