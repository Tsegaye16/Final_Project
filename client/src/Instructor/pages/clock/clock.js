import React, { useEffect, useState } from "react";
import "../clock/style.css";

const Clock = () => {
  const [rotation, setRotation] = useState({
    second: 0,
    minute: 0,
    hour: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();

      const second = date.getSeconds() * 6;
      const minute = date.getMinutes() * 6;
      const hour = date.getHours() * 30 + minute / 12;

      setRotation({
        second,
        minute,
        hour,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="entire">
      <div className="clock">
        <div className="wrapper">
          {[...Array(12).keys()].map((num) => (
            <label key={num} style={{ "--i": num + 1 }}>
              <span>{num + 1}</span>
            </label>
          ))}
          <div className="point"></div>
          <div
            className="stalk-second"
            style={{ transform: `rotate(${rotation.second}deg)` }}
          ></div>
          <div
            className="stalk-minute"
            style={{ transform: `rotate(${rotation.minute}deg)` }}
          ></div>
          <div
            className="stalk-hour"
            style={{ transform: `rotate(${rotation.hour}deg)` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Clock;
