// FeatureSection.js
import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Container,
  IconButton,
} from "@material-ui/core";
import { motion } from "framer-motion";
import { featuresData } from "../../data";
import FeatureDialog from "./featureDialog";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@material-ui/core";

const Section = ({ children }) => (
  <Paper style={{ padding: "20px", marginBottom: "20px" }}>{children}</Paper>
);
const FeatureSection = ({ back }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const handleOpenDialog = (feature) => {
    console.log(feature);
    setSelectedFeature(feature);
    setOpenDialog(true);
  };
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Paper style={{ padding: "50px", backgroundColor: "#f5f5f5" }}>
      {!back && (
        <Tooltip title="back" arrow>
          <IconButton
            onClick={handleBack}
            style={{ position: "absolute", top: 10, left: 10 }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
      )}
      <Typography variant="h4" gutterBottom>
        Features
      </Typography>
      <Section>
        <Container>
          <Grid container spacing={3}>
            {featuresData.map((feature, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                key={index}
                style={{
                  cursor: "pointer",
                  marginBottom: "20px",
                }}
                onClick={() => handleOpenDialog(feature)}
              >
                <motion.div
                  whileHover={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: -100 }}
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
      <FeatureDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        feature={selectedFeature}
      />
    </Paper>
  );
};

export default FeatureSection;
