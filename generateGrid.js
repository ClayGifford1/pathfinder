import { HtmlGrid, Grid, HtmlCell, Cell } from "./htmlGrid.js";

const nav = document.getElementById("navigation");
//const info = document.getElementById("info");
const playground = document.getElementById("playground");
const alerts = document.getElementById("alerts");
const rules = document.getElementById("rules");
const navHeight = nav.offsetHeight;
//const infoHeight = info.offsetHeight;
const alertHeight = alerts.offsetHeight;
const rulesHeight = rules.offsetHeight;
var boardActive = true;
var algoEligible = false;
var algo = "";

const initializeButtonEvents = () => {
  document.getElementById("Dijkstra search").addEventListener("click", activateDijkstra);
  document.getElementById("aStar search").addEventListener("click", activateAStar);
  document.getElementById("search").addEventListener("click", runSearch);
  document.getElementById("reset").addEventListener("click", reload);
  window.addEventListener("resize", reload);
  //document.getElementById("reset").addEventListener("click", grid.reset.bind(grid));
  //window.addEventListener("resize", grid.reset.bind(grid));
};

const reload = () => {
  location.reload();
};

const initializeGridEvents = () => {
  for (let row = 0; row < rows; row++) {
    for (let cell = 0; cell < cells; cell++) {
      grid.grid[row][cell].element.addEventListener("mousedown", function() { handleMouseDown(row, cell); });
      grid.grid[row][cell].element.addEventListener("mouseup", function() { handleMouseUp(row, cell); });
      grid.grid[row][cell].element.addEventListener("mouseenter", function() { handleMouseEnter(row, cell); });
      grid.grid[row][cell].element.addEventListener("mouseleave", function() { handleMouseLeave(row, cell); });
    }
  }
};

const handleMouseDown = (row, cell) => {
  if (boardActive) {
    grid.handleMouseDown(row, cell);
  }
  else {
    let reset = document.getElementById("reset-alert");
    reset.className = "visible";
  }
};

const handleMouseUp = (row, cell) => {
  grid.handleMouseUp(row, cell);
};

const handleMouseEnter = (row, cell) => {
  grid.handleMouseEnter(row, cell);
};

const handleMouseLeave = (row, cell) => {
  grid.handleMouseLeave(row, cell);
};

const calculateGridSize = () => {
  const sizes = {
    height: window.innerHeight,
    width: window.innerWidth };
  return sizes;
};

const calculateRows = (dimensions) => {
  return Math.floor((dimensions.height - navHeight - alertHeight - rulesHeight - 100) / 35);
};

const calculateCells = (dimensions) => {
  return Math.floor(dimensions.width / 35);
};

const runSearch = () => {
  if (boardActive) {
    if (algoEligible) {
      if (algo == "dijkstra") {
        grid.runDijkstraSearch();
        algoEligible = false;
      }
      if (algo == "aStar") {
        grid.runAstarSearch();
        algoEligible = false;
      }
      boardActive = false;
    }
    else {
      let runError = document.getElementById("run-alert");
      runError.className = "visible";    
    } 
  }
  else {
    let reset = document.getElementById("reset-alert");
    reset.className = "visible";
  }
}

const activateDijkstra = () => {
  algo = "dijkstra";
  algoEligible = true;
  let runError = document.getElementById("run-alert");
  runError.className = "invisible";  
}

const activateAStar = () => {
  algo = "aStar";
  algoEligible = true;
  let runError = document.getElementById("run-alert");
  runError.className = "invisible";  
}

/*
const activateDijkstra = () => {
  if (algoEligible) {
    grid.runDijkstraSearch();
    algoEligible = false;
  }
  else {
    let reset = document.getElementById("reset-alert");
    reset.className = "visible";
  }
};

const activateAStar = () => {
  if (algoEligible) {
    grid.runAstarSearch();
    algoEligible = false;
  }
  else {
    let reset = document.getElementById("reset-alert");
    reset.className = "visible";
  }
};
*/

const dimensions = calculateGridSize();
const rows = calculateRows(dimensions);
const cells = calculateCells(dimensions);
const grid = new Grid(rows, cells);
playground.appendChild(grid.element);

initializeButtonEvents();
initializeGridEvents();
