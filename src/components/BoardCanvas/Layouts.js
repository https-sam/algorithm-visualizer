import * as React                             from 'react';
import {useEffect, useRef, useState, useMemo} from 'react';
import {useSpring}                            from 'react-spring/three';
// import {BinaryTreeCreation}          from '../Algorithms/Maze/Generation/BinaryTreeCreation';
import board        from './Board';
import {directions} from '../Algorithms/Maze/Directions';
// import exit                 from 'exit';
import {_FindCell}          from '../Algorithms/Maze/Tools';
import {BinaryTreeCreation} from '../Algorithms/Maze/Generation/BinaryTreeCreation';



// const [mazeState, setMazeState] = useState(null);
// const [mazeChange, setMazeChange] = useState(null);

/*
 * Board type selector hook.
 *
 */
export const useLayoutHook = ({board, layoutType}) => {
  console.log('useLayoutHook used.');

  useEffect(() => {
    console.log('useLayoutHook used.');

    // if === "none") {
    switch (layoutType) {
      case 'circular':
        break;
      case 'standard':
      default: {
        standardLayout(board);
      }
    }
  }, [board, layoutType]);
};


export function useAnimationHook({board, layoutType}) {
  console.log('useAnimatio/*  */nHook used.');
  useLayoutHook({board, layoutType});  // do the actual animation when layoutType changes
  console.log('useAnimationHook ended.');

}


export function useGenerateMazeHook({board, mazeType}) {
  console.log('generatedMaze used.');

  useEffect(() => {
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
        break;
      }
    }

  }, [board, mazeType]);
  console.log('generatedMaze ended.');
  return mazeType;
}


export function standardLayout(board) {
  const numPoints = board.length;
  const numCols   = Math.ceil(Math.sqrt(numPoints));

  for (let i = 0; i < numPoints; ++i) {
    const node = board[i];

    // const col  = Math.abs((i % numCols) - numCols / 2);
    // const row  = Math.abs(Math.floor(i / numCols) - numCols / 2);
    const col  = (i % numCols) - numCols / 2;
    const row  = Math.floor(i / numCols) - numCols / 2;

    node.x = col;/* .05; */
    node.y = row;/* .05; */
    node.z = 0;
  }
}



