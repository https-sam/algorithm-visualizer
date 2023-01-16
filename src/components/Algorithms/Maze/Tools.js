/*
 * Quick selection test
 */
import {
  FLOOR_TYPE, FLOOR_COLOR, WALL_TYPE, WALL_COLOR,
  getColor, GOAL_TYPE, START_TYPE, SELECTED_COLOR,
  BURN_COLOR, PATH_TYPE, PATH_COLOR, DEFAULT_COLOR,
  DEFAULT_TYPE,
}                   from '../../../Utility/Colors';
import {directions} from './Directions';




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
      // console.log("Board x: " + board[i].x + "\nCelll x: " + x + "\nBoard y: "+ board[i].y + "\nCell y: " + y);

      return board[i];
    }
  }
  return null;
};


export function _GetNeighborsUnvisited(board, cell) {
  let neighbors = [];
  for (let i = 0; i < directions.length; i++) {
    let neighbor = _FindCell(board, cell.x + directions[i].x, cell.y + directions[i].y);
    if (neighbor !== null && neighbor.visited === false && neighbor.type !== WALL_TYPE) {
      neighbors.push(neighbor);
    }
  }
  return neighbors;
}


export function _GetNeighbors(board, x, y) {
  let neighbors = [];
  for (let i = 0; i < 4; i++) {
    let xcoord   = x + directions[i].x;
    let ycoord   = y + directions[i].y;
    let neighbor = _FindCell(board, xcoord, ycoord);
    if (neighbor) {
      if (neighbor.type !== WALL_TYPE) {
        neighbors.push(neighbor);
      }
    }
  }
  return neighbors;
}


export function _GetNeighborsCell(board, cell) {
  let neighbors = [];
  for (let i = 0; i < 4; i++) {
    let xcoord   = cell.x + directions[i].x;
    let ycoord   = cell.y + directions[i].y;
    let neighbor = _FindCell(board, xcoord, ycoord);
    if (neighbor) {
      neighbors.push(neighbor);

    }
  }
  return neighbors;
}


export function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}


export function _BoardReset(board) {
  for (let i = 0; i < board.length; i++) {
    board[i].visited = false;
    board[i].type    = DEFAULT_TYPE;
  }
}


/*
 * Walled board reset with the intent of creating a maze
 * through the use of the recursive backtracking algorithm.
 */
export function _BoardResetWalled(board) {
  for (let i = 0; i < board.length; i++) {
    board[i].visited = false;
    board[i].type    = WALL_TYPE;
  }
}


export function _VisitReset(board) {
  for (let i = 0; i < board.length; i++) {
    board[i].visited = false;
  }
}


export function _SetWalls(board) {
  for (var x = 0; x < board.length; x++) {
    let node = board[x];

    if (!node.visited && node.type !== GOAL_TYPE && node.type !== START_TYPE) {
      node.type = WALL_TYPE;
    }

  }
}