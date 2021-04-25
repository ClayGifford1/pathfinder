export default function eucledian(node, grid) {

  let x = grid.targetNode.cell - node.cell;
  let y = grid.targetNode.row - node.row;

  let distance = Math.sqrt((x * x) + (y * y));

  return distance;
}
