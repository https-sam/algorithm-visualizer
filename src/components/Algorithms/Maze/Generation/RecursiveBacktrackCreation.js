import {directions}                                                                                                                      from '../Directions';
import {_FindCellVisitState, _FindCellTypeState, _FindCell, _BoardReset, _GetNeighbors, _SetWalls, _GetNeighborsCell, _BoardResetWalled} from '../Tools';
import exit                                                                                                                              from 'exit';
import {PATH_TYPE, DEFAULT_TYPE, FLOOR_TYPE, WALL_TYPE, START_TYPE, GOAL_TYPE}                                                           from '../../../../Utility/Colors';
import {PriorityQueue}                                                                                                                   from '../../../../Utility/PriorityQueue.js';




export function RecursiveBacktrackCreation(board, start, end) {
  _BoardResetWalled(board);
  var startCell = start;
  var endCell   = end;
  if (start === undefined || start === null) {startCell = board[Math.floor(Math.random() * board.length)];}
  if (end === undefined || end === null) {endCell = board[Math.floor(Math.random() * board.length)];}
  startCell.type = START_TYPE;
  endCell.type   = GOAL_TYPE;
  console.log('Start: ' + startCell.id + ' (' + startCell.x + ' | ' + startCell.y + ')');
  console.log('End: ' + endCell.id + ' (' + endCell.x + ' | ' + endCell.y + ')');

  startCell.visited = true;
  var found = false;
  carvePath(board, startCell, found);

  // _SetWalls(board);


}


function carvePath(board, cell, found) {
  const neighbors = _GetNeighborsCell(board, cell);
  if (neighbors.length === 0) {
    console.log('No neighbors found for cell: ' + cell.id + ' (' + cell.x + ' | ' + cell.y + ')');
    return;
  }
 shuffle( neighbors);
  for (let i = 0; i < neighbors.length; i++) {
    const neighbor = neighbors[i];
    if (!neighbor.visited) {
      if (neighbor.type === GOAL_TYPE || found) {
        console.log('Found goal');
        found = true;
        return found;
      }
      neighbor.visited = true;
      neighbor.type    = FLOOR_TYPE;
      found            = carvePath(board, neighbor, found);
      if (found) {
        return found;
      }
    }
  }
}


function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
