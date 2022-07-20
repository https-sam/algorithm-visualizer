/*
 * Quick selection test
 */
import {DEFAULT_TYPE} from '../../BoardCanvas/Cells';
import {directions}   from './Directions';




export const _FindCellVisitState = (board, x, y) => {
  for (let i = 0; i < board.length; i++) {
    if (Math.floor(board[i].x) === Math.floor(x) && Math.floor(board[i].y) === Math.floor(y)) {
      return board[i].visited;
    }
  }
};


export const _FindCellTypeState = (board, x, y) => {
  for (let i = 0; i < board.length; i++) {
    if (Math.floor(board[i].x) === Math.floor(x) && Math.floor(board[i].y) === Math.floor(y)) {
      return board[i].visited;
    }
  }
};


export function _FindCell(board, x, y) {
  for (let i = 0; i < board.length; i++) {
    // console.log(board[i].x, x, board[i].y, y);

    if (board[i].x === x && board[i].y === y) {
      console.log("Board x: " + board[i].x + "\nCelll x: " + x + "\nBoard y: "+ board[i].y + "\nCell y: " + y);

      return board[i];
    }
  }
  return null;
};


export function _GetNeighbors(board, x, y) {
  let neighbors = [];
  for (let i = 0; i < 4; i++) {
    let xcoord = x + directions[i].x;
    let ycoord = y + directions[i].y;
    let neighbor = _FindCell(board, xcoord, ycoord);
    if (neighbor) {
      neighbors.push(neighbor);
    }
  }
  return neighbors;
}


export function _BoardReset(board) {
  for (let i = 0; i < board.length; i++) {
    board[i].visited = false;
    board[i].type = DEFAULT_TYPE;
  }
}

export function _VisitReset(board) {
  for (let i = 0; i < board.length; i++) {
    board[i].visited = false;
  }
}
