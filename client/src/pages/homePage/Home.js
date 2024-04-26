import React, { useState, useEffect } from "react";

import "./Home.scss";

import NavBar from "../../components/navBar/NavBar";
import LeftBar from "../../components/leftBar/leftBar";

import Welcome from "../../DSA/welcome/welcome";

import Linked_list from "../../DSA/DataStracture/Linear/linked_list/linked_list";

import BST from "../../DSA/DataStracture/non_Linear/binary_tree_search/BST";
import Hash_table from "../../DSA/DataStracture/non_Linear/hash_table/hash_table";
//import Graph from "../../DSA/DataStracture/non_Linear/graph/graph";
import Graph from "../../DSA/DataStracture/non_Linear/graph/graph.js";
import Linear_search from "../../DSA/Algorithm/search/linear_search/linear_search";
import Binary_search from "../../DSA/Algorithm/search/binary_search/binary_search";
import Bubble_sort from "../../DSA/Algorithm/sort/bubble_sort/bubble_sort";
import Insertion_sort from "../../DSA/Algorithm/sort/insertion_sort/insertion_sort";
import Selection_sort from "../../DSA/Algorithm/sort/selection_sort/selection_sort";
import Merge_sort from "../../DSA/Algorithm/sort/merge_sort/merge_sort";
import Quick_sort from "../../DSA/Algorithm/sort/quick_sort/quick_sort";

import QuizIcon from "@mui/icons-material/Quiz";
import { useNavigate } from "react-router-dom";
import { Tooltip, CircularProgress, Typography } from "@mui/material";

import axios from "axios";
import StackList from "../../DSA/DataStracture/Linear/stack/stackList";
import QueueList from "../../DSA/DataStracture/Linear/queue/queueList";

function Home({ instructor }) {
  const [selectedItem, setSelectedItem] = useState("");
  const [icon, setIcon] = useState("times");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [progress, setProgress] = useState(0);

  // Initialize as false by default

  const toggleSidebar = () => {
    setIcon((prevIcon) => (prevIcon === "bars" ? "times" : "bars"));
    setSidebarOpen((prevState) => !prevState);
    setSidebarWidth((prevWidth) => (prevWidth === 0 ? 240 : 0));
  };

  const handleChat = () => {
    navigate("/student/quiz");
  };

  const renderSelectedComponent = () => {
    switch (selectedItem) {
      case "stack":
        return <StackList />;
      case "queue":
        return <QueueList />;
      case "linked-list":
        return <Linked_list />;

      case "bst":
        return <BST />;
      case "hash_table":
        return <Hash_table />;
      case "graph":
        return <Graph />;
      case "linear_search":
        return <Linear_search />;
      case "binary_search":
        return <Binary_search />;
      case "bubble_sort":
        return <Bubble_sort />;
      case "insertion_sort":
        return <Insertion_sort />;
      case "selection_sort":
        return <Selection_sort />;
      case "merge_sort":
        return <Merge_sort />;
      case "quick_sort":
        return <Quick_sort />;

      default:
        return <Welcome />;
    }
  };

  return (
    <div className="main-home">
      <div className="NavBar">
        <NavBar icon={icon} toggleSidebar={toggleSidebar} />
      </div>
      <div className="main-body">
        <div className={`left-bar ${sidebarOpen ? "open" : "closed"}`}>
          <LeftBar
            setSelectedItem={setSelectedItem}
            sidebarWidth={sidebarWidth}
          />
        </div>
        <div
          className="main-body-part"
          style={{
            marginLeft: `${sidebarWidth}px`,
            width: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="rendered">{renderSelectedComponent()}</div>

          {!instructor && (
            <>
              <div
                style={{
                  position: "fixed",
                  right: "20px",
                  bottom: "60px",
                  zIndex: 9999,
                }}
              >
                <Typography
                  variant="caption"
                  component="div"
                  color="textSecondary"
                  sx={{
                    position: "absolute",
                    bottom: "50%",
                    right: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {Math.round(progress)}%
                </Typography>
                <CircularProgress
                  variant="determinate"
                  value={100}
                  size={50}
                  thickness={1}
                  color="secondary"
                  sx={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    marginLeft: "-45px",
                    marginTop: "-45px",
                  }}
                />
                <CircularProgress
                  variant="determinate"
                  value={progress}
                  size={50}
                  thickness={2}
                  color="primary"
                  sx={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    marginLeft: "-45px",
                    marginTop: "-45px",
                  }}
                ></CircularProgress>
              </div>
              <div style={{ position: "fixed", right: "20px", top: "80px" }}>
                <Tooltip title="Take Quiz" arrow>
                  <div className="chat" onClick={handleChat}>
                    <QuizIcon />
                  </div>
                </Tooltip>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
