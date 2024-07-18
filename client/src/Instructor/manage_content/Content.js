import React from "react";
import Home from "../../pages/homePage/Home";

function InstructorsideHome({ userRole, token }) {
  const instructor = true;
  return (
    <div>
      <Home userRole={userRole} token={token} instructor={instructor} />
    </div>
  );
}

export default InstructorsideHome;
