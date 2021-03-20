export default class Node {
  constructor(row, cell) {
    this.row = row;
    this.cell = cell;
    this.isBase = false;
    this.isTarget = false;
    this.isObstacle = false;
    this.isVisited = false;
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
    newNode.id = `r${this.row}c${this.cell}`;

    const text = document.createTextNode("");
    newNode.appendChild(text);

    return newNode;
  }
}
