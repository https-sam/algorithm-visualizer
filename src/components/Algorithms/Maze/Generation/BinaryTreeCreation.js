import {directions}                                         from './Directions';
import {_FindCellVisitState, _FindCellTypeState, _FindCell} from './Tools';




export function BinaryTreeCreation(board) {
  for (var i = 0; i < board.length; i++) {
    let direction = Math.floor(Math.random() * 4);
    // console.log(board[i]);

    // console.log(direction);
    // console.log(directions[direction].x);
    // console.log(board[i].x + directions[direction].x);
    let xcord  = board[i].x + directions[direction].x;
    let ycord  = board[i].y + directions[direction].y;
    const cell = board.find(item => Math.floor(item.x) === Math.floor(xcord) && Math.floor(item.y) === Math.floor(ycord));
    // console.log(cell);

    if (cell) {
      if (!cell.visited) {
        // console.log(cell);
        board[cell.id].visited = true;
        board[cell.id].type    = "_wall_";
      }
    }
  }
  console.log('BinaryTreeCreation: ' + board.length);
}


function interpolateBinaryTree(board, progress) {
  for (let i = 0; i < board.length; ++i) {
    board[i].x = (1 - progress) * board[i].sourceX + progress * board[i].targetX;
    board[i].y = (1 - progress) * board[i].sourceY + progress * board[i].targetY;
    board[i].z = (1 - progress) * board[i].sourceZ + progress * board[i].targetZ;
  }
}