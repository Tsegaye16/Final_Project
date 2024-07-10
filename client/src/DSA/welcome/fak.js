import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography variant="h6">
            Why learn data structures and algorithms?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6">
            Strong knowledge of data structures and algorithms enables tech
            professionals to develop more efficient and dynamic solutions to a
            wide range of data-related challenges.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography variant="h6">
            Are data structures easy to learn?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6">
            Mastering data structures can be challenging, especially for less
            experienced learners. You can streamline the process by sharpening
            your problem-solving skills, better acquainting yourself with
            technical language, and seeking out additional guidance. Building a
            solid foundation can take anywhere from several weeks to several
            months, depending on initial experience and course intensity.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography variant="h6">What are stacks and queues?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6">
            Stacks and queues are linear abstract data types (ADTs). Stacks
            follow the “last in, first out” (LIFO) approach, in which the last
            element of a sequence is processed first. It can be thought of like
            a stack of books, which can only be altered from the top. Queues, by
            contrast, are characterized by “first in, first out” (FIFO), in
            which the first element in is processed first. A grocery store
            checkout line is an example of a queue, because the person who is
            first in line will check out first.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography variant="h6">
            Do data structures vary by programming language?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6">
            Syntax refers to the rules that dictate proper arrangements of
            symbols and characters, which can vary.Footnote8 For example, C++,
            Java, and Python are case-sensitive languages, while Basic and SQL
            are case-insensitive. Overarching data structure concepts, on the
            other hand, do not vary.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography variant="h6">
            Which language is best for data structures?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6">
            While no language is necessarily better than others, C++ is a highly
            efficient language for data structures. It offers a number of
            advantages when it comes to memory management, time complexity, and
            data flow. That said, the language is simply a medium. Programmers
            can implement data structures in any language they’re proficient in.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
          <Typography variant="h6">
            Are data structures necessary for web development?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6">
            Within web development, knowledge of data structures isn’t
            essential. However, the industry has evolved greatly over the last
            decade, with many web professionals prioritizing a full-stack skill
            set. In today’s increasingly technical web development space,
            familiarity with data structures can help learners gain a deeper
            understanding of the systems they’re working on.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
