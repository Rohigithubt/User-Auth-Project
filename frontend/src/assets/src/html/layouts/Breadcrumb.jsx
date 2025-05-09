import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ breadcrumbItem, breadcrumbItemActive }) => {
  return (
    <div className="page-header">
      <div className="page-block">
        <div className="row align-items-center">
          <div className="col-md-12">
            <div className="page-header-title">
              <h5 className="m-b-10">{breadcrumbItemActive}</h5>
            </div>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/dashboard">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <a href="#">{breadcrumbItem}</a>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                {breadcrumbItemActive}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
