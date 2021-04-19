import Node from "./cell.js";

export default class Map {
  constructor(rows, cells) {
    this.rows = rows;
    this.cells = cells;
    this.graph = [];
    this.grid = document.getElementById("grid");
    this.mousePressed = false;
    // this.cellNeighbors = 8;
    this.cellNeighbors = 4;
    // this.possibleNeighborRowAdjustment = [1, 1, 0, -1, -1, -1, 0, 1];
    // this.possibleNeighborCellAdjustment = [0, 1, 1, 1, 0, -1, -1, -1];
    this.possibleNeighborRowAdjustment = [1, 0, -1, 0];
    this.possibleNeighborCellAdjustment = [0, 1, 0, -1];
  }

  buildGrid() {
    for (let x = 0; x < this.rows; x++) {
      var nodes = [];
      var row = document.createElement("tr");

      for (let y = 0; y < this.cells; y++) {
        var node = new Node(x, y, this.cells);

        if (x === Math.floor(this.rows / 2) && y === Math.floor(this.cells / 4)) {
          node.isBase = true;
        }
        else if (x === Math.floor(this.rows / 2) && y === Math.floor(this.cells / 4 * 3)) {
          node.isTarget = true;
        }

        nodes.push(node);
        var cell = node.displayNode();
        row.appendChild(cell);
      }
      this.grid.appendChild(row);
      this.graph.push(nodes);
    }
  }

  clear() {
    while(this.grid.hasChildNodes()) {
      this.grid.removeChild(this.grid.firstChild);
      this.graph.length = 0;
    }
  }

  validNeighbor(x, y) {
    return (x >= 0 && x < this.rows && y >= 0 && y < this.cells);
  }

  getNeighbors() {
    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.cells; y++) {
        for (let n = 0; n < this.cellNeighbors; n++) {
          let row = x + this.possibleNeighborRowAdjustment[n];
          let cell = y + this.possibleNeighborCellAdjustment[n];
          if (this.validNeighbor(row, cell)) {
            this.graph[x][y].neighbors.push(this.graph[row][cell]);
          }
        }
      }
    }
  }
}
