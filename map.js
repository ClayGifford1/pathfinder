export default class Map {
  constructor(rows, cells) {
    this.rows = rows;
    this.cells = cells;
    this.graph = [];
    this.cellNeighbors = 8;
    this.possibleNeighborRowAdjustment = [1, 1, 0, -1, -1, -1, 0, 1];
    this.possibleNeighborCellAdjustment = [0, 1, 1, 1, 0, -1, -1, -1];
  }

  clear() {
    this.graph.length = 0;
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
