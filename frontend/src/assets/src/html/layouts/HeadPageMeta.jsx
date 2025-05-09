import React from "react";
import { Helmet } from "react-helmet";

const HeadPageMeta = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | Mantis Bootstrap 5 Admin Template</title>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui"
      />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="description"
        content="Mantis is made using Bootstrap 5 design framework. Download the free admin template & use it for your project."
      />
      <meta
        name="keywords"
        content="Mantis, Dashboard UI Kit, Bootstrap 5, Admin Template, Admin Dashboard, CRM, CMS, Bootstrap Admin Template"
      />
      <meta name="author" content="CodedThemes" />
      <link
        rel="icon"
        href="/assets/images/favicon.svg"
        type="image/x-icon"
      />
    </Helmet>
  );
};

export default HeadPageMeta;
