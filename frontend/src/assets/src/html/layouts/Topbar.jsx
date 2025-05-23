import React from "react";
import Header from "../../../dist/layouts/Header";
// import HeaderContent from "./HeaderContent";
// import '../../../../scss/themes/components/dropdown.scss';
import "../../../../../../frontend/src/assets/dist/assets/css/style.css"

const Topbar = () => {
  return (
    <header className="pc-header">
      <div className="header-wrapper">
        <Header />
      </div>
    </header>
  );
};

export default Topbar;
