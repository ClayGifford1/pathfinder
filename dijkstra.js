import minHeap from "./minHeap.js";

export default function Dijkstra(grid) {

  this.nextUp = new minHeap();
  this.reachedTarget = false;
  this.target = null;
  this.nodePath = [];

  Dijkstra.prototype.runDijkstra = function() {

    for (let x = 0; x < grid.rows; x++) {
      for (let y = 0; y < grid.cells; y++) {
        if (grid.graph[x][y].isBase) {
          grid.graph[x][y].distance = 0;
          //this.nextUp.insert(grid.graph[x][y]);
        }
        this.nextUp.insert(grid.graph[x][y]);
      }
    }

    console.log(`${grid.rows}-${grid.cells}`);

    while(!this.reachedTarget && this.nextUp.heap.length != 0) {
      let current = this.nextUp.extractMin();
      this.nodePath.push(current);
      //this.animatePath(current, "searched");
      //setTimeout(() => {document.getElementById(`r${current.row}c${current.cell}`).className = "searched";}, 1000);
      console.log(`${current.row}-${current.cell}`);

      if (current.isTarget) {
        this.reachedTarget = true;
        this.target = current;
        // let previous = current.previousNode;
        //document.getElementById(`r${previous.row}c${previous.cell}`).className = "path";
        break;
      }

      if (current.neighbors.length != 0) {
        for (let n = 0; n < current.neighbors.length; n++) {
          let temp = current.distance + current.neighbors[n].weight;
          if (temp < current.neighbors[n].distance) {
            current.neighbors[n].distance = temp;
            current.neighbors[n].previousNode = current;
            //this.nextUp.insert(current.neighbors[n]);
            this.nextUp.setDistance(current.neighbors[n].getIndex(), current.neighbors[n].distance);
          }
        }
      }
    }

    let nodes = this.nodePath.length;
    this.animatePath("searched", nodes);

    /*
    for (let node = 0; node < this.nodePath.length; node++) {
      this.animatePath(this.nodePath[node], "searched");
    }
    */
  };

  Dijkstra.prototype.animatePath = function(htmlClass, iterations) {

    if (iterations === 1) {
      let targetNode = this.target;

      while(targetNode.previousNode != null) {
        let cell = document.getElementById(targetNode.id);
        if(!targetNode.isTarget) {
          cell.className = "path";
        }
        targetNode = targetNode.previousNode;
      }
    }

    if (iterations < 1) return;

    // let pathArray = this.nodePath;

    setTimeout(function(obj) {
      let node = obj.nodePath.shift();
      // let node = pathArray.shift();

      if (!node.isBase && !node.isTarget) {
        let cell = document.getElementById(node.id);
        cell.className = htmlClass;
      }

      obj.animatePath(htmlClass, --iterations);

    }, 10, this);
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
