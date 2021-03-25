import Node from "./cell.js";
import Map from "./map.js";
// import dijkstra from "./dijkstra.js"

const graph = document.getElementById("graph");
const nav = document.getElementById("navigation");
const info = document.getElementById("info");
const navHeight = nav.offsetHeight;
const infoHeight = info.offsetHeight;


const generateGrid = () => {
  for (let x = 0; x < rows; x++) {
    var nodes = [];
    var row = document.createElement("tr");

    for (let y = 0; y < cells; y++) {
      var node = new Node(x, y);

      if (x === Math.floor(rows / 2) && y === Math.floor(cells / 4)) {
        node.isBase = true;
      }
      else if (x === Math.floor(rows / 2) && y === Math.floor(cells / 4 * 3)) {
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
  grid.clear();
}

const calculateGridSize = () => {
  const sizes = {
    height: window.innerHeight,
    width: window.innerWidth };
  return sizes;
}

const calculateRows = (dimensions) => {
  return Math.floor((dimensions.height - navHeight - infoHeight) / 28);
}

const calculateCells = (dimensions) => {
  return Math.floor(dimensions.width / 25);
}


const dimensions = calculateGridSize();
const rows = calculateRows(dimensions);
const cells = calculateCells(dimensions);
const grid = new Map(rows, cells);
generateGrid();
