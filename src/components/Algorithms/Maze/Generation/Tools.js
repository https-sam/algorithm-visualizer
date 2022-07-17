/*
 * Quick selection test
 */
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
    console.log(Math.floor(board[i].x), Math.floor(x));

    if (Math.floor(board[i].x) === Math.floor(x) && Math.floor(board[i].y) === Math.floor(y)) {
      return board[i];
    }
  }
};

