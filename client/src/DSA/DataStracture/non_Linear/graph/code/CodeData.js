export const codeStrings = {
  Python: `
from collections import defaultdict

class Graph:
    def __init__(self):
        self.graph = defaultdict(list)

    def addVertex(self, vertex):
        if vertex not in self.graph:
            self.graph[vertex] = []

    def addEdge(self, vertex1, vertex2):
        self.graph[vertex1].append(vertex2)
        self.graph[vertex2].append(vertex1)

    def removeVertex(self, vertex):
        if vertex in self.graph:
            del self.graph[vertex]
            for key in self.graph:
                if vertex in self.graph[key]:
                    self.graph[key].remove(vertex)

    def removeEdge(self, vertex1, vertex2):
        if vertex1 in self.graph and vertex2 in self.graph[vertex1]:
            self.graph[vertex1].remove(vertex2)
        if vertex2 in self.graph and vertex1 in self.graph[vertex2]:
            self.graph[vertex2].remove(vertex1)

    def BFS(self, source):
        queue = [source]
        result = []

        while queue:
            current = queue.pop(0)
            result.append(current)
            for neighbor in self.graph[current]:
                queue.append(neighbor)

        return result

    def DFS(self, source):
        stack = [source]
        result = []

        while stack:
            current = stack.pop()
            result.append(current)
            for neighbor in self.graph[current]:
                stack.append(neighbor)

        return result

# Example usage
g = Graph()
g.addVertex(1)
g.addVertex(2)
g.addEdge(1, 2)
# Perform other operations as needed

  `,
  "C/C++": `
  #include <stdio.h>
  #include <stdlib.h>
  #include <stdbool.h>
  
  #define MAX_VERTICES 100
  
  struct Graph {
      int vertices[MAX_VERTICES];
      int edges[MAX_VERTICES][MAX_VERTICES];
      int vertexCount;
  };
  
  struct Graph* createGraph() {
      struct Graph* graph = (struct Graph*)malloc(sizeof(struct Graph));
      graph->vertexCount = 0;
      return graph;
  }
  
  void addVertex(struct Graph* graph, int vertex) {
      graph->vertices[graph->vertexCount++] = vertex;
  }
  
  void addEdge(struct Graph* graph, int vertex1, int vertex2) {
      graph->edges[vertex1][vertex2] = 1;
      graph->edges[vertex2][vertex1] = 1;
  }
  
  void removeVertex(struct Graph* graph, int vertex) {
      // Code for removing a vertex and its edges
  }
  
  void removeEdge(struct Graph* graph, int vertex1, int vertex2) {
      graph->edges[vertex1][vertex2] = 0;
      graph->edges[vertex2][vertex1] = 0;
  }
  
  void BFS(struct Graph* graph, int source) {
      // Code for BFS traversal
  }
  
  void DFS(struct Graph* graph, int source) {
      // Code for DFS traversal
  }
  
  int main() {
      struct Graph* graph = createGraph();
      addVertex(graph, 1);
      addVertex(graph, 2);
      addEdge(graph, 1, 2);
      // Perform other operations as needed
      return 0;
  }
  
  `,
  JavaScript: `
class Graph {
    constructor(graph) {
        this.graph = graph;
    }

    addVertex(vertex) {
        if (!this.graph[vertex]) {
        this.graph[vertex] = [];
        }
    }

    addEdge(vertex1, vertex2) {
        this.graph[vertex1].push(vertex2);
        this.graph[vertex2].push(vertex1);
    }

    removeVertex(vertex) {
        if (!this.graph[vertex]) {
            return;
        }

        // Remove the vertex from all adjacency lists
        for (let adjacentVertex of this.graph[vertex]) {
            const index = this.graph[adjacentVertex].indexOf(vertex);
            if (index !== -1) {
                this.graph[adjacentVertex].splice(index, 1);
            }
        }

        // Remove the vertex itself
        delete this.graph[vertex];
    }

    removeEdge(vertex1, vertex2) {
        if (!this.graph[vertex1] || !this.graph[vertex2]) {
            return;
        }

        // Remove vertex2 from the adjacency list of vertex1
        const index1 = this.graph[vertex1].indexOf(vertex2);
        if (index1 !== -1) {
            this.graph[vertex1].splice(index1, 1);
        }

        // Remove vertex1 from the adjacency list of vertex2
        const index2 = this.graph[vertex2].indexOf(vertex1);
        if (index2 !== -1) {
            this.graph[vertex2].splice(index2, 1);
        }
    }

    BFS(source) {
        let queue = [source];
        let result = [];

        while (queue.length > 0) {
            let current = queue.shift();
            result.push(current);

            for (let neighbor of this.graph[current]) {
                queue.push(neighbor);
            }
        }

        return result;
    }

    DFS(source) {
        let stack = [source];
        let result = [];

        while (stack.length > 0) {
            const current = stack.pop();
            result.push(current);

            for (let neighbor of this.graph[current]) {
                stack.push(neighbor);
            }
        }

        return result;
    }
}
  `,
};
