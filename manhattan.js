export default function manhattan(node, grid) {

  let x = Math.abs(grid.targetNode.cell - node.cell);
  let y = Math.abs(grid.targetNode.row - node.row);
  
  let distance = x + y;

  return distance;
}
