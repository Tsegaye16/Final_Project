import React from "react";
import ReactDOM from "react-dom/client";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      // Add your global styles here
    },
  })
);

const root = ReactDOM.createRoot(document.getElementById("root"));

const StyledApp = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </div>
  );
};

root.render(<StyledApp />);
