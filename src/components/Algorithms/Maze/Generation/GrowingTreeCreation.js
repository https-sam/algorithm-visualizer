import {directions}                                                                                from '../Directions';
import {_FindCellVisitState, _FindCellTypeState, _FindCell, _BoardReset, _GetNeighbors, _SetWalls} from '../Tools';
import exit                                                                                        from 'exit';
import {PATH_TYPE, DEFAULT_TYPE, FLOOR_TYPE, WALL_TYPE, START_TYPE, GOAL_TYPE}                     from '../../../../Utility/Colors';
import {PriorityQueue}                                                                             from '../../../../Utility/PriorityQueue';




export function GrowingTreeCreation(board, start, end) {
  _BoardReset(board);
  let startCell = null;
  let endCell   = null;
  if (start === undefined || start === null) {
    startCell = board[Math.floor(Math.random() * board.length)];
  }
  if (end === undefined || end === null) {
    endCell = board[Math.floor(Math.random() * board.length)];
  }
  startCell.type = START_TYPE;
  endCell.type   = GOAL_TYPE;
  console.log('Start: ' + startCell.id + ' (' + startCell.x + ' | ' + startCell.y + ')');
  console.log('End: ' + endCell.id + ' (' + endCell.x + ' | ' + endCell.y + ')');


  const visited = new PriorityQueue();
  const queue = new PriorityQueue();

  while (queue.length > 0) {
    const cell = queue.dequeue();
    if (cell.type === GOAL_TYPE) {
      break;
    }
    if (cell.type !== START_TYPE) {
      cell.type = FLOOR_TYPE;
    }
    cell.visited = true;
    visited.enqueue(cell);


    const neighbors = _GetNeighbors(board, cell);
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if (visited.has(neighbor) === false) {
        // neighbor.type = FLOOR_TYPE;
        queue.enqueue(neighbor);
      }
    }
  }

  _SetWalls(board);

}