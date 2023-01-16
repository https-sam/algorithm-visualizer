import {directions}                                                                                from '../Directions';
import {_FindCellVisitState, _FindCellTypeState, _FindCell, _BoardReset, _GetNeighbors, _SetWalls} from '../Tools';
// import exit                                                                             from 'exit';
import {PATH_TYPE, DEFAULT_TYPE, FLOOR_TYPE, WALL_TYPE, START_TYPE, GOAL_TYPE}                     from '../../../../Utility/Colors';




export function BfsCreation(board, start, end) {
  _BoardReset(board);
  const startCell = start || board[Math.floor(Math.random() * board.length)];
  let endCell     = end || board[Math.floor(Math.random() * board.length)];
  startCell.type  = START_TYPE;
  endCell.type    = GOAL_TYPE;
  console.log('Start: ' + startCell.id + ' (' + startCell.x + ' | ' + startCell.y + ')');
  console.log('End: ' + endCell.id + ' (' + endCell.x + ' | ' + endCell.y + ')');

  let queue   = [];
  let visited = [];
  let path    = [];
  let current = startCell;

  queue.push(current);
  visited.push(current);
  while (queue.length > 0) {
    current = queue.shift();
    console.log('Current: ' + current.id + ' (' + current.x + ' | ' + current.y + ')');
    if (current === endCell) {
      break;
    }
    if (current.type !== START_TYPE) {
      current.type = FLOOR_TYPE;
    }
    current.visited = true;
    let neighbors   = _GetNeighbors(board, current);
    console.log('Neighbors: ' + neighbors.length);
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      if (!neighbor.visited) {
        neighbor.parent = current;
        visited.push(neighbor);
        queue.push(neighbor);
      }
    }
  }

  _SetWalls(board);


}
