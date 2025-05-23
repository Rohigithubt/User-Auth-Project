// Layout.jsx
import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../../../../../../frontend/src/assets/dist/assets/css/style.css"

const Layout = ({ children }) => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
   const toggleSidebar = () => {
    setIsSidebarHidden((prev) => !prev);
  };

  return (
    <div className={`layout ${isSidebarHidden ? "sidebar-hidden" : ""}`}>
     <Header isSidebarHidden={isSidebarHidden} toggleSidebar={toggleSidebar} />
      {!isSidebarHidden && <Sidebar isHidden={isSidebarHidden} />}
       <main className="content-wrapper">
         {/* your routed content */}
          {children}
       </main>
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

