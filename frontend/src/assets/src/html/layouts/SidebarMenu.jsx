import React from 'react';
import { Link } from 'react-router-dom';
import myImage from '../../../../assets/images/logo-dark.svg';

const SidebarMenu = ({ onClick }) => {
  return (
    <ul className="pc-sidebar">
      <li className="pc-item">
        <div>
          <Link to="#" onClick={() => onClick('dashboard')}>
            <img src={myImage} alt="logo" />
          </Link>
        </div>
      </li>

      <li className="pc-item">
        <Link to="/" onClick={() => onClick('dashboard')} className="pc-link">
          <span className="pc-micon"><i className="ti ti-dashboard"></i></span>
          <span className="pc-mtext">Dashboard</span>
        </Link>
      </li>

      <li className="pc-item">
        <Link to="/priority" onClick={() => onClick('priority')} className="pc-link">
          <span className="pc-micon"><i className="ti ti-lock"></i></span>
          <span className="pc-mtext">Priority</span>
        </Link>
      </li>

      <li className="pc-item">
        <Link to="/task" onClick={() => onClick('task')} className="pc-link">
          <span className="pc-micon"><i className="ti ti-user-plus"></i></span>
          <span className="pc-mtext">Tasks</span>
        </Link>
      </li>
    </ul>
  );
};

export default SidebarMenu;
