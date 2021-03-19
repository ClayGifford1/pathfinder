import Node from './cell.js';

const generateGrid = () => {
  const grid = document.getElementById("graph");
  const nav = document.getElementById("navigation");
  const info = document.getElementById("info");
  const navHeight = nav.offsetHeight;
  const infoHeight = info.offsetHeight;
  const sizes = calculateGridSize();
  const rows = (sizes.height - navHeight - infoHeight) / 27;
  const cells = sizes.width / 25;

  for (let x = 0; x < rows; x++) {
    var row = document.createElement("tr");
    for (let y = 0; y < cells; y++) {
      var node = new Node(x, y);
      var cell = node.createNode();
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
}

const clearGrid = () => {
  const grid = document.getElementById("graph");
  while(grid.hasChildNodes()) {
    grid.removeChild(grid.firstChild);
  }
}

const calculateGridSize = () => {
  const sizes = {
    height: window.innerHeight,
    width: window.innerWidth };
  return sizes;
}

generateGrid();
