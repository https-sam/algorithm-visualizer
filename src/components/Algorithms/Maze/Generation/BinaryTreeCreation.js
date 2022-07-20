import {directions}                                                      from '../Directions';
import {_FindCellVisitState, _FindCellTypeState, _FindCell, _BoardReset} from '../Tools';
import exit                                                              from 'exit';




export function BinaryTreeCreation(board) {
  _BoardReset(board);
  const numPoints = board.length;
  const numCols   = Math.ceil(Math.sqrt(numPoints));

  for (var i = 0; i < numPoints; i++) {
    let node      = board[i];
    // Needed to be percise to avoid floating point errors....
    let direction = Math.floor(Math.random() * 4);
    // console.log(node);
    // console.log(direction);
    // console.log(directions[direction].x);
    // console.log(board[i].x + directions[direction].x);
    let xcord = node.x += directions[direction].x;
    let ycord = node.y += directions[direction].y;
    // console.log(xcord, ycord);
    // console.log(node.x + directions[direction].x, node.y + directions[direction].y);

    const cell = _FindCell(board, xcord, ycord);
    // console.log(cell);
    // exit();
    if (cell) {
      // exit();

      if (!cell.visited) {
        // console.log(cell);
        cell.visited = true;
        cell.type    = '_floor_';
      }
    }
  }

  for (var x = 0; x < numPoints; x++) {
    let node = board[x];

    // Tightly packed rows of cells.
    node.x = board[x].x = Math.floor(node.x);
    node.y = board[x].y = Math.floor(node.y);
    node.z = 0;

    if (!node.visited) {
      node.type = '_wall_';
    }
  }

  let [setG, setS] = [false, false];
  // while (!setG || !setS) {
  //   let node = board[w];
  //
  //   if (node.type === '_wall_') {
  //     continue;
  //   }
  //
  // }
}

