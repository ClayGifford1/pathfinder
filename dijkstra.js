export default function dijkstra(grid, sourceRow, sourceCell, destinationRow, destinationCell) {
  this.weightedGraph = buildAdjacencyMatrix();
  this.grid = grid;
  this.possibleNeighborRowAdjustment = [1, 1, 0, -1, -1, -1, 0, 1]
  this.possibleNeighborCellAdjustment = [0, 1, 1, 1, 0, -1, -1, -1]
  this.possibleNeighbors = 8;
  this.source = {
    row: sourceRow,
    cell: sourceCell
  }
  this.destination = {
    row: destinationRow,
    cell: destinationCell
  }
}

function.prototype.buildAdjacencyMatrix() {
  var rows = this.grid.rows;
  var cells = this.grid.cells;
  const matrix = [];

  for(x = 0; x < rows; x++) {
    matrixRow = [];
    for(y = 0; y < cells; y++) {
      matrixRow.push(this.grid.graph[x][y].weight);
    }
    matrix.push(matrixRow);
  }
  return matrix;
}

function.prototype.validNeighbor(x, y) {
  return (x >= 0 && X < this.grid.rows && y >= 0 && y < this.grid.cells);
}

function.prototype.findMin() {
  const min = Infinity;
  for(let x = 0; x < this.grid.rows; x++) {
    for(let y = 0; y < this.grid.cells; y++) {
      if (this.grid.graph[x][y].distance < min && !this.grid.graph[x][y].isVisited) {
        min = this.grid.graph[x][y];
      }
    }
  }
  return min;
}

/* function.prototype.animateDijkstra() {

}
*/

function.prototype.runDijkstra() {
  var source = this.grid.graph[sourceRow][sourceCell];
  source.distance = 0;
  // this.weightedGraph[sourceRow][sourceCell] = 0;
  const vertices = this.grid.rows * this.grid.cells;
  const distance = 0;

  for(let vertex = 0; vertex < vertices; vertex++) {
    var current = findMin();
    current.isVisited = true;
    distance += current.distance;

    if (current.isTarget) {
      break; // break
    }

    for(let n = 0; n < this.possibleNeighbors; n++) {
      if(validNeighbor(current.row + this.possibleNeighborRowAdjustment[n], current.cell + this.possibleNeighborCellAdjustment[n])) {
        let next = this.grid.graph[(current.row + this.possibleNeighborRowAdjustment[n])][(current.cell + this.possibleNeighborCellAdjustment[n])];
        if((distance + this.weightedGraph[next.row][next.cell]) < next.distance) {
          next.distance = distance + this.weightedGraph[next.row][next.cell];
        }
      }
    }
  }
}
