import {directions}                                                                                                                      from '../Directions';
import {_FindCellVisitState, _FindCellTypeState, _FindCell, _BoardReset, _GetNeighbors, _SetWalls, _GetNeighborsCell, _BoardResetWalled} from '../Tools';
import exit                                                                                                                              from 'exit';
import {PATH_TYPE, DEFAULT_TYPE, FLOOR_TYPE, WALL_TYPE, START_TYPE, GOAL_TYPE}                                        from '../../../../Utility/Colors';
import {PriorityQueue}                                                                                                from '../../../../Utility/PriorityQueue.js';




export function RecursiveBacktrackCreation(board, start, end) {
  _BoardResetWalled(board);
  var startCell = start;
  var endCell   = end;
  if (start === undefined || start === null) {startCell = board[Math.floor(Math.random() * board.length)];}
  if (end === undefined || end === null) {endCell = board[Math.floor(Math.random() * board.length)];}
  startCell.type = START_TYPE;
  startCell.visited = true;
  endCell.type   = GOAL_TYPE;
  console.log('Start: ' + startCell.id + ' (' + startCell.x + ' | ' + startCell.y + ')');
  console.log('End: ' + endCell.id + ' (' + endCell.x + ' | ' + endCell.y + ')');


  carvePath(board, startCell, false);

  _SetWalls(board);


}


function carvePath(board, cell, found) {
  if (found) {
    return;
  }
  const neighbors = _GetNeighborsCell(board, cell);
  if (neighbors.length === 0) {
    console.log('No neighbors found for cell: ' + cell.id + ' (' + cell.x + ' | ' + cell.y + ')');
    return;
  }
  for (let i = 0; i < neighbors.length; i++) {
    const neighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
    if (!neighbor.visited) {
      if (neighbor.type === GOAL_TYPE || found) {
        found = true;
        return;
      }
      neighbor.visited = true;
      neighbor.type    = FLOOR_TYPE;
      return carvePath(board, neighbor, found);
    }
  }
}