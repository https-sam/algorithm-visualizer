import * as React                                                              from 'react';
import {useEffect, useRef, useState, useMemo}                                  from 'react';
import {useSpring}                                                             from 'react-spring';
// import {BinaryTreeCreation}          from '../Algorithms/Maze/Generation/BinaryTreeCreation';
import board                                                                   from './Board';
import {directions}                                                            from '../Algorithms/Maze/Directions';
// import exit                 from 'exit';
import {_FindCell, _BoardReset}                                                from '../Algorithms/Maze/Tools';
import {BinaryTreeCreation}                                                    from '../Algorithms/Maze/Generation/BinaryTreeCreation';
import {PATH_TYPE, DEFAULT_TYPE, FLOOR_TYPE, WALL_TYPE, START_TYPE, GOAL_TYPE} from '../../Utility/Colors';
import {RecursiveBacktrackCreation}                                            from '../Algorithms/Maze/Generation/RecursiveGenerate';
import RecursiveBacktrackSolution                                              from '../Algorithms/Maze/Solving/RecursiveSolve';
import BfsSolution                                                             from '../Algorithms/Maze/Solving/BfsSolution';



// const [mazeState, setMazeState] = useState(null);
// const [mazeChange, setMazeChange] = useState(null);

/*
 * Board type selector hook.
 *
 */
export function useAnimationHook({board, layoutType = 'standard'}) {
  console.log('useAnimationHook used.');
  // if (activeRef) {
  //   return;
  // }
  useEffect(() => {
    switch (layoutType) {
      case 'standard':
        default:
        standardLayout(board);
        break;

    }
  }, [layoutType]);
  console.log('useAnimationHook ended.');
  // return () => {board.reset()};

}


export function useGenerateMazeHook({board, mazeType}) {
  console.log('generatedMaze used.');

  useEffect(() => {
    switch (mazeType) {
      case 'binaryTree':
        BinaryTreeCreation(board);
        break;
      case 'recursiveBacktracking':
        RecursiveBacktrackCreation(board);
        break;
      case 'recursiveDivision':
        // recursiveDivision(board);
        break;
      case 'none':
        default:
          _BoardReset(board);
        break;
    }
  }, [mazeType]);

  console.log('generatedMaze ended.');
  // return board;
}


export function useSolver({board, solving, algorithm, onFrame}) {
  console.log('Solver used.');
  const boardRef = useRef(board);

  const [solved, setSolved] = useState(false);
  const prevSelection = useRef(algorithm);
  const animation = useSpring({
    solvingProgress: 1,
    from: { solvingProgress: 0 },
    reset: algorithm !== prevSelection.current,
    onFrame: ({ animationProgress }) => {
      // interpolate based on progress
      // drawPathing(board, solvingProgress);
      // callback to indicate data has updated
      // onFrame({ solvingProgress });
    },
  });
  prevSelection.current = algorithm;

  return animation;
}


export function usePathing({board, algorithm, start, goal}) {
  useEffect(() => {
    for (let i = 0; i < board.length; i++) {
      board[i].currentType = board[i].type;
    }
  }, [board, algorithm]);

  useAlgorithm({board, algorithm, start, goal});



}


function useAlgorithm({board, algorithm, start, goal}) {
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    switch (algorithm) {
      case 'BFS':
        const solution = BfsSolution(board);
        break;
      case 'Backtracking': {
        while (!solved) {
          const solution = RecursiveBacktrackSolution(board);
          // drawPathing(board, solution);

          if (solution.endFound) {
            setSolved(true);
          }
        }
        break;
      }
      case 'recursiveDivision':
        // recursiveDivision(board);
        break;
      case 'none':
        default:
          _BoardReset(board);
        break;
    }
  }, [board, algorithm]);
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
    node.z    = 0;
    node.type = board[i].type || DEFAULT_TYPE;
  }
}



