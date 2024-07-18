// dash_board.js
import React, { useState, useEffect } from "react";
import "./dash_board.scss"; // Make sure to import the CSS file
import NavBar from "../components/nav_bar";
import axios from "axios";
import Interface from "./adjacentment/Interface";
import CustomCard from "./adjacentment/card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function InstructorDashBoard() {
  const [sidebarWidth, setSidebarWidth] = useState(0);
  const [id, setId] = useState(0);
  const [userData, setUserData] = useState(null);

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
      .catch((err) => {});
  }, [id]);

  const toggleSidebar = () => {
    setSidebarWidth((prevWidth) => (prevWidth === 0 ? 250 : 0));
  };
  return (
    <>
      <div className="dashboard-container">
        <NavBar
          toggleSidebar={toggleSidebar}
          sidebarWidth={sidebarWidth}
          userData={userData}
        />
        <div
          className="main-contents"
          style={{ marginLeft: `${sidebarWidth}px` }}
        >
          <ToastContainer />
          <div className="interface">
            <Interface />
            <CustomCard userData={userData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default InstructorDashBoard;
