import React from "react";
import { Grid, Paper, Typography, IconButton, Avatar } from "@material-ui/core";
import { GitHub, LinkedIn, Email, Phone } from "@material-ui/icons";
import tsegaye from "../../../../assets/Tsegaye.jpg";
import { motion } from "framer-motion";
import genet from "../../../../assets/genet.jpg";
import kefle from "../../../../assets/kefle.jpg";

const TeamMember = ({ name, role, github, linkedin, email, phone, image }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        elevation={3}
        style={{ padding: "20px", marginBottom: "20px", textAlign: "center" }}
      >
        <Avatar
          src={image}
          alt={name}
          style={{ width: 100, height: 100, margin: "0 auto 10px" }}
        />
        <Typography
          variant="h5"
          gutterBottom
          style={{ textAlign: "center", marginBottom: "4px" }}
        >
          {name}
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          style={{ textAlign: "center", marginTop: "4px" }}
        >
          {role}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <span>👋, I'm Tsegaye</span>
          <p>
            fourth-year Information Systems student with a deep passion for
            problem-solving and software development. Currently on the exciting
            journey of a 12-month software engineering program at ALX and
            delving into the world of Applied Data Science with a three-month
            stint at WorldQuant University. My obsession with technology fuels
            my desire to contribute to innovative solutions and embrace the
            ever-evolving landscape of software development. Let's connect and
            explore the endless possibilities in the realm of tech!
          </p>
        </Typography>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <IconButton href={github} target="_blank" rel="noopener noreferrer">
              <GitHub />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton href={`mailto:${email}`}>
              <Email />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton href={`tel:${phone}`}>
              <Phone />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </motion.div>
  );
};

const Team = () => {
  const teamMembers = [
    {
      name: "Tsegaye Abewa",
      role: "Full-stack Developer",
      github: "https://github.com/Tsegaye16",
      linkedin: "https://www.linkedin.com/in/tsegaye-abewa-45b456289",
      email: "abewatsegaye16@gmail.com",
      phone: "+251995213296",
      image: tsegaye,
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom align="center">
        Our Team
      </Typography>
      <Grid container spacing={3}>
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <TeamMember {...member} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Team;
