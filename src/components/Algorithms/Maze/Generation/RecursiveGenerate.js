import {directions}                                                                     from '../Directions';
import {_FindCellVisitState, _FindCellTypeState, _FindCell, _BoardReset, _GetNeighbors} from '../Tools';
import exit                                                                             from 'exit';
import {PATH_TYPE, DEFAULT_TYPE, FLOOR_TYPE, WALL_TYPE, START_TYPE, GOAL_TYPE}          from '../../../../Utility/Colors';




export function RecursiveBacktrackCreation(board, start, end) {
  _BoardReset(board);
  const numPoints = board.length;
  const prev      = null;
  for (var i = 0; i < numPoints; i++) {
    let node      = board[i];
    // Needed to be percise to avoid floating point errors....
    let direction = Math.floor(Math.random() * 4);
    // console.log(node);
    // console.log(direction);
    // console.log(directions[direction].x);
    // console.log(board[i].x + directions[direction].x);
    let xcord = node.x + directions[direction].x;
    let ycord = node.y + directions[direction].y;
    // console.log(xcord, ycord);
    // console.log(node.x + directions[direction].x, node.y + directions[direction].y);
    const cell = _FindCell(board, xcord, ycord);
    // console.log(cell);
    // exit();
    if (cell) {
      // exit();

      // const testNeighbor = _GetNeighbors(board, -6, -6);
      // if (testNeighbor) {
      //   testNeighbor.forEach(neighbor => {
      //     // console.log('Neighbor: ', neighbor);
      //     neighbor.type = PATH_TYPE;
      //   });
      // }
      // return;


      if (!cell.visited) {
        // console.log(cell);
        cell.visited = true;
        cell.type    = '_floor_';
      }
    }
  }

  for (var x = 0; x < numPoints; x++) {
    let node = board[x];

    if (!node.visited) {
      node.type = '_wall_';
    }
  }

}

