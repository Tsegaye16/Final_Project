import React from "react";
import "./linear_search.scss";
import LinearSearchLogic from "./logic";

import CodeTemplate from "./extra/CodeTemplate";
import Content from "../../../content/content";

function LinearSearch({ title, userData }) {
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

export default LinearSearch;
