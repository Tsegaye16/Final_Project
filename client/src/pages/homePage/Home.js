import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Home.scss";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import NavBar from "../../components/navBar/NavBar";
import LeftBar from "../../components/leftBar/leftBar";
import Stack from "../../DSA/DataStracture/Linear/stack/stack";
import Array from "../../DSA/DataStracture/Linear/array/array";
import Welcome from "../../DSA/welcome/welcome";
import Queues from "../../DSA/DataStracture/Linear/queue/queues";
import Linked_list from "../../DSA/DataStracture/Linear/linked_list/linked_list";
import BT from "../../DSA/DataStracture/non_Linear/binary_Tree/BT";
import BST from "../../DSA/DataStracture/non_Linear/binary_tree_search/BST";
import Hash_table from "../../DSA/DataStracture/non_Linear/hash_table/hash_table";
import Graph from "../../DSA/DataStracture/non_Linear/graph/graph";
import Linear_search from "../../DSA/Algorithm/search/linear_search/linear_search";
import Binary_search from "../../DSA/Algorithm/search/binary_search/binary_search";
import Bubble_sort from "../../DSA/Algorithm/sort/bubble_sort/bubble_sort";
import Insertion_sort from "../../DSA/Algorithm/sort/insertion_sort/insertion_sort";
import Selection_sort from "../../DSA/Algorithm/sort/selection_sort/selection_sort";
import Merge_sort from "../../DSA/Algorithm/sort/merge_sort/merge_sort";
import Quick_sort from "../../DSA/Algorithm/sort/quick_sort/quick_sort";
import BFS from "../../DSA/Algorithm/graph/breadth_first_search/BFS";
import DFS from "../../DSA/Algorithm/graph/debth_first_search/DFS";
import Tree from "../../DSA/DataStracture/non_Linear/tree/tree";
import QuizIcon from "@mui/icons-material/Quiz";
import { useNavigate } from "react-router-dom";
import { Tooltip, CircularProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

function Home({ userRole }) {
  const [selectedItem, setSelectedItem] = useState("");
  const [icon, setIcon] = useState("times");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState(new Date().getTime()); // Define startTime here
  //const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [isUser, setIsUser] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    setId(decodedToken.user_id);
  });

  useEffect(() => {
    axios
      .post("http://localhost:8800/student/viewProfile", { id: id })
      .then((response) => {
        setUserData(response.data);
        //console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("accessToken");
    const isTokenAvailable = !!token; // Convert to boolean

    // Set isUser based on token availability
    setIsUser(isTokenAvailable);
  }, []);

  // Initialize as false by default

  const toggleSidebar = () => {
    setIcon((prevIcon) => (prevIcon === "bars" ? "times" : "bars"));
    setSidebarOpen((prevState) => !prevState);
    setSidebarWidth((prevWidth) => (prevWidth === 0 ? 260 : 0));
  };

  const handleChat = () => {
    navigate("/student/quiz");
  };

  const updateProgress = () => {
    const currentTime = new Date().getTime();
    const elapsedTime = (currentTime - startTime) / 1000; // in seconds
    const totalSeconds = 3600; // assume 1 minute for completion
    const newProgress = (elapsedTime / totalSeconds) * 100;

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
        return <Array />;
      case "stack":
        return <Stack />;
      case "queue":
        return <Queues />;
      case "linked-list":
        return <Linked_list />;
      case "binary_tree":
        return <BT />;
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
      case "bfs":
        return <BFS />;
      case "dfs":
        return <DFS />;
      case "tree":
        return <Tree />;
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
          }}
        >
          <div className="rendered">{renderSelectedComponent()}</div>
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
        </div>
      </div>
    </div>
  );
}

export default Home;
