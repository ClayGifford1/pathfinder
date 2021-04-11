export default function MinHeap() {
  this.heap = [];
}

const leftChild = (index) => index * 2 + 1;
const rightChild = (index) => index * 2 + 2;
const parent = (index) => Math.floor((index-1) / 2);

MinHeap.prototype.swap = function (indexOne, indexTwo) {
  const temp = this.heap[indexOne];
  this.heap[indexOne] = this.heap[indexTwo];
  this.heap[indexTwo] = temp;
};

MinHeap.prototype.peek = function() {
  return this.heap[0];
};

MinHeap.prototype.insert = function(node) {
  this.heap.push(node);

  let index = this.heap.length - 1;

  while(index != 0 && this.heap[index].distance < this.heap[parent(index)].distance) {
    this.swap(index, parent(index));
    index = parent(index);
  }

  MinHeap.prototype.extractMin = function() {
    const root = this.heap.shift();

    this.heap.unshift(this.heap[this.heap.length-1]);
    this.heap.pop();

    this.heapify(0);

    return root;
  };

  MinHeap.prototype.heapify = function(index) {

    let leftIndex = leftChild(index);
    let rightIndex = rightChild(index);
    let parentIndex = parent(index);
    let reposition = index;

    if (reposition != 0) {
      if (parentIndex >= 0 && this.heap[reposition].distance < this.heap[parentIndex].distance) {
        reposition = parentIndex;
      }
    }
    if (leftIndex < this.heap.length && this.heap[reposition].distance > this.heap[leftIndex].distance) {
      reposition = leftIndex;
    }

    if (rightIndex < this.heap.length && this.heap[reposition].distance > this.heap[rightIndex].distance) {
      reposition = rightIndex;
    }

    if (reposition != index) {
      this.swap(reposition, index);
      this.heapify(reposition);
    }
    //if (reposition === index) {
    //}
  };

  MinHeap.prototype.setDistance = function(index, distance) {
    let heapIndex = 0;

    for (let n = 0; n < this.heap.length; n++) {
      if (this.heap[n].getIndex() === index) {
        this.heap[n].distance = distance;
        heapIndex = n;
      }
    }
    this.heapify(heapIndex);
  };
};
