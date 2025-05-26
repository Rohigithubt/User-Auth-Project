// Layout.jsx
import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../../../../../../frontend/src/assets/dist/assets/css/style.css"
import React, { useState } from 'react';

const Layout = ({ children }) => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarHidden((prev) => !prev);
  };

  // Conditionally build classes
  const layoutClasses = [
    'layout',
    'pc-sidebar',
    'pc-trigger',
    isSidebarHidden ? 'pc-sidebar-hide' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={layoutClasses}>
      <Header isSidebarHidden={isSidebarHidden} toggleSidebar={toggleSidebar} />
      {!isSidebarHidden && <Sidebar isHidden={isSidebarHidden} />}
      <main className="content-wrapper">{children}</main>
    </div>
  );
};

export default Layout;




// import React, { useState } from "react";
// import Header from "./Header";
// import Sidebar from "./Sidebar";

// const Layout = () => {
//   const [isSidebarHidden, setIsSidebarHidden] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarHidden((prev) => !prev);
//   };

//   return (
//     <div className={`layout ${isSidebarHidden ? "sidebar-hidden" : ""}`}>
//       <Header isSidebarHidden={isSidebarHidden} toggleSidebar={toggleSidebar} />
//       {!isSidebarHidden && <Sidebar />}
//       <main className="content-wrapper">
//         {/* your routed content */}
//       </main>
//     </div>
//   );
// };

// export default Layout;

