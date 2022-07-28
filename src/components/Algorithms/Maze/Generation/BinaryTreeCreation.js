import {directions}                                                                                             from '../Directions';
import {_FindCellVisitState, _FindCellTypeState, _FindCell, _BoardReset, _GetNeighbors, _SetWalls, _VisitReset} from '../Tools';
import exit                                                                                                     from 'exit';
import {PATH_TYPE, DEFAULT_TYPE, FLOOR_TYPE, WALL_TYPE, START_TYPE, GOAL_TYPE}          from '../../../../Utility/Colors';




export function BinaryTreeCreation(board, start, end) {
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
  console.log('Start: ' + startCell.id + " (" + startCell.x + ' | ' + startCell.y + ')');
  console.log('End: ' + endCell.id + " (" + endCell.x + ' | ' + endCell.y + ')');

  const numPoints = board.length;
  for (var i = 0; i < numPoints; i++) {
    if (board[i] === startCell || board[i] === endCell) {
      continue;
    }
    let node      = board[i];
    // Needed to be percise to avoid floating point errors....
    let direction = Math.floor(Math.random() * 4);
    let xcord = node.x + directions[direction].x;
    let ycord = node.y + directions[direction].y;
    const cell = _FindCell(board, xcord, ycord);

    if (cell) {
      if (!cell.visited && cell.type !== START_TYPE && cell.type !== GOAL_TYPE) {
        // console.log(cell);
        cell.visited = true;
        cell.type    = FLOOR_TYPE;
      }
    }
  }

  _SetWalls(board);
  _VisitReset(board);
}

