import React from 'react';
import { Link } from 'react-router-dom';
import  myImage from '../../../../assets/images/logo-dark.svg';
// import { color } from 'bun';


const SidebarMenu = () => {
  return (
    <ul className="pc-sidebar">
      {/* Dashboard */}
      <li className="pc-item">
        <div>
                    <Link to="#"><img src={myImage} alt="logo" /></Link>
                    </div>
        <Link to="/" className="pc-link">
          <span className="pc-micon"><i className="ti ti-dashboard"></i></span>
          <span className="pc-mtext">Dashboard</span>
        </Link>
      </li>



{/* 

      <li className="pc-item pc-caption">
        <label>UI Components</label>
        <i className="ti ti-dashboard"></i>
      </li>

      <li className="pc-item">
        <Link to="/elements/typography" className="pc-link">
          <span className="pc-micon"><i className="ti ti-typography"></i></span>
          <span className="pc-mtext">Typography</span>
        </Link>
      </li>
      <li className="pc-item">
        <Link to="/elements/color" className="pc-link">
          <span className="pc-micon"><i className="ti ti-color-swatch"></i></span>
          <span className="pc-mtext">Color</span>
        </Link>
      </li>
      <li className="pc-item">
        <Link to="/elements/icons" className="pc-link">
          <span className="pc-micon"><i className="ti ti-plant-2"></i></span>
          <span className="pc-mtext">Icons</span>
        </Link>
      </li> */}

      <li className="pc-item pc-caption">
        <label>Pages</label>
        <i className="ti ti-news"></i>
      </li>

      <li className="pc-item">
        <Link to="/login" className="pc-link">
          <span className="pc-micon"><i className="ti ti-lock"></i></span>
          <Link to="/login" className="pc-mtext">Login</Link>
        </Link>
      </li>
      <li className="pc-item">
        <Link to="/signup" className="pc-link">
          <span className="pc-micon"><i className="ti ti-user-plus"></i></span>
          <Link to="/signup" className="pc-mtext">Register</Link>
        </Link>
      </li>

      {/* <li className="pc-item pc-caption">
        <label>Other</label>
        <i className="ti ti-brand-chrome"></i>
      </li>

      <li className="pc-item pc-hasmenu">
        <a href="#!" className="pc-link">
          <span className="pc-micon"><i className="ti ti-menu"></i></span>
          <span className="pc-mtext">Menu levels</span>
          <span className="pc-arrow"><i data-feather="chevron-right"></i></span>
        </a>
        <ul className="pc-submenu">
          <li className="pc-item"><a href="#!" className="pc-link">Level 2.1</a></li>
          <li className="pc-item pc-hasmenu">
            <a href="#!" className="pc-link">Level 2.2
              <span className="pc-arrow"><i data-feather="chevron-right"></i></span>
            </a>
            <ul className="pc-submenu">
              <li className="pc-item"><a href="#!" className="pc-link">Level 3.1</a></li>
              <li className="pc-item"><a href="#!" className="pc-link">Level 3.2</a></li>
              <li className="pc-item pc-hasmenu">
                <a href="#!" className="pc-link">Level 3.3
                  <span className="pc-arrow"><i data-feather="chevron-right"></i></span>
                </a>
                <ul className="pc-submenu">
                  <li className="pc-item"><a href="#!" className="pc-link">Level 4.1</a></li>
                  <li className="pc-item"><a href="#!" className="pc-link">Level 4.2</a></li>
                </ul>
              </li>
            </ul>
          </li>

          <li className="pc-item pc-hasmenu">
            <a href="#!" className="pc-link">Level 2.3
              <span className="pc-arrow"><i data-feather="chevron-right"></i></span>
            </a>
            <ul className="pc-submenu">
              <li className="pc-item"><a href="#!" className="pc-link">Level 3.1</a></li>
              <li className="pc-item"><a href="#!" className="pc-link">Level 3.2</a></li>
              <li className="pc-item pc-hasmenu">
                <a href="#!" className="pc-link">Level 3.3
                  <span className="pc-arrow"><i data-feather="chevron-right"></i></span>
                </a>
                <ul className="pc-submenu">
                  <li className="pc-item"><a href="#!" className="pc-link">Level 4.1</a></li>
                  <li className="pc-item"><a href="#!" className="pc-link">Level 4.2</a></li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>

      <li className="pc-item">
        <Link to="/other/sample-page" className="pc-link">
          <span className="pc-micon"><i className="ti ti-brand-chrome"></i></span>
          <span className="pc-mtext">Sample page</span>
        </Link>
      </li> */}




      
    </ul>
  );
};

export default SidebarMenu;
