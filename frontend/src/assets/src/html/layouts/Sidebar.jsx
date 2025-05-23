import React from "react";
import SidebarMenu from "./SidebarMenu";
import "../../../../../../frontend/src/assets/dist/assets/css/style.css"
const Sidebar = ({ isHidden }) => {
  return (
    <nav className={`pc-sidebar ${isHidden ? "hide" : ""}`}>
      <div className="navbar-wrapper">
        <div className="m-header">
          <a href="/" className="b-brand text-primary">
            <img src="" className="img-fluid logo-lg" alt="logo" />
          </a>
        </div>
        <div className="navbar-content">
          <ul className="pc-navbar">
            <SidebarMenu />
          </ul>
          <div className="card text-center">
            <div className="card-body">
              <img
                src="../assets/images/img-navbar-card.png"
                alt="images"
                className="img-fluid mb-2"
              />
              <h5>Upgrade To Pro</h5>
              <p>To get more features and components</p>
              <a
                href="https://codedthemes.com/item/berry-bootstrap-5-admin-template/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success"
              >
                Buy Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
