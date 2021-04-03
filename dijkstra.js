import minHeap from "./minHeap.js";

export default function Dijkstra(grid) {

  this.nextUp = new minHeap();
  this.reachedTarget = false;
  this.target = null;

  Dijkstra.prototype.runDijkstra = function() {

    for (let x = 0; x < grid.rows; x++) {
      for (let y = 0; y < grid.cells; y++) {
        if (grid.graph[x][y].isBase) {
          grid.graph[x][y].distance = 0;
        }
        this.nextUp.insert(grid.graph[x][y]);
      }
    }
    //console.log(this.nextUp.heap.length);
    console.log(`${grid.rows}-${grid.cells}`);

    // let nodes = 0;
    while(!this.reachedTarget && this.nextUp.heap.length != 0) {
      let current = this.nextUp.extractMin();
      current.className = "searched";
      console.log(`${current.row}-${current.cell}`);
      //console.log(current.getIndex());

      //console.log(current.neighbors[0].getIndex());

      if (current.isTarget) {
        this.reachedTarget = true;
        this.target = current;
        let previous = current.previousNode;
        console.log(`${previous.row}-${previous.cell}`);
        console.log(`${previous.previousNode.row}-${previous.previousNode.cell}`);
        break;
      }

      if (current.neighbors.length != 0) {
        for (let n = 0; n < current.neighbors.length; n++) {
          // if (nodes < 2) {console.log(current.neighbors[n].getIndex() + "neighbor index");}
          let temp = current.distance + current.neighbors[n].weight;
          if (temp < current.neighbors[n].distance) {
            current.neighbors[n].distance = temp;
            current.neighbors[n].previousNode = current;
            this.nextUp.setDistance(current.neighbors[n].getIndex(), current.neighbors[n].distance);
          }
        }
      }
      // nodes++;
    }
  };
/*
  Dijkstra.prototype.printPath = function() {
    let foundPath = false;
    console.log(`${this.target.row}-${this.target.cell}`);
    while(!foundPath) {
      let next = this.target.previousNode;
      console.log(`${next.row}-${next.cell}`);
      if (next.isBase) {
        foundPath = true;
      }
    }
  };
  */
}

/* export default function Dijkstra(adjMatrix, source, destination) {
  const sourceRow = source[0];
  const sourceCell = source[1];
  const destinationRow = destination[0];
  const destinationCell = destination[1];
  const sourceNode = adjMatrix[sourceRow][sourceCell];
  const destinationNode = adjMatrix[destinationRow][destinationCell];
  let distance = 0;
  const vertices = adjMatrix.length() * adjMatrix[0].length();
  for (let v = 0; v < vertices; v++) {
    let current = findMin();

    if (current = )
  }
}

/* export default function Dijkstra(grid, sourceRow, sourceCell, destinationRow, destinationCell) {
  this.weightedGraph = this.buildAdjacencyMatrix();
  this.grid = grid;
  this.possibleNeighborRowAdjustment = [1, 1, 0, -1, -1, -1, 0, 1];
  this.possibleNeighborCellAdjustment = [0, 1, 1, 1, 0, -1, -1, -1];
  this.possibleNeighbors = 8;
  this.source = {
    row: sourceRow,
    cell: sourceCell
  };
  this.destination = {
    row: destinationRow,
    cell: destinationCell
  };
}

Dijkstra.prototype.buildAdjacencyMatrix = function() {
  const rows = this.grid.rows;
  const cells = this.grid.cells;
  const matrix = [];

  for(let x = 0; x < rows; x++) {
    let matrixRow = [];
    for(let y = 0; y < cells; y++) {
      matrixRow.push(this.grid.graph[x][y].weight);
    }
    matrix.push(matrixRow);
  }
  return matrix;
};

Dijkstra.prototype.validNeighbor = function(x, y) {
  return (x >= 0 && x < this.grid.rows && y >= 0 && y < this.grid.cells);
};

Dijkstra.prototype.findMin = function() {
  let min = Infinity;
  for(let x = 0; x < this.grid.rows; x++) {
    for(let y = 0; y < this.grid.cells; y++) {
      if (this.grid.graph[x][y].distance < min && !this.grid.graph[x][y].isVisited) {
        min = this.grid.graph[x][y];
      }
    }
  }
  return min;
};

/* function.prototype.animateDijkstra() {

}
*/
/*
Dijkstra.prototype.runDijkstra = function() {
  var source = this.grid.graph[this.source[0]][this.source[1]];
  source.distance = 0;
  // this.weightedGraph[sourceRow][sourceCell] = 0;
  const vertices = this.grid.rows * this.grid.cells;
  var distance = 0;

  for(let vertex = 0; vertex < vertices; vertex++) {
    var current = this.findMin();
    console.log(`${current.row}-${current.cell}`);
    current.isVisited = true;
    distance += current.distance;

    if (current.isTarget) {
      break; // break
    }

    for(let n = 0; n < this.possibleNeighbors; n++) {
      if(this.validNeighbor(current.row + this.possibleNeighborRowAdjustment[n], current.cell + this.possibleNeighborCellAdjustment[n])) {
        let next = this.grid.graph[(current.row + this.possibleNeighborRowAdjustment[n])][(current.cell + this.possibleNeighborCellAdjustment[n])];
        if((distance + this.weightedGraph[next.row][next.cell]) < next.distance) {
          next.distance = distance + this.weightedGraph[next.row][next.cell];
        }
      }
    }
  }
};
*/
