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
export const useLayoutHook = ({board, layoutType}) => {
  console.log('useLayoutHook used.');

  useEffect(() => {
    console.log('useLayoutHook used.');

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


export function useAnimationHook({board, layoutType}) {
  console.log('useAnimationHook used.');
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
        return;
      }
    }

  }, [board, mazeType]);
  console.log('generatedMaze ended.');

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
      // node.type = board[i].type || '_wall_';

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