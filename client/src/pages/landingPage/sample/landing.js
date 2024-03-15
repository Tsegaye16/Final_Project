import React, { useState, useEffect } from "react";
import { Typography, Container, Grid, Paper, Button } from "@material-ui/core";

import NavigationBar from "./navigation";
import ReadMoreDialog from "./dialog/readMore";
import back from "../../../assets/welcome.avif";
import graph from "../../../assets/sample.png";
import sort from "../../../assets/sort.png";
import Btree from "../../../assets/Btree.png";

import { featuresData } from "../data";
import FeatureDialog from "./dialog/featureDialog";
import { motion, AnimatePresence } from "framer-motion";

const Section = ({ children, border }) => (
  <div
    style={{
      marginTop: border ? "10px" : "44px", // Add a gap if 'border' is true
      borderBottom: border ? "2px solid #ccc" : "none",
    }}
  >
    {children}
  </div>
);

function Landing() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const handleOpenDialog = (feature) => {
    console.log(feature);
    setSelectedFeature(feature);
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
        <Section border={true}>
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
                          href="/login"
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
          <Container>
            <Grid container spacing={3}>
              {/* Display each card initially */}
              {featuresData.map((feature, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  key={index}
                  onClick={() => handleOpenDialog(feature)}
                  style={{
                    cursor: "pointer",
                    marginBottom: "20px",
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: -200 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{
                      duration: 1,
                      ease: "easeInOut",
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    <Paper style={{ padding: "20px", height: "100%" }}>
                      <Typography variant="h5" gutterBottom>
                        {feature.feature}
                      </Typography>
                      <img
                        src={feature.image}
                        alt={feature.feature}
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Section>
      </div>
      {/* About section */}
      <div style={{ backgroundColor: "#fafafa" }}>
        {/* Main container for the About section */}
        <Container>
          <Grid container spacing={3}>
            {/* First Section (Full Width) */}
            <Grid item xs={12}>
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
                  {/* Paper component to style the section */}
                  <Paper style={{ padding: "20px" }}>
                    <Typography variant="h4" gutterBottom>
                      About Our Interactive Data Structure and Algorithm
                      Visualizer
                    </Typography>
                  </Paper>
                </motion.div>
              </AnimatePresence>
            </Grid>

            {/* Second and Third Sections (Divided into Two) */}
            <Grid item xs={12}>
              {/* Paper component to style the section */}
              <Paper style={{ padding: "20px" }}>
                {/* Grid container for dividing the section */}
                <Grid container spacing={3}>
                  {/* Second Section (Left) */}
                  <Grid item xs={12} sm={6}>
                    <Paper style={{ padding: "20px" }}>
                      <Grid container spacing={3}>
                        {/* Image 1 */}
                        <Grid item xs={12} style={{ marginBottom: "20px" }}>
                          <motion.img
                            initial={{ x: -100, opacity: 0 }}
                            animate={{
                              x: [-50, 0],
                              y: [50, 0],
                              opacity: 1,
                              scale: [0.95, 1],
                            }}
                            whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                            whileHover={{ scale: 1.3 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            src={graph}
                            alt=""
                            style={{ width: "100%", height: "auto" }}
                          />
                        </Grid>
                        {/* Image 2 */}

                        <Grid item xs={12}>
                          <motion.img
                            initial={{ x: -100, opacity: 0 }}
                            animate={{
                              x: [-50, 0],
                              y: [50, 0],
                              opacity: 1,
                              scale: [0.95, 1],
                            }}
                            whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                            whileHover={{ scale: 1.3 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            src={Btree}
                            alt=""
                            style={{ width: "100%", height: "auto" }}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <motion.img
                            initial={{ opacity: 0, x: -600 }}
                            animate={{
                              x: [-50, 0],
                              y: [50, 0],
                              opacity: 1,
                              scale: [0.95, 1],
                            }}
                            whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                            whileHover={{ scale: 1.3 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            src={sort}
                            alt=""
                            style={{ width: "100%", height: "auto" }}
                          />
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>

                  {/* Third Section (Right) */}
                  <Grid item xs={12} sm={6}>
                    {/* Paper component to style the section */}
                    <Paper style={{ padding: "20px" }}>
                      <Typography variant="h5" gutterBottom>
                        Third Section (Right)
                      </Typography>
                      {/* Add your content here */}
                      <Typography variant="body1">
                        This section is positioned on the right side.
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>

      {/* Team Section */}
      <Section>
        <Container>{/* Your team section content */}</Container>
      </Section>

      {/* Contact Section */}
      <Section>
        <Container>{/* Your contact section content */}</Container>
      </Section>

      {/* Footer */}
      <Section>
        <Container>{/* Your footer content */}</Container>
      </Section>

      {/* Read More Dialog */}
      <ReadMoreDialog open={openDialog} handleClose={handleCloseDialog} />

      <FeatureDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        feature={selectedFeature}
      />
    </div>
  );
}

export default Landing;
