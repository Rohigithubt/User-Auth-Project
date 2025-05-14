import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo-dark.svg";
import { useAuthStore } from "./store/authStore";

const Priority = () => {
  const [priorities, setPriorities] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Active");
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const { index, create, edit, update, destroy } = useAuthStore();

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

  useEffect(() => {
    fetchPriorities();
  }, []);

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try { 
      const isactive = status==="Active" ? true : false;
      if (editId) {
       
        const response = await update({ priorityId: editId, name: title, status:isactive });
        if (response?.status) {
          resetForm();
          fetchPriorities();
        }
      } else {
        const response = await create(title,isactive);
        if (response?.status) {
          
          resetForm();
          fetchPriorities();
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
        setStatus(data.status);
        console.log(data.status,"data.status");
        
        
        setEditId(id);
        setShowForm(true);
      }
    } catch (err) {
      console.error("Edit fetch failed", err);
    }
  };

const handleDelete = async (id) => {
  confirm("Are you sure you want to delete?")
  try {
    const response = await destroy(id);
    if (response?.status) {
      setPriorities((prev) => prev.filter((item) => item._id !== id));
    }
  } catch (err) {
    console.error("Delete failed", err);
  }
};

  const resetForm = () => {
    setTitle("");
    setStatus("Active");
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <img src={logo} alt="Logo" style={{ height: "40px" }} />
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Priority List</h4>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
          data-bs-toggle="modal"
          data-bs-target="#priorityModal"
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
          <form onSubmit={handleCreateOrUpdate} className="modal-content">
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
              <button type="submit" className="btn btn-success"  data-bs-dismiss="modal">
                {editId ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <table className="table table-bordered table-striped mt-3">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Priority Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {priorities.length > 0 ? (
            priorities.map((item, index) => (
              <tr key={item._id}>
                <td>{index+1}</td>
                <td>{item.name}</td>
                <td>{item.status ? 'Active': ' Inactive'}</td>
                
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
    </div>
  );
};

export default Priority;
