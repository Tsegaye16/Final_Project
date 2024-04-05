import React from "react";
import image from "../../assets/DSA-welcome.png";
import { Container, Box, Typography, makeStyles } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import CustomizedAccordions from "./fak";
import Footer from "../../pages/landingPage/sample/dialog/footer";

const useStyles = makeStyles((theme) => ({
  root1: {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    //minHeight: "100vh", // Minimum height of the viewport
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  root: {
    display: "flex",
    flexDirection: "column",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "#f0f0f0",
    width: "100%",
    //minHeight: "100vh", // Minimum height of the viewport
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  content1: {
    backgroundColor: "rgba(255, 255, 255, 0)", // Semi-transparent white background for content
    padding: theme.spacing(2),
    // maxWidth: 600, // Adjust this as needed
    color: "white",
    width: "100%", // Ensure content takes full width
  },
  box: {
    backgroundColor: "white",
  },
}));

function Welcome() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root1}>
        <Container>
          <Box className={classes.content1}>
            <Typography variant="h2">
              Learn data structures and algorithm in a fun way!
            </Typography>
            <Typography variant="h6" gutterBottom>
              Data structures are essential to computer science. They enable
              data storage, management, and processing, making it easy for users
              to retrieve data for a variety of purposes. you are at the right
              place if you want to learn about common data structures such as
              linked lists, stacks, queues, trees, binary search trees, hash
              tables, you want to learn about these concepts in an interactive
              way that is both engaging and educational.
            </Typography>
          </Box>
        </Container>
      </div>
      <div className={classes.root}>
        <Container className={classes.box}>
          <Box>
            <Typography variant="h4">
              <br />
              What are data structures?
            </Typography>
            <br />
            <Typography variant="h6">
              A data structure is a specialized format used to store, process,
              and retrieve data. By providing a unique framework for each set of
              data, these programmatic building blocks streamline information
              access and management.
              <br />
              <br />
              Data structures typically fall into two overarching categories:
              linear and nonlinear. Linear data structures involve ordered
              sequences of elements and offer simple implementation for
              non-complex programs. There are four major linear data structure
              types:
              <ul>
                <li>
                  <b>Array፡ </b> in which elements of the same type are stored
                  contiguously
                </li>

                <li>
                  <b>Stack: </b> in which the last element is processed first
                </li>
                <li>
                  <b>Queues: </b> in which the first element is processed first{" "}
                </li>
                <li>
                  <b>Linked lists: </b> in which elements are linked through
                  nodes, or contiguously arranged data units
                </li>
              </ul>
              Nonlinear data structures contain non-sequential arrangements of
              elements. In these structures, each element is linked to one or
              more elements. Nonlinear data structure types include:
              <ul>
                <li>
                  <b>Graphs:</b> which consist of nodes (also known as vertices)
                  that are linked through edges.
                </li>
                <li>
                  <b>Trees:</b> in which any two vertices can be linked by only
                  one edge
                </li>
              </ul>
              In addition to linear and nonlinear classifications, data
              structures can also be static or dynamic. Static data structures
              are arranged in a fixed format that cannot be changed.
              Alternatively, dynamic data structures adapt to the information
              present at any given time, growing or shrinking to fit the data.
              <br />
            </Typography>
          </Box>
        </Container>
        <br />
        <Divider />
        <Container className={classes.box}>
          <Box>
            <Typography variant="h4">
              <br />
              Data structures course curriculum
            </Typography>
            <br />
            <Typography variant="h6">
              <br />
              Data structures are the building blocks of programming, driving
              efficiency and organization from the ground up. By taking a data
              structures course, aspiring programmers can gain the skills they
              need to thrive in today’s increasingly tech-driven landscape.
              <br />
              <br /> A fundamentals course can help new learners get up to speed
              with the basics of data structures. Before studying advanced
              concepts, learners may explore common data structures through
              hands-on exercises. Specialized topics can provide in-depth
              knowledge of algorithms, software engineering, and programming
              frameworks. <br />
              <br />
              Data structures are also a foundational component of computer
              science. Learners interested in pursuing a computer science
              education may find it beneficial to explore related data structure
              classes in Java data structures or object-oriented programming.
            </Typography>
            <br></br>
            <Typography variant="h3">
              Explore jobs that use data structures
            </Typography>
            <br />
            <Typography variant="h6">
              Many roles require a thorough understanding of data structures.
              These may include:
              <ul>
                <li>
                  <b>Data engineer:</b> These engineers develop and optimize
                  complex databases and systems, design algorithms, and oversee
                  data retrieval and storage.Footnote2 By mastering data
                  structures concepts, they can maximize efficiency and
                  recognize crucial patterns. These are both must-have skills
                  for those who work with large amounts of data.Footnote3
                </li>
                <li>
                  <b>Software engineer:</b> Software engineers drive and oversee
                  the entire development process, from conception to launch.
                  This requires advanced programming knowledge, a skill set that
                  includes a strong background in data structures.
                </li>
                <li>
                  <b>Developer: </b>hese programming experts are often tasked
                  with testing, designing, and overseeing software development.
                  In order to do so, they need to understand Python, Java, C++,
                  and other popular programming languages.Footnote5 By
                  familiarizing themselves with data structures, developers can
                  devise more dynamic and efficient solutions.
                </li>
              </ul>
            </Typography>
          </Box>
        </Container>
        <br />
        <Divider />
        <Container className={classes.box}>
          <Box>
            <Typography variant="h4">
              <br />
              Frequently asked questions.
            </Typography>
            <br />
            <CustomizedAccordions />
            <br />
          </Box>
        </Container>
      </div>
    </>
  );
}

export default Welcome;
