import Grid from "./map.js";
import Dijkstra from "./dijkstra.js";
import Astar from "./aStar.js";

const nav = document.getElementById("navigation");
const info = document.getElementById("info");
const navHeight = nav.offsetHeight;
const infoHeight = info.offsetHeight;
//var mousePressed = false;
var baseCellMoving = false;
var targetCellMoving = false;

const generateGrid = () => {
  grid.buildGrid();
};

const initializeEventListeners = () => {
  document.getElementById("Dijkstra search").addEventListener("click", activateDijkstra);
  document.getElementById("Astar search").addEventListener("click", activateAstar);
  document.getElementById("reset").addEventListener("click", resetGrid);
  window.addEventListener("resize", resetGrid);
};

const generateMouseEvents = () => {

  for (let x = 0; x < grid.rows; x++) {
    for (let y = 0; y < grid.cells; y++) {

      let nodeID = grid.graph[x][y].id;
      let node = document.getElementById(nodeID);

      node.addEventListener("mouseenter", function() {

        let status = mouseDownStatus();
        if (status) {

          if (baseCellMoving && !checkTargetCell(x, y)) {
            this.className = "base";
          }
          if (targetCellMoving && !checkBaseCell(x, y)) {
            this.className = "target";
          }
          if (!baseCellMoving && !targetCellMoving) {
            if (!checkBaseCell(x, y) && !checkTargetCell(x, y)) {
              this.className = "pressed";
            }
          }
        }
      });

      node.addEventListener("mouseleave", function() {

        let status = mouseDownStatus();
        if (status) {

          if (baseCellMoving && !checkTargetCell(x, y)) {
            this.className = "cell";
            if (checkBaseCell(x, y)) {
              grid.graph[x][y].isBase = false;
            }
          }
          if (targetCellMoving && !checkBaseCell(x, y)) {
            this.className = "cell";
            if (checkTargetCell(x, y)) {
              grid.graph[x][y].isTarget = false;
            }
          }
        }
      });

      node.addEventListener("mousedown", function() {

        if (checkBaseCell(x, y)) {
          baseCellMoving = true;
        }
        if (checkTargetCell(x, y)) {
          targetCellMoving = true;
        }
        if (!baseCellMoving && !targetCellMoving) {
          this.className = "pressed";
        }
      });

      node.addEventListener("mouseup", function() {

        let status = mouseDownStatus();
        if (status) {

          if (baseCellMoving) {
            grid.graph[x][y].isBase = true;
            grid.baseNode = this;
            this.className = "base";
            baseCellMoving = false;
          }
          if (targetCellMoving) {
            grid.graph[x][y].isTarget = true;
            grid.targetNode = this;
            this.className = "target";
            targetCellMoving = false;
          }
        }
      });
    }
  }
  grid.grid.addEventListener("mousedown", handleMouseDownGrid);
  grid.grid.addEventListener("mouseup", handleMouseUpGrid);
};

const mouseDownStatus = () => {
  return grid.mousePressed;
};

const checkBaseCell = (x, y) => {
  return grid.graph[x][y].isBase;
};

const checkTargetCell = (x, y) => {
  return grid.graph[x][y].isTarget;
};

const handleMouseDownGrid = () => {
  grid.mousePressed = true;
  //mousePressed = true;
};

const handleMouseUpGrid = () => {
  grid.mousePressed = false;
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

const activateAstar = () => {
  let testRun = new Astar(grid);
  testRun.runAstar();
};

const dimensions = calculateGridSize();
const rows = calculateRows(dimensions);
const cells = calculateCells(dimensions);
const grid = new Grid(rows, cells);

generateGrid();
initializeEventListeners();
generateMouseEvents();
// grid.getNeighbors();
