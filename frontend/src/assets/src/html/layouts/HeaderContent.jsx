// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// // import myImg from '../../assets/images/user/avatar-2.jpg';
// import myImg from '../../../../../src/assets/src/assets/images/user/avatar-3.jpg';
// import { useAuthStore } from "./store/authStore";
// // import { useAuthStore } from "../../../../../src/assets/src/html/layouts/store/authStore";
// import Header from "../../../dist/layouts/Header";


// const HeaderContent = () => {
//   const [user,logout] = useAuthStore();

//    const navigate = useNavigate();
//   const handleLogout=(e)=>{
//   //  e.preventDefault();
//    logout();
//    navigate('/login');

//   }
//   return (
//     <div className="d-flex justify-content-between align-items-center w-100">
//       <div className="me-auto pc-mob-drp">
//         <ul className="list-unstyled d-flex align-items-center mb-0">
//           <li className="pc-h-item pc-sidebar-collapse">
//             <a href="#" className="pc-head-link ms-0" id="sidebar-hide">
//               <i className="ti ti-menu-2"></i>
//             </a>
//           </li>
//           <li className="pc-h-item pc-sidebar-popup">
//             <a href="#" className="pc-head-link ms-0" id="mobile-collapse">
//               <i className="ti ti-menu-2"></i>
//             </a>
//           </li>
//           <li className="dropdown pc-h-item d-inline-flex d-md-none">
//             <a
//               className="pc-head-link dropdown-toggle arrow-none m-0"
//               data-bs-toggle="dropdown"
//               href="#"
//               role="button"
//               aria-haspopup="false"
//               aria-expanded="false"
//             >
//               <i className="ti ti-search"></i>
//             </a>
//             <div className="dropdown-menu pc-h-dropdown drp-search">
//               <form className="px-3">
//                 <div className="form-group mb-0 d-flex align-items-center">
//                   <i data-feather="search"></i>
//                   <input
//                     type="search"
//                     className="form-control border-0 shadow-none"
//                     placeholder="Search here. . ."
//                   />
//                 </div>
//               </form>
//             </div>
//           </li>
//           <li className="pc-h-item d-none d-md-inline-flex">
//             <form className="header-search">
//               <i data-feather="search" className="icon-search"></i>
//               <input
//                 type="search"
//                 className="form-control"
//                 placeholder="Search here. . ."
//               />
//             </form>
//           </li>
//         </ul>
//       </div>

//       <div className="ms-auto">
//         <ul className="list-unstyled d-flex align-items-center mb-0">
//           <li className="dropdown pc-h-item">
//             <a
//               className="pc-head-link dropdown-toggle arrow-none me-0"
//               data-bs-toggle="dropdown"
//               href="#"
//               role="button"
//               aria-haspopup="false"
//               aria-expanded="false"
//             >
//               <i className="ti ti-mail"></i>
//             </a>
//             <div className="dropdown-menu dropdown-notification dropdown-menu-end pc-h-dropdown">
//               <div className="dropdown-header d-flex align-items-center justify-content-between">
//                 <h5 className="m-0">Message</h5>
//                 <a href="#!" className="pc-head-link bg-transparent">
//                   <i className="ti ti-x text-danger"></i>
//                 </a>
//               </div>
//               <div className="dropdown-divider"></div>
//               <div
//                 className="dropdown-header px-0 text-wrap header-notification-scroll position-relative"
//                 style={{ maxHeight: "calc(100vh - 215px)" }}
//               >
//                 <div className="list-group list-group-flush w-100">
//                   {[
//                     {
//                       img:{myImg},
//                       text: "It's <b>Cristina danny's</b> birthday today.",
//                       time: "3:00 AM",
//                       subText: "2 min ago",
//                     },
//                     {
//                       img:{myImg},
//                       text: "<b>Aida Burg</b> commented your post.",
//                       time: "6:00 PM",
//                       subText: "5 August",
//                     },
//                     {
//                       img: {myImg},
//                       text: "<b>There was a failure to your setup.</b>",
//                       time: "2:45 PM",
//                       subText: "7 hours ago",
//                     },
//                     {
//                       img: {myImg},
//                       text: "<b>Cristina Danny </b> invited to join <b> Meeting.</b>",
//                       time: "9:10 PM",
//                       subText: "Daily scrum meeting time",
//                     },
//                   ].map((item, idx) => (
//                     <a className="list-group-item list-group-item-action" key={idx}>
//                       <div className="d-flex">
//                         <div className="flex-shrink-0">
//                           <img
//                             src={item.img}
//                             alt="user-avatar"
//                             className="user-avtar"
//                           />
//                         </div>
//                         <div className="flex-grow-1 ms-1">
//                           <span className="float-end text-muted">{item.time}</span>
//                           <p
//                             className="text-body mb-1"
//                             dangerouslySetInnerHTML={{ __html: item.text }}
//                           ></p>
//                           <span className="text-muted">{item.subText}</span>
//                         </div>
//                       </div>
//                     </a>
//                   ))}
//                 </div>
//               </div>
//               <div className="dropdown-divider"></div>
//               <div className="text-center py-2">
//                 <a href="#!" className="link-primary">
//                   View all
//                 </a>
//               </div>
//             </div>
//           </li>

