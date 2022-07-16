import {directions}                                         from './Directions';
import {_FindCellVisitState, _FindCellTypeState, _FindCell} from './Tools';




export default function BinaryTreeCreation(board) {
  for (var i = 0; i < board.length; i++) {
    let direction = Math.floor(Math.random() * 4);
    // console.log(board[i]);

    // console.log(direction);
    // console.log(directions[direction].x);
    // console.log(board[i].x + directions[direction].x);
    let xcord  = board[i].x + directions[direction].x;
    let ycord  = board[i].y + directions[direction].y;
    const cell = board.find(item => Math.floor(item.x) === Math.floor(xcord) && Math.floor(item.y) === Math.floor(ycord));


    if (cell) {
      if (!cell.visited) {
        // console.log(cell);
        board[cell.id].visited = true;
        board[cell.id].type    = '_wall_';
      }
    }
  }
  console.log('BinaryTreeCreation: ' + board.length);
  return board;
}