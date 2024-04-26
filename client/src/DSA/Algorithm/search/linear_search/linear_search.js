import React from "react";
import "./linear_search.scss";
import LinearSearch from "./logic";

import CodeTemplate from "./extra/CodeTemplate";
import Content from "../../../content/content";

function Linear_search({ title, userData }) {
  return (
    <>
      <div className="main-Lsearch">
        <div className="title">Linear Search</div>
        <div className="introduction">
          <span>Introduction </span>
          <p>
            Linear search, also known as sequential search, is a simple and
            straightforward method for finding a target element within a list or
            array. It is one of the most basic and intuitive search algorithms.
            In linear search, each element of the list is examined one by one
            until a match is found or the entire list has been searched.
          </p>
        </div>
        <div className="operation">
          <p>
            <b>Objective:</b>&nbsp; Find the position (index) of a target value
            in a list or array.
          </p>

          <b>Algorithm:</b>
          <ol>
            <li>Start from the beginning of the list.</li>
            <li>
              Compare the target value with each element in the list
              sequentially.
            </li>
            <li>If a match is found, return the index of the element.</li>
            <li>
              If the end of the list is reached without finding a match, return
              a special value (e.g., -1) to indicate that the target value is
              not in the list.
            </li>
          </ol>
        </div>
        <div className="implementation">
          <span>Implementation</span>
        </div>

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
