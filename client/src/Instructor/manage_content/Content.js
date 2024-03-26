import React from "react";
import Home from "../../pages/homePage/Home";

function Content({ userRole, token }) {
  const instructor = true
  return (
    <div>
      <Home userRole={userRole} token={token} instructor = {instructor}/>
    </div>
  );
}

export default Content;
