import React from "react";
import { Link } from "react-router-dom";
import myImg from "../../assets/images/logo-dark.svg";

const Priority = () => {
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
                <h3 className="mb-4"><b>Manage Priorities</b></h3>

                <form>
                  <div className="form-group mb-3">
                    <label className="form-label">Priority</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter priority name"
                    />
                  </div>
                  <div className="d-grid mt-3">
                    <button type="submit" className="btn btn-primary">
                      Add Priority
                    </button>
                  </div>
                </form>

                <div className="mt-4">
                  <h5>Priority List</h5>
                  {/* <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>High Priority</span>
                      <div>
                        <button className="btn btn-sm btn-warning me-2">
                          Edit
                        </button>
                        <button className="btn btn-sm btn-danger">
                          Delete
                        </button>
                      </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>Medium Priority</span>
                      <div>
                        <button className="btn btn-sm btn-warning me-2">
                          Edit
                        </button>
                        <button className="btn btn-sm btn-danger">
                          Delete
                        </button>
                      </div>
                    </li>
                    
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>Low Priority</span>
                      <div>
                        <button className="btn btn-sm btn-warning me-2">
                          Edit
                        </button>
                        <button className="btn btn-sm btn-danger">
                          Delete
                        </button>
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

export default Priority;
