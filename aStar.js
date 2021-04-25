import minHeap from "./minHeap.js";
import manhattan from "./manhattan.js";

export default function Astar(grid) {

  this.nextUp = new minHeap();
  this.nodePath = [];
  this.target = null;
  this.reachedTarget = false;

  Astar.prototype.runAstar = function() {

    for (let x = 0; x < grid.rows; x++) {
      for (let y = 0; y < grid.cells; y++) {
        if (grid.graph[x][y].isBase) {
          grid.graph[x][y].distance = 0;
          this.nextUp.insert(grid.graph[x][y]);
        }
        //this.nextUp.insert(grid.graph[x][y]);
      }
    }

    while(this.nextUp.heap.length != 0 && !this.reachedTarget) {
      let current = this.nextUp.extractMin();
      this.nodePath.push(current);

      if (current.isTarget) {
        this.reachedTarget = true;
        this.target = current;
        break;
      }

      if (current.neighbors.length != 0) {
        for (let n = 0; n < current.neighbors.length; n++) {
          let temp = current.distance + current.neighbors[n].weight + manhattan(current.neighbors[n], grid);
          if (temp < current.neighbors[n].distance) {
            current.neighbors[n].distance = temp;
            current.neighbors[n].previousNode = current;
            this.nextUp.insert(current.neighbors[n]);
            this.nextUp.setDistance(current.neighbors[n].getIndex(), current.neighbors[n].distance);
          }
        }
      }
    }

    let nodes = this.nodePath.length;
    this.animatePath("searched", nodes);
  };

  Astar.prototype.animatePath = function(htmlClass, iterations) {

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

    }, 5, this);
  };
}
