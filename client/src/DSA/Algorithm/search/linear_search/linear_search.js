import React from "react";
import "./linear_search.scss";
import LinearSearch from "./logic";

import CodeTemplate from "./extra/CodeTemplate";
import Content from "../../../content/content";

function Linear_search({ title, userData }) {
  return (
    <>
      <div className="main-Lsearch">
        <CodeTemplate />

        <div className="visualization">
          <span>Visualization</span>
          <LinearSearch />
        </div>
      </div>
      <Content title={title} userData={userData} />
    </>
  );
}

export default Linear_search;
