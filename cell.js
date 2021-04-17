export default class Node {
  constructor(row, cell, cells) {
    this.row = row;
    this.cell = cell;
    this.cells = cells;
    this.previousNode = null;
    this.distance = Infinity;
    this.weight = 1;
    this.isBase = false;
    this.isTarget = false;
    this.isObstacle = false;
    this.isVisited = false;
    this.neighbors = [];
    this.id = `r${row}c${cell}`;
  }

  displayNode() {
    const newNode = document.createElement("td");

    if (this.isBase) {
      newNode.className = "base";
    }
    else if (this.isTarget) {
      newNode.className = "target";
    }
    else {
      newNode.className = "cell";
    }
    newNode.id = this.id;

    const text = document.createTextNode("");
    newNode.appendChild(text);

    newNode.addEventListener("mousedown", function() {newNode.className = "pressed";});

    return newNode;
  }

  getIndex() {
    return ((this.row * this.cells) + this.cell + 1);
  }
}
