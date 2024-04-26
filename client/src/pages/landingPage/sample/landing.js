import React, { useState, useEffect } from "react";
import { Typography, Container, Grid, Paper, Button } from "@material-ui/core";

import NavigationBar from "./navigation";
import ReadMoreDialog from "./dialog/readMore";
import back from "../../../assets/welcome.avif";

import { motion, AnimatePresence } from "framer-motion";

import Team from "./dialog/team";
import { ContactUs } from "../../../popup/contact/contact";

import FeatureSection from "./dialog/feature";
import AboutSection from "./dialog/AboutSection";

const Section = ({ children, border }) => (
  <div
    style={{
      borderBottom: border ? "2px solid #ccc" : "none",
    }}
  >
    {children}
  </div>
);

function Landing() {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = (feature) => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const gridItemVariants = {
    rectangle: {
      width: "100%",
      height: "100%",
      borderRadius: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    circle: {
      width: "200px",
      height: "200px",
      borderRadius: "50%",
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const [isCircle, setIsCircle] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIsCircle((prevState) => !prevState),
      2000
    ); // Toggle every 2 seconds
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div>
      <NavigationBar id="navbar" />
      {/* Home Section */}
      <div style={{ backgroundColor: "#eceff1" }}>
        <Section border={true} minHeight="400px">
          <Container style={{ paddingTop: "84px" }}>
            <Grid container spacing={3}>
              {/* First Card */}

              <Grid item xs={12} sm={6}>
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    //animate={{ opacity: 1, x: 0 }}

                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      ease: "easeOut",
                      duration: 1,
                      type: "spring",
                      stiffness: 70,
                    }}
                    exit={{ opacity: 0, x: -100 }}
                  >
                    <Paper
                      style={{
                        minHeight: "200px",
                        padding: "20px",
                        position: "relative",
                        marginBottom: "30px",
                      }}
                    >
                      <Typography variant="h4" gutterBottom>
                        Unlock the Power of Algorithms with Real-time
                        Visualization!
                      </Typography>
                      <div
                        style={{
                          marginTop: "50px",
                        }}
                      >
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleOpenDialog()}
                          style={{
                            position: "absolute",
                            left: "20px",
                            bottom: "20px",
                          }}
                        >
                          Read More
                        </Button>
                        <Button
                          href="/student"
                          variant="contained"
                          color="primary"
                          style={{
                            position: "absolute",
                            right: "20px",
                            bottom: "20px",
                          }}
                        >
                          Start
                        </Button>
                      </div>
                    </Paper>
                  </motion.div>
                </AnimatePresence>
              </Grid>
              {/* Second Card */}
              <Grid
                item
                xs={12}
                sm={6}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <AnimatePresence>
                  <motion.div
                    variants={gridItemVariants}
                    animate={isCircle ? "circle" : "rectangle"}
                    style={{
                      backgroundImage: `url(${back})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      padding: "20px",
                    }}
                  />
                </AnimatePresence>
              </Grid>
            </Grid>
          </Container>
        </Section>
      </div>
      {/* Feature Section */}
      <div style={{ backgroundColor: "#f5f5f5" }}>
        <Section border={true}>
          <FeatureSection />
        </Section>
      </div>
      {/* About section */}

      <AboutSection />

      {/* Team Section */}
      <div style={{ backgroundColor: "#eeeeee" }}>
        <Section border={true}>
          <Container>
            <Team />
          </Container>
        </Section>
      </div>

      {/* Contact Section */}
      <div style={{ backgroundColor: "#eceff1" }}>
        <Section border={true}>
          <Container>
            <ContactUs />
          </Container>
        </Section>
      </div>

      {/* Read More Dialog */}
      <ReadMoreDialog open={openDialog} handleClose={handleCloseDialog} />
    </div>
  );
}

export default Landing;
