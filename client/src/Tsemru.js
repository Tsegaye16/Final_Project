import React, { useState, useEffect } from "react";
import axios from "axios";

function Tsemru() {
  const [tsemru, setTsemru] = useState([]);

  // Fetch data from API
  useEffect(() => {
    axios.get("http://localhost:8800/tsemru").then((response) => {
      console.log(response.data);
      setTsemru(response.data);
    });
  }, []);

  return (
    <div>
      {/* Check if tsemru is not empty before mapping */}
      {tsemru.length > 0 &&
        tsemru.map((item, index) => (
          <div key={index}>
            <h3>{item.user_id}</h3>
            {/* Display the image using <img> tag */}
            <img
              src={`http://localhost:8800/${item.image}`}
              alt={`User ${item.user_id} Image`}
            />
          </div>
        ))}
    </div>
  );
}

export default Tsemru;
