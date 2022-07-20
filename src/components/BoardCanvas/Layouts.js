import * as React                             from 'react';
import {useEffect, useRef, useState, useMemo} from 'react';
import {useSpring}                            from 'react-spring/three';
// import {BinaryTreeCreation}          from '../Algorithms/Maze/Generation/BinaryTreeCreation';
import board                                  from './Board';
import {directions}                           from '../Algorithms/Maze/Generation/Directions';
import exit                                   from 'exit';
import {_FindCell}                            from '../Algorithms/Maze/Generation/Tools';
import {BinaryTreeCreation}                   from '../Algorithms/Maze/Generation/BinaryTreeCreation';



// const [mazeState, setMazeState] = useState(null);
// const [mazeChange, setMazeChange] = useState(null);

/*
 * Board type selector hook.
 *
 */
export const useLayoutHook = ({board, layoutType = 'standard'}) => {
  console.log('useLayoutHook used.');

  useEffect(() => {
    console.log('useLayoutHook MEMO E1 used.');

    // if === "none") {
    switch (layoutType) {
      case 'circular':
        circularLayout(board);
        break;
      case 'standard':
      default: {
        standardLayout(board);
      }
    }
  }, [board, layoutType]);
};


// export const useMazeTypeHook = ({board}) => {
//   useEffect(() => {
//     switch {
//       case 'binaryTree':
//         BinaryTreeCreation(board);
//         break;
//       case '_RecursiveBacktracker_':
//
//         break;
//       case '_RecursiveDivision_':
//
//         break;
//       case 'none':
//       default: {
//         return;
//       }
//     }
//   }, [board]);
// };


/*
 This function component is used to animate the grid layout by
 altering the points(Cells)' position on the board.

 "Deep Linking" is used to animate the grid layout.
 */
// function useTargetLayoutHook({board, layoutType}) {
//
//   useEffect(() => {
//     for (let i = 0; i < board.length; ++i) {
//       board[i].sourceX    = board[i].x || 0;
//       board[i].sourceY    = board[i].y || 0;
//       board[i].sourceZ    = board[i].z || 0;
//       board[i].sourceType = board[i].type;
//     }
//   }, [board, layoutType]);
//
//   useLayoutHook({board, layoutType});

// useEffect(() => {
//   for (let i = 0; i < board.length; ++i) {
//     board[i].targetX    = board[i].x;
//     board[i].targetY    = board[i].y;
//     board[i].targetZ    = board[i].z;
//     board[i].targetType = board[i].type;
//   }
// }, [board, layoutType]);
//

//   interpolateSourceTarget({board});
// }


/*
 function useMazeTargetHook({board}) {
 useEffect(() => {
 for (let i = 0; i < board.length; ++i) {
 board[i].sourceX    = board[i].x || 0;
 board[i].sourceY    = board[i].y || 0;
 board[i].sourceZ    = board[i].z || 0;
 board[i].sourceType = board[i].type || '_floor_';
 }
 }, [board]);

 useMazeTypeHook({board});

 useEffect(() => {
 for (let i = 0; i < board.length; ++i) {
 board[i].targetX    = board[i].x;
 board[i].targetY    = board[i].y;
 board[i].targetZ    = board[i].z;
 board[i].targetType = board[i].type;
 }
 }, [board]);
 }
 */


// function interpolateSourceTarget(board) {
//   for (let i = 0; i < board.length; ++i) {
//     board[i].x = board[i].targetX;
//     board[i].y = board[i].targetY;
//     board[i].z = board[i].targetZ;
//     board[i].type = board[i].targetType;
//   }
// }





export function useAnimationHook({board, layoutType}) {

  useLayoutHook({board, layoutType});  // do the actual animation when layoutType changes
}


export function useGenerateMazeHook({board, mazeType}) {
  useEffect(() => {
    console.log('generatedMaze used.');
    switch (mazeType) {
      case 'binaryTree':
        BinaryTreeCreation(board);
        break;
      case '_RecursiveBacktracker_':

        break;
      case '_RecursiveDivision_':

        break;
      case 'none':
      default: {
        return;
      }
    }
  }, [board, mazeType]);
}


  // Peter Beshai's iddea for the creation and animation of a board-like grid section
  // https://codesandbox.io/s/r3f-demo-2-prj0b
  function standardLayout(board) {
    const numPoints = board.length;
    const numCols   = Math.ceil(Math.sqrt(numPoints));

    for (let i = 0; i < numPoints; ++i) {
      const node = board[i];
      const col  = (i % numCols) - numCols / 2;
      const row  = Math.floor(i / numCols) - numCols / 2;

      node.x = col * 1.05;
      node.y = row * 1.05;
      node.z = 0;
      node.type = board[i].type || '_wall_';

    }
  }


  /*
   * Recursive backtracking algorithm to generate a solvable maze.
   */
  const backtrack = (board, start, goal) => {
    let current = start;
    let path    = [];
    while (current !== goal) {
      path.push(current);
      current = board[current.parent];
    }
    path.push(current);
    return path;
  };


  /* function BinaryTreeMaze(board) {
   const numPoints = board.length;
   const numCols   = Math.ceil(Math.sqrt(numPoints));

   for (let i = 0; i < numPoints; ++i) {
   const node = board[i];
   let direction = Math.random() * 4;

   let xcord  = board[i].x + directions[direction].x;
   let ycord  = board[i].y + directions[direction].y;
   const col   = (i % numCols) - numCols / 2;
   const row   = Math.floor(i / numCols) - numCols / 2;

   node.x = col;
   node.y = row;
   node.z = 0;
   node.type = board[i].type;
   }
   } */





  function circularLayout(board) {
    let theta = 0;
    for (let i = 0; i < board.length; ++i) {
      const node   = board[i];
      const radius = Math.max(1, Math.sqrt(i + 1) * 0.8);
      theta += (Math.asin(1 / radius));

      node.x    = radius * Math.cos(theta);
      node.y    = radius * Math.sin(theta);
      node.z    = 0;
      node.type = board[i].type;
    }
  }