import React from "react";
import "./app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/homePage/Home";
import Landing from "./pages/landingPage/sample/landing";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/student" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
