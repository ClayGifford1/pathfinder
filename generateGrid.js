import Node from "./cell.js";
import Map from "./map.js";

const graph = document.getElementById("graph");
const nav = document.getElementById("navigation");
const info = document.getElementById("info");
const navHeight = nav.offsetHeight;
const infoHeight = info.offsetHeight;


const generateGrid = () => {
  const sizes = calculateGridSize();
  const rows = Math.floor((sizes.height - navHeight - infoHeight) / 28);
  const cells = Math.floor(sizes.width / 25);

  const grid = new Map(rows, cells);

  for (let x = 0; x < rows; x++) {
    var nodes = [];
    var row = document.createElement("tr");

    for (let y = 0; y < cells; y++) {
      var node = new Node(x, y);

      if (x === Math.floor(x / 2) && y === Math.floor(y / 4)) {
        node.isBase = true;
      }
      else if (x === Math.floor(x / 2) && y === Math.floor(y / 4 * 3)) {
        node.isTarget = true;
      }

      nodes.push(node);
      var cell = node.displayNode();
      row.appendChild(cell);
    }
    graph.appendChild(row);
    grid.graph.push(nodes);
  }
}

const clearGrid = () => {
  const grid = document.getElementById("graph");
  while(grid.hasChildNodes()) {
    grid.removeChild(grid.firstChild);
  }
  Map.clear();
}

const calculateGridSize = () => {
  const sizes = {
    height: window.innerHeight,
    width: window.innerWidth };
  return sizes;
}

const getRows = (dimensions) => {
  return Math.floor((dimensions.height - navHeight - infoHeight) / 28);
}

const getCells = (dimensions) => {
  return Math.floor(dimensions.width / 25);
}

generateGrid();
