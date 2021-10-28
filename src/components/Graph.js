import React from "react";
import Tree from "react-tree-graph";

const orgChart = {
  name: "CEO",
  children: [
    {
      name: "Manager",
      attributes: {
        department: "Production",
      },
      children: [
        {
          name: "Foreman",
          attributes: {
            department: "Fabrication",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
        {
          name: "Foreman",
          attributes: {
            department: "Assembly",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
      ],
    },
  ],
};

function Graph() {
  return (
    <div className="Graph">
      <h1>Graph</h1>
        <Tree data={orgChart} height={400} width={400} />
    </div>
  );
}

export default Graph;
