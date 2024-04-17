import React from "react";
import GraphLogic from "./logic/graph_logic";
import { Box, Container, Typography } from "@mui/material";
// import Operation from "./logic/Operation";
// import CodeTemplate from "./code/CodeTemplate";

const useStyles = {
  root: {
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "24px",
    marginBottom: "24px",
  },
  title: {
    fontWeight: "bold",
    marginBottom: "16px",
  },
  paragraph: {
    marginBottom: "24px",
  },
  subTitle: {
    fontWeight: "bold",
    marginBottom: "8px",
  },
  section: {
    marginBottom: "24px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "16px",
  },
};

function Graph() {
  return (
    <Container maxWidth="lg">
      <Box sx={useStyles.section}>
        <Box sx={useStyles.root}>
          <Typography variant="h6" sx={useStyles.title}>
            Introduction
          </Typography>
          <Typography variant="body1" sx={useStyles.paragraph}>
            In data structures, graphs are a collection of nodes or vertices
            connected by edges. They are used to represent relationships and
            connections between different elements, allowing for efficient
            modelling and analysis of complex systems. Graphs provide a powerful
            framework for solving problems in various domains, such as network
            analysis, social media analysis, and route planning. Let's
            understand more!
            <br />
            <br />
            Let us understand what is a graph in the data structure. Graphs are
            non-linear data structures comprising a set of nodes (or vertices),
            connected by edges (or arcs). Nodes are entities where the data is
            stored, and their relationships are expressed using edges. Edges may
            be directed or undirected. Graphs easily demonstrate complicated
            relationships and are used to solve many real-life problems.
            <br />
            <br />
            For example, Facebook uses a graph data structure comprising a group
            of entities and their relationships. On Facebook, every user, photo,
            post, page, place, etc., that has data is represented with a node.
            Every edge from one node to another represents their relationships,
            friendships, ownerships, tags, etc. Whenever a user posts a photo,
            comments on a post, etc., a new edge is created for that
            relationship. Both nodes and edges have meta-data associated with
            them.
            <br />
            <br />
            Graphs are powerful data structures that represent real-life
            relationships between entities. Graphs are used everywhere, from
            social networks, Google Maps, and the World Wide Web to blockchains
            and neural networks. Due to their ability to provide abstractions to
            real life, they are used in various practical problems. This article
            will dive deep into graphs in the data structure, their types,
            terminologies, operations, representation, and applications.
          </Typography>
        </Box>
        <Box sx={useStyles.root}>
          <Typography variant="h6" sx={useStyles.title}>
            Operation of graph
          </Typography>
          <Typography variant="body1" sx={useStyles.paragraph}>
            <ul>
              <li style={{ fontSize: "29px", listStyle: "none" }}>
                <Typography variant="h6" sx={useStyles.subTitle}>
                  Basic terminologies of the graph
                </Typography>
              </li>
              <ul style={{ listStyle: "none" }}>
                <li>
                  <b>Vertex: </b>An individual data element of a graph is called
                  Vertex.
                </li>
                <li>
                  <b>Edge:</b>An edge is a connecting link between two vertices.
                  An Edge is also known as Arc.
                </li>
                <li>
                  <b>Path: </b>A path can be defined as the sequence of nodes
                  that are followed in order to reach some terminal node V from
                  the initial node U.
                </li>
                <li>
                  <b>Adjacency:</b>Two node or vertices are adjacent if they are
                  connected to each other through an edge. In the following
                  example, B is adjacent to A, C is adjacent to B, and so on.
                </li>
              </ul>
              <li style={{ fontSize: "29px", listStyle: "none" }}>
                <Typography variant="h6" sx={useStyles.subTitle}>
                  Types of graph
                </Typography>
              </li>
              <ol>
                <li>
                  <b>Undirected: </b> A graph in which all the edges are
                  bi-directional. The edges do not point in a specific
                  direction.
                </li>
                <li>
                  <b>Directed: </b> A graph in which all the edges are
                  uni-directional. The edges point in a single direction.
                </li>
              </ol>
              <li style={{ fontSize: "29px", listStyle: "none" }}>
                <Typography variant="h6" sx={useStyles.subTitle}>
                  Representation of graph
                </Typography>
              </li>
              <ul style={{ listStyle: "none" }}>
                <li>
                  <b>Adjacency List Representation: </b> In this representation,
                  every vertex of the graph contains a linked list of its
                  neighboring vertices and edges.
                  <br />
                  <br /> An array of lists is used where the size of the array
                  is equal to the number of vertices. Each of the elements in
                  the arrays contains a linked list of all the vertices adjacent
                  to the list.
                </li>
                <li>
                  <b>Adjacency Matrix Representation: </b> In this
                  representation, the graph can be represented using a matrix of
                  size total number of vertices by the total number of vertices.
                  Here, rows and columns both represent vertices. This matrix is
                  filled with either 1 or 0.
                </li>
              </ul>
              <li style={{ fontSize: "29px", listStyle: "none" }}>
                <Typography variant="h6" sx={useStyles.subTitle}>
                  Application of graph
                </Typography>
              </li>
              <ul>
                <li>
                  <b>Family trees: </b> can be mapped where the member nodes
                  have an edge from parent to each of their children.
                </li>
                <li>
                  <b>Transportation networks: </b> in which nodes are airports,
                  intersections, ports, etc. The edges can be airline flights,
                  one-way roads, shipping routes, etc.
                </li>
              </ul>
              <li style={{ fontSize: "29px", listStyle: "none" }}>
                <Typography variant="h6" sx={useStyles.subTitle}>
                  Operations of graph
                </Typography>
              </li>
              <ul>
                <li>
                  <b>Add/Remove Vertex: </b> Add or remove a vertex in a graph.
                </li>
                <li>
                  <b>Add/Remove Edge: </b>Add or remove an edge between two
                  vertices.
                </li>
              </ul>
              <li style={{ fontSize: "29px", listStyle: "none" }}>
                <Typography variant="h6" sx={useStyles.subTitle}>
                  Graph traversal
                </Typography>
              </li>
              <Typography>
                Graph traversal is visiting or updating each vertex in a graph.
                The order in which they visit the vertices classifies the
                traversals. There are two ways to implement a graph traversal:
              </Typography>
              <ol>
                <li>
                  <Typography variant="body1">
                    <b>Breadth-First Search (BFS): </b> It is a traversal
                    operation that horizontally traverses the graph. It
                    traverses all the nodes at a single level before moving to
                    the next level. It begins at the graph’s root and traverses
                    all the nodes at a single depth level before moving on to
                    the next level.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    <b>Depth-First Search (DFS):</b> his is another traversal
                    operation that traverses the graph vertically. It starts
                    with the root node of the graph and investigates each branch
                    as far as feasible before backtracking.
                  </Typography>
                </li>
              </ol>
              <li style={{ fontSize: "29px", listStyle: "none" }}>
                <Typography variant="h6" sx={useStyles.subTitle}>
                  Visualize it
                </Typography>
              </li>
            </ul>
            <GraphLogic />
          </Typography>
        </Box>
        <Box sx={useStyles.root}>
          <Typography variant="h6" sx={useStyles.title}>
            Implementation
          </Typography>
          <Typography variant="body1" sx={useStyles.paragraph}>
            drop the implementation here....
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Graph;
