import {MinHeap, Node, leftChild, rightChild, parent} from "./minHeap.js";

class HtmlGrid {

  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.id = "grid";
    this.element = document.createElement("table");
    this.grid = [];

    this.build();
  }

  build() {

    this.element.id = this.id;

    for (let i = 0; i < this.rows; i++) {
      var cells = [];
      var row = document.createElement("tr");

      for (let j = 0; j < this.cols; j++) {
        var cell = new Cell(i, j);
        cells.push(cell);
        row.appendChild(cell.element);
      }

      this.element.appendChild(row);
      this.grid.push(cells);
    }
  }

  restore() {

    while(this.element.hasChildNodes()) {
      this.element.removeChild(this.element.firstChild);
    }

    this.grid.length = 0;
    this.build();
  }
}

class Grid extends HtmlGrid {
  constructor(rows, cols) {
    super(rows, cols);

    this.baseNodeCoordinates = {
      row: Math.floor(this.rows / 2),
      cell: Math.floor(this.cols / 4)
    };

    this.targetNodeCoordinates = {
      row: Math.floor(this.rows / 2),
      cell: Math.floor(this.cols / 4 * 3)
    };

    this.mouseStatus = false;
    this.baseMoving = false;
    this.targetMoving = false;

    this.initializeNodes();
  }

