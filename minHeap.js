class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  swap(indexOne, indexTwo) {
    const temp = this.heap[indexOne];
    this.heap[indexOne] = this.heap[indexTwo];
    this.heap[indexTwo] = temp;
  }

  peek() {
    return this.heap[0].key;
  }

  insert(key, value) {
    let node = new Node(key, value);

    this.heap.push(node);

    let index = this.heap.length - 1;

    while (index != 0 && this.heap[index].value <= this.heap[parent(index)].value) {
      this.swap(index, parent(index));
      index = parent(index);
    }
  }

  extractMin() {
    const root = this.heap.shift();

    this.heap.unshift(this.heap[this.heap.length - 1]);
    this.heap.pop();

    this.heapify(0);

    return root.key;
  }

  heapify(index) {

    let leftIndex = leftChild(index);
    let rightIndex = rightChild(index);
    let parentIndex = parent(index);
    let reposition = index;

    if (reposition != 0) {
      if (parentIndex >= 0 && this.heap[reposition].value < this.heap[parentIndex].value) {
        reposition = parentIndex;
      }
    }
    if (leftIndex < this.heap.length && this.heap[reposition].value > this.heap[leftIndex].value) {
      reposition = leftIndex;
    }

    if (rightIndex < this.heap.length && this.heap[reposition].value > this.heap[rightIndex].value) {
      reposition = rightIndex;
    }

    if (reposition != index) {
      this.swap(reposition, index);
      this.heapify(reposition);
    }
  }
}

const leftChild = (index) => index * 2 + 1;
const rightChild = (index) => index * 2 + 2;
const parent = (index) => Math.floor((index - 1) / 2);






export {MinHeap, Node, leftChild, rightChild, parent};
