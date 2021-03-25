function minHeap() {
  this.heap = [];
}

const leftChild = (index) => index * 2 + 1;
const rightChild = (index) => index * 2 + 2;
const parent = (index) => Math.floor((index-1) / 2);

maxHeap.prototype.swap = function (indexOne, indexTwo) {
  const temp = this.heap[indexOne];
  this.heap[indexOne] = this.heap[indexTwo];
  this.heap[indexTwo] = temp;
}

minHeap.prototype.peek = function() {
  return this.heap[0];
}

minHeap.prototype.insert = function(element) {
  this.heap.push(element);

  let index = this.heap.length - 1;

  while(index != 0 && this.heap[index] < this.heap[parent(index)]) {
    this.swap(index, parent(index));
    index = parent(index);
  }
}
