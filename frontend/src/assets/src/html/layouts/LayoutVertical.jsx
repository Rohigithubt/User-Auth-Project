import React from "react";

const LayoutVertical = ({ children }) => {
  return (
    <div className="layout-wrapper">
      <div id="loader">
        Loading...
      </div>

      <aside className="sidebar">
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Profile</li>
          </ul>
        </nav>
      </aside>

      <header className="topbar">
        <h1>Welcome User</h1>
      </header>

      <main>{children}</main>
    </div>
  );
};

export default LayoutVertical;
