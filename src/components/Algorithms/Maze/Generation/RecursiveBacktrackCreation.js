import {directions}                                                                                from '../Directions';
import {_FindCellVisitState, _FindCellTypeState, _FindCell, _BoardReset, _GetNeighbors, _SetWalls} from '../Tools';
import exit                                                                                        from 'exit';
import {PATH_TYPE, DEFAULT_TYPE, FLOOR_TYPE, WALL_TYPE, START_TYPE, GOAL_TYPE}                     from '../../../../Utility/Colors';
import {PriorityQueue}                                                                             from '../../../../Utility/PriorityQueue.js';




export function RecursiveBacktrackCreation(board, start, end) {
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

  const stack       = new PriorityQueue();
  startCell.visited = true;
  stack.enqueue(startCell);
  while (stack.length > 0) {
    let currentCell = stack.dequeue();
    if (currentCell.type === GOAL_TYPE) {
      stack.clear();
      break;
    }
    if (currentCell.type !== START_TYPE) {
      currentCell.type = FLOOR_TYPE;
    }
    currentCell.visited = true;
    let neighbors       = _GetNeighbors(board, currentCell);
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      if (neighbor.visited === false) {
        stack.enqueue(neighbor);
      }
    }
  }

  _SetWalls(board);


}

