import * as React                             from 'react';
import {useEffect, useRef, useState, useMemo} from 'react';
import {useSpring}                            from 'react-spring';
// import {BinaryTreeCreation}          from '../Algorithms/Maze/Generation/BinaryTreeCreation';
import board                                  from './Board';
import {directions}                           from '../Algorithms/Maze/Directions';
// import exit                 from 'exit';
import {_FindCell}                            from '../Algorithms/Maze/Tools';
import {BinaryTreeCreation}                   from '../Algorithms/Maze/Generation/BinaryTreeCreation';
import {PATH_TYPE, DEFAULT_TYPE, FLOOR_TYPE, WALL_TYPE, START_TYPE, GOAL_TYPE}          from '../../Utility/Colors';



// const [mazeState, setMazeState] = useState(null);
// const [mazeChange, setMazeChange] = useState(null);

/*
 * Board type selector hook.
 *
 */
export function useAnimationHook({board, layoutType}) {
  console.log('useAnimationHook used.');
  // if (activeRef) {
  //   return;
  // }
  useEffect(() => {
      switch (layoutType) {
        case 'circular':
          break;
        case 'standard':
          standardLayout(board);
          break;
        default: {
          break;
        }
      }
  }, [layoutType]);
  console.log('useAnimationHook ended.');
  // return () => {board.reset()};

}


export function useGenerateMazeHook({board, mazeType}) {
  console.log('generatedMaze used.');

  useEffect(() => {
    // if (mazeType !== mazeRef.current) {
      switch (mazeType) {
        case 'binaryTree':
          // board = useMemo(() => BinaryTreeCreation(board), [mazeType]);
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

  }, [mazeType]);
  console.log('generatedMaze ended.');

  // return board;
}


export function useSolver({board, solverType, onFrame}) {
  console.log('Solver used.');
  const boardRef = useRef(board);


}


export function standardLayout(board) {
  const numPoints = board.length;
  const numCols   = Math.ceil(Math.sqrt(numPoints));

  for (let i = 0; i < numPoints; ++i) {
    const node = board[i];

    // const col  = Math.abs((i % numCols) - numCols / 2);
    // const row  = Math.abs(Math.floor(i / numCols) - numCols / 2);
    const col = (i % numCols) - numCols / 2;
    const row = Math.floor(i / numCols) - numCols / 2;

    node.x = col;/* .05; */
    node.y = row;/* .05; */
    node.z = 0;
    node.type = PATH_TYPE;
  }
}



