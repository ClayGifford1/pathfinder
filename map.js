export default class Map {
  constructor(rows, cells) {
    this.rows = rows;
    this.cells = cells;
    this.graph = [];
  }

  clear() {
    this.graph.length = 0;
  }
}
