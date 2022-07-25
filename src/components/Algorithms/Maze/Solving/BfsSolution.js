import {_GetNeighbors} from '../Tools';




export default function BfsSolution(grid) {
  const visited = new Set();
  const queue = [];
  const result = [];
  const start = grid[0][0];
  queue.push(start);
  visited.add(start);
  while (queue.length) {
    const current = queue.shift();
    result.push(current);
    const neighbors = _GetNeighbors(grid, current);
    neighbors.forEach(neighbor => {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
        visited.add(neighbor);
      }
    });
  }
  return result;
}