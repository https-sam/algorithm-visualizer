import {directions}                                         from '../Directions';
import {_FindCellVisitState, _FindCellTypeState, _FindCell} from '../Tools';
// import exit                                                 from 'exit';


/*
 * Recursive backtracking algorithm to solve a solvable maze.
 */
export function RecursiveSolve(board, start, end, position) {
  let copyBoard = board;
  let current = start;
  let path    = [];
  while (current !== end) {
    path.push(current);
    current = board[current.parent];
  }


}