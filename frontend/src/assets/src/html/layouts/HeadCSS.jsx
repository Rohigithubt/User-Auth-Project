import React from "react";
import { Helmet } from "react-helmet";

const HeadCSS = () => {
  return (
    <Helmet>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700&display=swap"
        id="main-font-link"
      />

      <link rel="stylesheet" href="../assets/fonts/tabler-icons.min.css" />

      <link rel="stylesheet" href="../assets/fonts/feather.css" />

      <link rel="stylesheet" href="../assets/fonts/fontawesome.css" />

      <link rel="stylesheet" href="../assets/fonts/material.css" />

      <link rel="stylesheet" href="../assets/css/style.css" id="main-style-link" />
      <link rel="stylesheet" href="../assets/css/style-preset.css" />
    </Helmet>
  );
};

export default HeadCSS;
