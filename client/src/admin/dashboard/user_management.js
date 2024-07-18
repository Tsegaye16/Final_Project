import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import CountUp from "react-countup";
import axios from "axios";

function AdminUserManagement() {
  const [metrics, setMetrics] = useState([
    { name: "Total user", totalUsers: 0 },
    { name: "User feedback", userFeedback: 0 },
  ]);

  useEffect(() => {
    // Send multiple Axios requests within a single useEffect
    axios
      .all([
        axios.post("http://localhost:8800/totaluser"),
        axios.post("http://localhost:8800/user/feedback"),
      ])
      .then(
        axios.spread((totalUserResp, userFeedbackResp) => {
          const total = totalUserResp.data[0].total;
          const feedbackCount = userFeedbackResp.data[0].total;
          setMetrics([
            { name: "Total user", value: total + 6 },
            { name: "User feedback", value: feedbackCount },
          ]);
        })
      )
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={6} sx={{ p: 4 }}>
          <Typography variant="h6">{metrics[0].name}</Typography>
          <Typography variant="h4">
            <CountUp
              end={metrics[0].value}
              decimal={metrics[0].value % 1 !== 0 ? "." : ""}
              duration={2}
            />
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={6} sx={{ p: 4 }}>
          <Typography variant="h6">{metrics[1].name}</Typography>
          <Typography variant="h6">
            <CountUp
              end={metrics[1].value}
              decimal={metrics[1].userFeedback % 1 !== 0 ? "." : ""}
              duration={2}
            />{" "}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default AdminUserManagement;