  reset() {
    alert("being reset");
    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.cols; y++) {
        this.grid[x][y].revokeStatus();
        this.grid[x][y].resetValues();
      }
    }

    this.initializeNodes();
  }

  handleMouseDown(row, cell) {
    this.mouseStatus = true;

    if(this.grid[row][cell].isBase) {
      this.baseMoving = true;
    }
    if(this.grid[row][cell].isTarget) {
      this.targetMoving = true;
    }
  }

  handleMouseUp(row, cell) {
    this.mouseStatus = false;

    if(this.baseMoving) {
      this.baseMoving = false;
    }

    if(this.targetMoving) {
      this.targetMoving = false;
    }
  }

  handleMouseEnter(row, cell) {
    if(this.mouseStatus && this.baseMoving && !this.grid[row][cell].isTarget) {
      this.setBaseNode(row, cell);
    }

    if(this.mouseStatus && this.targetMoving && !this.grid[row][cell].isBase) {
      this.setTargetNode(row, cell);
    }
  }

  handleMouseLeave(row, cell) {
    return;
  }

  initializeNodes() {
    this.baseNodeCoordinates.row = Math.floor(this.rows / 2);
    this.baseNodeCoordinates.cell = Math.floor(this.cols / 4);
    this.targetNodeCoordinates.row = Math.floor(this.rows / 2);
    this.targetNodeCoordinates.cell = Math.floor(this.cols / 4 * 3);
    this.grid[this.baseNodeCoordinates.row][this.baseNodeCoordinates.cell].setAsBase();
    this.grid[this.targetNodeCoordinates.row][this.targetNodeCoordinates.cell].setAsTarget();
  }

  setBaseNode(row, cell) {
    this.grid[this.baseNodeCoordinates.row][this.baseNodeCoordinates.cell].revokeStatus();

    this.baseNodeCoordinates.row = row;
    this.baseNodeCoordinates.cell = cell;
    this.grid[this.baseNodeCoordinates.row][this.baseNodeCoordinates.cell].setAsBase();
  }

  setTargetNode(row, cell) {
    this.grid[this.targetNodeCoordinates.row][this.targetNodeCoordinates.cell].revokeStatus();

    this.targetNodeCoordinates.row = row;
    this.targetNodeCoordinates.cell = cell;
    this.grid[this.targetNodeCoordinates.row][this.targetNodeCoordinates.cell].setAsTarget();
  }

  validateNeighbor(row, cell) {
    return (row >= 0 && row < this.rows && cell >= 0 && cell < this.cols);
  }

  getNeighbors(row, cell) {
    let neighbors = [];
    let possibleNeighbors = 4;
    let possibleNeighborRowAdjustment = [-1, 0, 1, 0];
    let possibleNeighborCellAdjustment = [0, 1, 0, -1];

    for (let n = 0; n < possibleNeighbors; n++) {
      let neighborRow = row + possibleNeighborRowAdjustment[n];
      let neighborCell = cell + possibleNeighborCellAdjustment[n];
      if(this.validateNeighbor(neighborRow, neighborCell)) {
        neighbors.push(this.grid[neighborRow][neighborCell]);
      }
    }

    return neighbors;

  }

  getEucledianDistance(row1, cell1, row2, cell2) {
    let row = Math.abs(row2 - row1);
    let cell = Math.abs(cell2 - cell1);

    let distance = Math.sqrt( (row * row) + (cell * cell) );

    return distance;
  }

  getManhattanDistance(row1, cell1, row2, cell2) {
    let row = Math.abs(row2 - row1);
    let cell = Math.abs(cell2 - cell1);

    return row + cell;
  }

  getAStarHueristic(node) {
    let combined = node.distanceToTarget + node.pathCost;

    return combined;
  }

  getAStarPathCost(node1, node2) {
    let cost = node1.pathCost + (node2.units * node2.weight);
    return cost;
  }

  runDijkstraSearch() {
    let source = this.grid[this.baseNodeCoordinates.row][this.baseNodeCoordinates.cell];
    source.setSearchCost(0);
    source.markAsVisited();

    // let reachedTarget = false;

    let heap = new MinHeap();
    heap.insert(source, source.searchCost);

    let nodesToAnimate = [];

    while(heap.heap.length != 0) {
      let current = heap.extractMin();
      nodesToAnimate.push(current);

      if (current.isTarget) {
        break;
      }

      let neighbors = this.getNeighbors(current.row, current.cell);

      for (let n = 0; n < neighbors.length; n++) {

        if(!neighbors[n].isVisited) {

          neighbors[n].markAsVisited();

          let temp = (neighbors[n].weight * neighbors[n].units) + current.searchCost;

          if (temp < neighbors[n].searchCost) {
            neighbors[n].setSearchCost(temp);
            neighbors[n].setPreviousNode(current);
            heap.insert(neighbors[n], neighbors[n].searchCost);
          }
        }
      }
    }

    this.visualizeSearch(nodesToAnimate);
  }

  runAstarSearch() {
    let source = this.grid[this.baseNodeCoordinates.row][this.baseNodeCoordinates.cell];
    let target = this.grid[this.targetNodeCoordinates.row][this.targetNodeCoordinates.cell];

    source.setPathCost(0);
    let distance = this.getManhattanDistance(source.row, source.cell, target.row, target.cell);
    source.setDistanceToTarget(distance);
    let sourceHueristic = this.getAStarHueristic(source);
    source.setSearchScore(sourceHueristic);

    let heap = new MinHeap();
    heap.insert(source, source.searchScore);
    source.inSearchSet = true;

    let nodesToAnimate = [];

    while (heap.heap.length != 0) {
      let current = heap.extractMin();
      current.inSearchSet = false;

      nodesToAnimate.push(current);

      if (current.isTarget) {
        break;
      }

      let neighbors = this.getNeighbors(current.row, current.cell);

      for (let n = 0; n < neighbors.length; n++) {

        if(!neighbors[n].isVisited) {

          neighbors[n].markAsVisited();

          let distance = this.getManhattanDistance(neighbors[n].row, neighbors[n].cell, target.row, target.cell);
          neighbors[n].setDistanceToTarget(distance);

        }

        let temp = this.getAStarPathCost(current, neighbors[n]);

        if (temp < neighbors[n].pathCost) {

          neighbors[n].setPreviousNode(current);
          neighbors[n].setPathCost(temp);

          let hueristic = this.getAStarHueristic(neighbors[n]);
          neighbors[n].setSearchScore(hueristic);

          if(!neighbors[n].inSearchSet) {

            heap.insert(neighbors[n], neighbors[n].searchScore);
            neighbors[n].inSearchSet = true;
          }
        }

      }
    }

    this.visualizeSearch(nodesToAnimate);
  }

  animatePath(target) {
    let current = target;

    while (current.previousNode !== null) {
      let node = current.previousNode;
      if (!node.isBase) {
        node.setAsPath();
      }
      current = node;
    }
  }

  animateSearch(node) {
    if (!node.isBase) {
      node.setAsSearched();
    }
  }

  visualizeSearch(nodes) {
    let nodesRemaining = nodes.length;

    if (nodesRemaining === 1) {

      let target = nodes.shift();
      this.animatePath(target);

    }

    else if (nodesRemaining > 1) {
      let node = nodes.shift();

      this.animateSearch(node);

      setTimeout(this.visualizeSearch.bind(this), 10, nodes);
    }

    else {
      return;
    }
  }

  getNodeIndex(row, cell) {
    return (row * this.cols + cell + 1);
  }
}

