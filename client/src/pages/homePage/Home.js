import React, { useState, useEffect } from "react";

import "./Home.scss";

import NavBar from "../../components/navBar/NavBar";
import LeftBar from "../../components/leftBar/leftBar";

import Array from "../../DSA/DataStracture/Linear/array/array";
import Welcome from "../../DSA/welcome/welcome";

import Linked_list from "../../DSA/DataStracture/Linear/linked_list/linked_list";
import BT from "../../DSA/DataStracture/non_Linear/binary_Tree/BT";
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

import Tree from "../../DSA/DataStracture/non_Linear/tree/tree";
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
  const [startTime, setStartTime] = useState(new Date().getTime()); // Define startTime here
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isUser, setIsUser] = useState(false);
  const [id, setId] = useState(0);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:8800/instructor/elapsed")
      .then((response) => {
        setElapsedTime(response.data.time[0].duration);
      })
      .catch((err) => {
        console.error("Error:", err);
      });

    const token = localStorage.getItem("accessToken");
    const isTokenAvailable = !!token; // Convert to boolean

    // Set isUser based on token availability
    setIsUser(isTokenAvailable);
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    setId(decodedToken.user_id);
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:8800/student/viewProfile", { id: id })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // Initialize as false by default

  const toggleSidebar = () => {
    setIcon((prevIcon) => (prevIcon === "bars" ? "times" : "bars"));
    setSidebarOpen((prevState) => !prevState);
    setSidebarWidth((prevWidth) => (prevWidth === 0 ? 240 : 0));
  };

  const handleChat = () => {
    navigate("/student/quiz");
  };

  const updateProgress = () => {
    const currentTime = new Date().getTime();
    const elapsedTimes = (currentTime - startTime) / 1000; // in seconds
    const totalSeconds = elapsedTime * 60 * 60; // assume 1 minute for completion
    const newProgress = (elapsedTimes / totalSeconds) * 100;

    // Ensure progress doesn't exceed 100%
    setProgress(Math.min(newProgress, 100));
  };

  // Update progress every second
  useEffect(() => {
    const intervalId = setInterval(updateProgress, 1000);

    return () => clearInterval(intervalId);
  }, [progress, startTime]);

  const renderSelectedComponent = () => {
    switch (selectedItem) {
      case "array":
        return <Array title={selectedItem} userData={userData} />;
      case "stack":
        return <StackList title={selectedItem} userData={userData} />;
      case "queue":
        return <QueueList title={selectedItem} userData={userData} />;
      case "linked-list":
        return <Linked_list title={selectedItem} userData={userData} />;
      case "binary_tree":
        return <BT title={selectedItem} userData={userData} />;
      case "bst":
        return <BST title={selectedItem} userData={userData} />;
      case "hash_table":
        return <Hash_table title={selectedItem} userData={userData} />;
      case "graph":
        return <Graph title={selectedItem} userData={userData} />;
      case "linear_search":
        return <Linear_search title={selectedItem} userData={userData} />;
      case "binary_search":
        return <Binary_search title={selectedItem} userData={userData} />;
      case "bubble_sort":
        return <Bubble_sort title={selectedItem} userData={userData} />;
      case "insertion_sort":
        return <Insertion_sort title={selectedItem} userData={userData} />;
      case "selection_sort":
        return <Selection_sort title={selectedItem} userData={userData} />;
      case "merge_sort":
        return <Merge_sort title={selectedItem} userData={userData} />;
      case "quick_sort":
        return <Quick_sort title={selectedItem} userData={userData} />;

      case "tree":
        return <Tree title={selectedItem} userData={userData} />;
      default:
        return <Welcome />;
    }
  };
  if (!userData) {
    return null; // or a loading indicator
  }

  return (
    <div className="main-home">
      <div className="NavBar">
        <NavBar
          isUser={isUser}
          icon={icon}
          toggleSidebar={toggleSidebar}
          userData={userData}
          instructor={instructor}
        />
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
