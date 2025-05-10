import React from "react";
import { Link } from "react-router-dom";
import myImg from "../../assets/images/logo-dark.svg";

const Task = () => {
  return (
    <>
      <div className="auth-main">
        <div className="auth-wrapper v3">
          <div className="auth-form">
            <div className="auth-header">
              <Link to="#"><img src={myImg} alt="logo" /></Link>
            </div>

            <div className="card my-5">
              <div className="card-body">
                <h3 className="mb-4"><b>Manage Tasks</b></h3>

                <form>
                  <div className="form-group mb-3">
                    <label className="form-label">Task Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter task name"
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="form-label">Priority</label>
                    <select className="form-select">
                      <option value="">Select Priority</option>
                      <option value="high">High Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="low">Low Priority</option>
                    </select>
                  </div>

                  <div className="d-grid mt-3">
                    <button type="submit" className="btn btn-primary">
                      Add Task
                    </button>
                  </div>
                </form>

                <div className="mt-4">
                  <h5>Task List</h5>
                  {/* <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">Design Homepage</h6>
                        <span className="badge bg-danger">High Priority</span>
                      </div>
                      <div>
                        <button className="btn btn-sm btn-warning me-2">Edit</button>
                        <button className="btn btn-sm btn-danger">Delete</button>
                      </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">Write Blog Post</h6>
                        <span className="badge bg-warning text-dark">Medium Priority</span>
                      </div>
                      <div>
                        <button className="btn btn-sm btn-warning me-2">Edit</button>
                        <button className="btn btn-sm btn-danger">Delete</button>
                      </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">Clean Codebase</h6>
                        <span className="badge bg-success">Low Priority</span>
                      </div>
                      <div>
                        <button className="btn btn-sm btn-warning me-2">Edit</button>
                        <button className="btn btn-sm btn-danger">Delete</button>
                      </div>
                    </li>
                  </ul> */}
                </div>
              </div>
            </div>

            <div className="auth-footer row">
              <div className="col my-1">
                <p className="m-0">
                  Copyright © <a href="#">Codedthemes</a>
                </p>
              </div>
              <div className="col-auto my-1">
                <ul className="list-inline footer-link mb-0">
                  <li className="list-inline-item"><a href="#">Home</a></li>
                  <li className="list-inline-item"><a href="#">Privacy Policy</a></li>
                  <li className="list-inline-item"><a href="#">Contact us</a></li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Task;
