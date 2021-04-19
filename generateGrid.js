import Map from "./map.js";
import Dijkstra from "./dijkstra.js";

const nav = document.getElementById("navigation");
const info = document.getElementById("info");
const navHeight = nav.offsetHeight;
const infoHeight = info.offsetHeight;

const generateGrid = () => {
  grid.buildGrid();
};

const initializeEventListeners = () => {
  document.getElementById("Dijkstra search").addEventListener("click", activateDijkstra);
  document.getElementById("reset").addEventListener("click", resetGrid);
  window.addEventListener("resize", resetGrid);
};

const generateMouseEvents = () => {
  for (let x = 0; x < grid.rows; x++) {
    for (let y = 0; y < grid.cells; y++) {
      //let nodeID = grid.graph[x][y].id;
      //let node = document.getElementById(nodeID);
      //node.addEventListener("mouseenter", )
    }
  }
  grid.grid.addEventListener("mousedown", handleMouseEnterGrid);
};

const handleMouseEnterGrid = () => {
  //grid.mousePressed = true;
  grid.mousePressed = true;
};

const resetGrid = () => {
  /*
  grid.clear();
  generateGrid();
  generateMouseEvents();
  */
  window.location.reload(false);
};

const calculateGridSize = () => {
  const sizes = {
    height: window.innerHeight,
    width: window.innerWidth };
  return sizes;
};

const calculateRows = (dimensions) => {
  return Math.floor((dimensions.height - navHeight - infoHeight - 100) / 25);
};

const calculateCells = (dimensions) => {
  return Math.floor(dimensions.width / 25);
};

const activateDijkstra = () => {
  let testRun = new Dijkstra(grid);
  testRun.runDijkstra();
};

const dimensions = calculateGridSize();
const rows = calculateRows(dimensions);
const cells = calculateCells(dimensions);
const grid = new Map(rows, cells);
generateGrid();
initializeEventListeners();
generateMouseEvents();
grid.getNeighbors();
