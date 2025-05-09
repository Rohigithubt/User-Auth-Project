import React from "react";
import Topbar from "../layouts/Topbar";
import HeadPageMeta from "../layouts/HeadPageMeta";
import HeadCSS from "../layouts/HeadCSS";
import LayoutVertical from "../layouts/LayoutVertical";
import Breadcrumb from "../layouts/Breadcrumb";
import FooterBlock from "../layouts/FooterBlock";
import FooterJS from "../layouts/FooterJS";
const SamplePage = () => {
  return (
    <>
      <head>
        <HeadPageMeta title="Sample Page" />
        <HeadCSS />
      </head>

      <body>
        <LayoutVertical />

        <div className="pc-container">
          <div className="pc-content">
            <Breadcrumb
              breadcrumbItem="Other"
              breadcrumbItemActive="Sample Page"
            />

            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header">
                    <h5>Hello card</h5>
                  </div>
                  <div className="card-body">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FooterBlock />
        <FooterJS />
      </body>
    </>
  );
};

export default SamplePage;
