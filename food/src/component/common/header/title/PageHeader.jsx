import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
const PageHeader = ({ title }) => {
  const location = useLocation();
  return (
    <div>
      <section className="pageHeader">
        <div className="page-header-box">
          <h2>
            Home <span>⇒</span> {location.pathname.split("/")[1]}
          </h2>
          <h1>{title}</h1>
        </div>
      </section>
    </div>
  );
};

export default PageHeader;
