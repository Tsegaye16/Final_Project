// Import necessary components and libraries
import React from "react";
import { Container, Grid, Typography, Link } from "@material-ui/core";

// Footer component
const Footer = () => {
  return (
    <footer
      style={{ backgroundColor: "#2c3e50", color: "#fff", padding: "10px 0" }}
    >
      <Container>
        {/* Footer content */}

        {/* Copyright */}
        <Typography
          variant="body2"
          align="center"
          style={{ marginTop: "20px" }}
        >
          &copy; {new Date().getFullYear()} Wolkite University. All rights
          reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
