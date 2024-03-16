import React from "react";
import { Typography, Grid, Paper } from "@material-ui/core";
import { motion } from "framer-motion";

const Feature = ({ title, description }) => {
  return (
    <Grid item xs={12}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, x: -100, y: 100 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        //   animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
      >
        <Paper style={{ padding: "20px", border: "1px solid #ccc" }}>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
          <Typography paragraph>{description}</Typography>
        </Paper>
      </motion.div>
    </Grid>
  );
};

const AboutInteractiveContent = () => {
  const features = [
    {
      title: "Interactive Visualizations",
      description:
        "Witness data structures and algorithms come to life with dynamic animations, making complex concepts easier to understand.",
    },
    {
      title: "Step-by-Step Explanations",
      description:
        "Follow detailed explanations alongside each visualization, providing a clear understanding of each step involved.",
    },
    {
      title: "Variety of Data Structures and Algorithms",
      description:
        "Explore a wide range of commonly used data structures (e.g., arrays, linked lists, trees, graphs) and algorithms (e.g., sorting, searching, traversing) with dedicated visualizations.",
    },
    {
      title: "Customization Options",
      description:
        "Tailor your learning experience by adjusting visualization speed, input data, or algorithm parameters.",
    },
  ];

  return (
    <Grid container spacing={3}>
      {features.map((feature, index) => (
        <Feature
          key={index}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </Grid>
  );
};

export default AboutInteractiveContent;