class HtmlCell {

  constructor(row, cell) {
    this.row = row;
    this.cell = cell;
    this.coordinates = `(${row}, ${cell})`;
    this.type = "cell";
    this.element = document.createElement("td");

    this.display();
  }

  display() {

    this.element.id = this.coordinates;
    this.element.className = this.type;

    const filler = document.createTextNode("");
    this.element.appendChild(filler);
  }

  refreshHtmlClass() {
    this.element.className = this.type;
  }
}

class Cell extends HtmlCell {
  constructor(row, cell) {
    super(row, cell);

    this.previousNode = null;
    this.units = 1;
    this.weight = 1;
    this.searchCost = Infinity;
    this.pathCost = Infinity;
    this.distanceToTarget = Infinity;
    this.searchScore = null;
    this.inSearchSet = false;
    this.isBase = false;
    this.isTarget = false;
    this.isObstacle = false;
    this.isVisited = false;
  }

  setPreviousNode(node) {
    this.previousNode = node;
  }

  setUnits(units) {
    this.units = units;
  }

  setWeight(weight) {
    this.weight = weight;
  }

  setDistanceToTarget(distance) {
    this.distanceToTarget = distance;
  }

  setPathCost(cost) {
    this.pathCost = cost;
  }

  setSearchCost(cost) {
    this.searchCost = cost;
  }

  setSearchScore(score) {
    this.searchScore = score;
  }

  markAsVisited() {
    this.isVisited = true;
  }

  setAsBase() {
    this.isBase = true;
    this.type = "base";
    this.refreshHtmlClass();

    this.isTarget = false;
    this.isObject = false;
  }

  setAsTarget() {
    this.isTarget = true;
    this.type = "target";
    this.refreshHtmlClass();

    this.isBase = false;
    this.isObject = false;
  }

  setAsObject() {
    this.isObject = true;
    this.type = "object";
    this.refreshHtmlClass();

    this.isBase = false;
    this.isTarget = false;
  }

  setAsPath() {
    this.type = "path";
    this.refreshHtmlClass();

    this.isBase = false;
    this.isTarget = false;
    this.isObject = false;
  }

  setAsSearched() {
    this.type = "searched";
    this.refreshHtmlClass();

    this.isBase = false;
    this.isTarget = false;
    this.isObject = false;
  }

  revokeStatus() {
    this.type = "cell";
    this.refreshHtmlClass();
    this.isBase = false;
    this.isTarget = false;
    this.isObject = false;

  }

  resetValues() {
    this.previousNode = null;
    this.units = 1;
    this.weight = 1;
    this.searchCost = Infinity;
    this.pathCost = Infinity;
    this.distanceToTarget = Infinity;
    this.searchScore = null;
    this.inSearchSet = false;
  }
}

export { HtmlGrid, Grid, HtmlCell, Cell };
