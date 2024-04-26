import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import CountUp from "react-countup";

function AdminDashboard() {
  const [metrics, setMetrics] = useState([
    { name: "Page Visitors", pageVisitors: 1000 },
    { name: "Total user", totalUsers: 500 },
    { name: "User feedback", userFeedback: 20 },
  ]);
  useEffect(() => {
    // Fetch metrics data from API or other source
    // For demonstration purposes, I'm using hardcoded initial values
    // You should replace this with actual data fetching logic
    // For now, just update the state with the current values
    setMetrics([
      { name: "Page Visitors", value: 1000 },
      { name: "Total user", value: 500 },
      { name: "User feedback", value: 20 },
    ]);
  }, []);

  return (
    <Grid container spacing={3}>
      {metrics.map(({ name, value }) => (
        <Grid key={metrics.name} item xs={12} sm={6} md={4}>
          <Paper elevation={6} sx={{ p: 4 }}>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="h4">
              <CountUp
                end={value}
                decimal={value % 1 !== 0 ? "." : ""}
                decimals={value % 1 !== 0 ? 1 : 0}
                duration={2}
              />
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default AdminDashboard;
