import React from 'react';
import { NavLink } from 'react-router-dom';
import myImage from '../../../../assets/images/logo-dark.svg';
import "../../../../../../frontend/src/assets/dist/assets/css/style.css"

const SidebarUser = ({ onClick }) => {
  const linkClasses = ({ isActive }) =>
    `pc-link flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 ${
      isActive ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <ul className="pc-sidebar space-y-2">
      <li className="pc-item text-center my-3">
        <NavLink to="/" onClick={() => onClick?.('dashboard')}>
          <img
            src={myImage}
            alt="logo"
            className="img-fluid mx-auto"
            style={{ maxWidth: '150px',  }}
          />
        </NavLink>
      </li>

      <li className="pc-item">
        <NavLink to="/user-dashboard" end onClick={() => onClick?.('dashboard')} className={linkClasses}>
          <span className="pc-micon"><i className="ti ti-dashboard"></i></span>
          <span className="pc-mtext">Dashboard</span>
        </NavLink>
      </li>

    

      <li className="pc-item">
        <NavLink to="/usertask-list" onClick={() => onClick?.('task')} className={linkClasses}>
          <span className="pc-micon"><i className="ti ti-user-plus"></i></span>
          <span className="pc-mtext">Tasks</span>
        </NavLink>
      </li>


    </ul>
  );
};

export default SidebarUser;
