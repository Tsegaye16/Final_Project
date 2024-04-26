import React from "react";
import "./leftBar.scss";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

import "react-circular-progressbar/dist/styles.css";

function LeftBar({ setSelectedItem, sidebarWidth }) {
  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  };
  // Timing

  return (
    <div
      className={sidebarWidth !== 0 ? "main-leftbar active" : "main-leftbar"}
    >
      <div className="dsa-content">
        <SimpleTreeView>
          <TreeItem itemId="grid" label="Data structure">
            <TreeItem itemId="a" label="Linear">
              <TreeItem
                itemId="c"
                label="Array"
                onClick={() => {
                  handleItemClick("array");
                }}
              />
              <TreeItem
                itemId="d"
                label="Stack"
                onClick={() => {
                  handleItemClick("stack");
                }}
              />
              <TreeItem
                itemId="e"
                label="Queue"
                onClick={() => {
                  handleItemClick("queue");
                }}
              />
              <TreeItem
                itemId="f"
                label="Linked list"
                onClick={() => {
                  handleItemClick("linked-list");
                }}
              />
            </TreeItem>
            <TreeItem itemId="b" label="None-linear">
              <TreeItem
                itemId="g"
                label="Binary Search Tree"
                onClick={() => {
                  handleItemClick("bst");
                }}
              />
              <TreeItem
                itemId="h"
                label="Hash"
                onClick={() => {
                  handleItemClick("hash_table");
                }}
              />
              <TreeItem
                itemId="i"
                label="Graph"
                onClick={() => {
                  handleItemClick("graph");
                }}
              />
            </TreeItem>
          </TreeItem>
          <TreeItem itemId="pickers" label="Algorithm">
            <TreeItem itemId="search" label="Search">
              <TreeItem
                itemId="linear"
                label="Linear search"
                onClick={() => {
                  handleItemClick("linear_search");
                }}
              />
              <TreeItem
                itemId="binay"
                label="Binary search"
                onClick={() => {
                  handleItemClick("binary_search");
                }}
              />
            </TreeItem>
            <TreeItem itemId="Sorting" label="Sorting">
              <TreeItem
                itemId="bubble"
                label="Bubble sort"
                onClick={() => {
                  handleItemClick("bubble_sort");
                }}
              />
              <TreeItem
                itemId="Insertion"
                label="Insertion sort"
                onClick={() => {
                  handleItemClick("insertion_sort");
                }}
              />
              <TreeItem
                itemId="Merge"
                label="Merge sort"
                onClick={() => {
                  handleItemClick("merge_sort");
                }}
              />
            </TreeItem>
          </TreeItem>
        </SimpleTreeView>
      </div>
    </div>
  );
}

export default LeftBar;
