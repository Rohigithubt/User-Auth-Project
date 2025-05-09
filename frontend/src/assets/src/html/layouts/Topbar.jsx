import React from "react";
import Header from "../../../dist/layouts/Header";
// import HeaderContent from "./HeaderContent";
// import '../../../../scss/themes/components/dropdown.scss';

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