//           <li className="dropdown pc-h-item header-user-profile">
//             <a
//               className="pc-head-link dropdown-toggle arrow-none me-0"
//               data-bs-toggle="dropdown"
//               href="#"
//               role="button"
//               aria-haspopup="false"
//               data-bs-auto-close="outside"
//               aria-expanded="false"
//             >
//               <img
//                 src={myImg}
//                 alt="user-avatar"
//                 className="user-avtar"
//               />
//               <span>Stebin Ben</span>
//             </a>
//             <div className="dropdown-menu dropdown-user-profile dropdown-menu-end pc-h-dropdown">
//               <div className="dropdown-header">
//                 <div className="d-flex mb-1">
//                   <div className="flex-shrink-0">
//                     <img
//                       src={myImg}
//                       alt="user-avatar"
//                       className="user-avtar wid-35"
//                     />
//                   </div>
//                   <div className="flex-grow-1 ms-3">
//                     <h6 className="mb-1">Stebin Ben</h6>
//                     <span>UI/UX Designer</span>
//                   </div>
//                   <a href="#!" className="pc-head-link bg-transparent">
//                     <i className="ti ti-power text-danger"></i>
//                   </a>
//                 </div>
//               </div>
//               <ul className="nav drp-tabs nav-fill nav-tabs" id="mydrpTab" role="tablist">
//                 <li className="nav-item" role="presentation">
//                   <button
//                     className="nav-link active"
//                     id="drp-t1"
//                     data-bs-toggle="tab"
//                     data-bs-target="#drp-tab-1"
//                     type="button"
//                     role="tab"
//                     aria-controls="drp-tab-1"
//                     aria-selected="true"
//                   >
//                     <i className="ti ti-user"></i> Profile
//                   </button>
//                 </li>
              
                    
//               </ul>
//               <div className="tab-content" id="mysrpTabContent">
//                 <div
//                   className="tab-pane fade show active"
//                   id="drp-tab-1"
//                   role="tabpanel"
//                   aria-labelledby="drp-t1"
//                   tabIndex="0"
//                 >
//                   {[
//                     { icon: "ti ti-edit-circle", label: "Edit Profile" },
//                     { icon: "ti ti-user", label: "View Profile" },
//                     { icon: "ti ti-power", label:<button onclick={handleLogout}> Logout</button>},
//                   ].map((item, index) => (
//                     <a href="#!" className="dropdown-item" key={index}>
//                       <i className={item.icon}></i>
//                       <span>{item.label}</span>
//                     </a>
//                   ))}
//                 </div>
               
//               </div>
//             </div>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default HeaderContent;  