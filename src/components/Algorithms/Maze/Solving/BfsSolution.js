import {_GetNeighbors} from '../Tools';




export function BfsSolution(board, start, end) {
  let visitedTiles = [];
  let queuedTiles = [];
  let pathTiles = [];
  const currentTile = start;
  const endTile = end;

  queuedTiles.push(currentTile);
  visitedTiles.push(currentTile);

  while (queuedTiles.length > 0) {
    const currentTile = queuedTiles.shift();
    const neighbors = _GetNeighbors(currentTile, board);
    neighbors.forEach(neighbor => {
      if (visitedTiles.indexOf(neighbor) === -1) {
        visitedTiles.push(neighbor);
        queuedTiles.push(neighbor);
        pathTiles.push(neighbor);
      }
      if (neighbor === endTile) {
        return pathTiles;
      }
    });
  }
}