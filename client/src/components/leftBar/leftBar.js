import React, { useState } from "react";
import "./leftBar.scss";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import "react-circular-progressbar/dist/styles.css";

import { FaAngleRight } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";

function LeftBar({ setSelectedItem, sidebarWidth }) {
  const [isVisible, setIsVisible] = useState(true);
  const [dataStructureVisible, setDataStructureVisible] = useState(true);
  const [linearDatastructureVisible, setLinearDatastructureVisible] =
    useState(true);
  const [noneLinearDatastructureVisible, setNoneLinearDatastructureVisible] =
    useState(true);
  const [algorithmVisible, setalgorithmVisible] = useState(true);
  const [searchAlgorithVisible, setSearchAlgorithVisible] = useState(true);
  const [sortingAlgorithVisible, setSortingAlgorithVisible] = useState(true);
  const [graphAlgorithmVisble, setGraphAlgorithVisisble] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const toggleDataStructure = () => {
    setDataStructureVisible(!dataStructureVisible);
  };
  const toggleLinearDatastructure = () => {
    setLinearDatastructureVisible(!linearDatastructureVisible);
  };
  const toggleNoneLinearDatastructure = () => {
    setNoneLinearDatastructureVisible(!noneLinearDatastructureVisible);
  };
  const toggleAlgorithm = () => {
    setalgorithmVisible(!algorithmVisible);
  };
  const toggleSearchAlgorithm = () => {
    setSearchAlgorithVisible(!searchAlgorithVisible);
  };
  const toggleSortingAlgorithm = () => {
    setSortingAlgorithVisible(!sortingAlgorithVisible);
  };
  const toggleGraphAlgorithm = () => {
    setGraphAlgorithVisisble(!graphAlgorithmVisble);
  };
  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  };
  // Timing

  return (
    <div
      className={sidebarWidth !== 0 ? "main-leftbar active" : "main-leftbar"}
    >
      <div className="dsa-content">
        <div className="data-structure">
          <div className="category" onClick={toggleDataStructure}>
            {" "}
            {dataStructureVisible ? <FaAngleRight /> : <FaAngleDown />} Data
            Structure
          </div>

          <div
            className={`sub-category ${!dataStructureVisible ? "" : "invisible-data-structures"}`}
          >
            <div className="linear ">
              <div className="category" onClick={toggleLinearDatastructure}>
                {" "}
                {linearDatastructureVisible ? (
                  <FaAngleRight />
                ) : (
                  <FaAngleDown />
                )}{" "}
                Linear
              </div>
              <ul>
                <li
                  className={`${!linearDatastructureVisible ? "" : "visible-linear"}`}
                  onClick={() => {
                    handleItemClick("array");
                  }}
                >
                  {
                    <FiberManualRecordIcon
                      style={{ color: "white", fontSize: "14px" }}
                    />
                  }{" "}
                  Array
                </li>
                <li
                  className={`${!linearDatastructureVisible ? "" : "visible-linear"}`}
                  onClick={() => {
                    handleItemClick("stack");
                  }}
                >
                  {
                    <FiberManualRecordIcon
                      style={{ color: "white", fontSize: "14px" }}
                    />
                  }{" "}
                  stack
                </li>
                <li
                  className={`${!linearDatastructureVisible ? "" : "visible-linear"}`}
                  onClick={() => {
                    handleItemClick("queue");
                  }}
                >
                  {
                    <FiberManualRecordIcon
                      style={{ color: "white", fontSize: "14px" }}
                    />
                  }{" "}
                  Queues
                </li>
                <li
                  className={`${!linearDatastructureVisible ? "" : "visible-linear"}`}
                  onClick={() => {
                    handleItemClick("linked-list");
                  }}
                >
                  {
                    <FiberManualRecordIcon
                      style={{ color: "white", fontSize: "14px" }}
                    />
                  }{" "}
                  Linked list
                </li>
              </ul>
            </div>
            <div className="non-linear ">
              <div className="category" onClick={toggleNoneLinearDatastructure}>
                {" "}
                {noneLinearDatastructureVisible ? (
                  <FaAngleRight />
                ) : (
                  <FaAngleDown />
                )}{" "}
                Non-linear
              </div>
              <ul>
                <li
                  className={` ${!noneLinearDatastructureVisible ? "" : "visible-none-linear"}`}
                  onClick={() => {
                    handleItemClick("bst");
                  }}
                >
                  {
                    <FiberManualRecordIcon
                      style={{ color: "white", fontSize: "14px" }}
                    />
                  }{" "}
                  Binary Search Tree
                </li>
                <li
                  className={` ${!noneLinearDatastructureVisible ? "" : "visible-none-linear"}`}
                  onClick={() => {
                    handleItemClick("hash_table");
                  }}
                >
                  {
                    <FiberManualRecordIcon
                      style={{ color: "white", fontSize: "14px" }}
                    />
                  }{" "}
                  Hash Table
                </li>
                <li
                  className={` ${!noneLinearDatastructureVisible ? "" : "visible-none-linear"}`}
                  onClick={() => {
                    handleItemClick("graph");
                  }}
                >
                  {
                    <FiberManualRecordIcon
                      style={{ color: "white", fontSize: "14px" }}
                    />
                  }{" "}
                  Graph
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="algorithms">
          <div className="category" onClick={toggleAlgorithm}>
            {" "}
            {algorithmVisible ? <FaAngleRight /> : <FaAngleDown />} Algorithms
          </div>
          <div
            className={`sub-category ${!algorithmVisible ? "" : "invisible-algorithms"}`}
          >
            <div className="search">
              <div className="category" onClick={toggleSearchAlgorithm}>
                {searchAlgorithVisible ? <FaAngleRight /> : <FaAngleDown />}{" "}
                Search
              </div>
              <ul>
                <li
                  className={`${!searchAlgorithVisible ? "" : "search-visible"}`}
                  onClick={() => {
                    handleItemClick("linear_search");
                  }}
                >
                  {
                    <FiberManualRecordIcon
                      style={{ color: "white", fontSize: "14px" }}
                    />
                  }{" "}
                  Linear Search
                </li>
                <li
                  className={`${!searchAlgorithVisible ? "" : "search-visible"}`}
                  onClick={() => {
                    handleItemClick("binary_search");
                  }}
                >
                  {
                    <FiberManualRecordIcon
                      style={{ color: "white", fontSize: "14px" }}
                    />
                  }{" "}
                  Binary Search
                </li>
              </ul>
            </div>
            <div className="sorting">
              <div className="category" onClick={toggleSortingAlgorithm}>
                {sortingAlgorithVisible ? <FaAngleRight /> : <FaAngleDown />}{" "}
                Sorting
              </div>
              <ul>
                <li
                  className={`${!sortingAlgorithVisible ? "" : "sorting-visible"}`}
                  onClick={() => {
                    handleItemClick("bubble_sort");
                  }}
                >
                  {
                    <FiberManualRecordIcon
                      style={{ color: "white", fontSize: "14px" }}
                    />
                  }{" "}
                  Bubble Sort
                </li>
                <li
                  className={`${!sortingAlgorithVisible ? "" : "sorting-visible"}`}
                  onClick={() => {
                    handleItemClick("insertion_sort");
                  }}
                >
                  {
                    <FiberManualRecordIcon
                      style={{ color: "white", fontSize: "14px" }}
                    />
                  }{" "}
                  Insertion Sort
                </li>

                <li
                  className={`${!sortingAlgorithVisible ? "" : "sorting-visible"}`}
                  onClick={() => {
                    handleItemClick("merge_sort");
                  }}
                >
                  {
                    <FiberManualRecordIcon
                      style={{ color: "white", fontSize: "14px" }}
                    />
                  }{" "}
                  Merge Sort
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftBar;
