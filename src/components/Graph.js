import React from "react";
import Tree from "react-d3-tree"

let treeData = [
  {
    name: "Top Level",
    parent: "null",
    children: [
      {
        name: "Level 2: A",
        parent: "Top Level",
        children: [
          {
            name: "Son of A",
            parent: "Level 2: A",
          },
          {
            name: "Daughter of A",
            parent: "Level 2: A",
          },
        ],
      },
      {
        name: "Level 2: B",
        parent: "Top Level",
      },
    ],
  },
];

function Graph() {
  return (
    <div className="Graph">
      <h1>Graph</h1>
    </div>
  );
}

export default Graph;
