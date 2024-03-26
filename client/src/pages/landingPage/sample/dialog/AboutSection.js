import React from "react";
import { Typography, Grid, Paper } from "@material-ui/core";
import { motion } from "framer-motion";
import sort from "../../../../assets/sort.png";
import AboutInteractiveContent from "./About";

const AboutSection = () => {
  return (
    <div style={{ borderBottom: "2px solid #ccc" }}>
      <Paper style={{ padding: "20px", backgroundColor: "#e0e0e0" }}>
        <Grid container spacing={3}>
          {/* First Section (Full Width) */}
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
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
              <Typography variant="h4" gutterBottom>
                About Our Interactive Data Structure and Algorithm Visualizer
              </Typography>
            </motion.div>
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
                          initial={{ opacity: 0, x: 100, y: 100 }}
                          whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                          whileHover={{ scale: 1.14 }}
                          transition={{ duration: 1, ease: "easeInOut" }}
                          src={sort}
                          alt=""
                          style={{ width: "100%", height: "auto" }}
                        />
                      </Grid>
                      {/* Image 2 */}
                      <Grid item xs={12}>
                        <motion.img
                          initial={{ opacity: 0, x: 100, y: 100 }}
                          whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                          whileHover={{ scale: 1.14 }}
                          transition={{ duration: 1, ease: "easeInOut" }}
                          src={sort}
                          alt=""
                          style={{ width: "100%", height: "auto" }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <motion.img
                          initial={{ opacity: 0, x: 100, y: 100 }}
                          whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                          whileHover={{ scale: 1.14 }}
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
                  <Paper style={{ padding: "20px" }}>
                    <AboutInteractiveContent />
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default AboutSection;
