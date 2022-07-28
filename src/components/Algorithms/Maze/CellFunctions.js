import * as React                                                              from 'react';
import {useEffect, useRef, useState, useMemo}                                  from 'react';
import {useSpring}                                                             from 'react-spring';
import board                                                                   from './Board';
import {_BoardReset}                                                           from './Tools';
import {PATH_TYPE, DEFAULT_TYPE, FLOOR_TYPE, WALL_TYPE, START_TYPE, GOAL_TYPE} from '../../../Utility/Colors';
import {BinaryTreeCreation}                                                    from './Generation/BinaryTreeCreation';
import {RecursiveBacktrackCreation}                                            from './Generation/RecursiveBacktrackCreation';
import {GrowingTreeCreation}                                                   from './Generation/GrowingTreeCreation';
import {BfsCreation}                                                           from './Generation/BfsCreation';
import {RecursiveBacktrackSolution}                                            from './Solving/RecursiveBacktrackSolution';
import {BfsSolution}                                                           from './Solving/BfsSolution';



// const [mazeState, setMazeState] = useState(null);
// const [mazeChange, setMazeChange] = useState(null);

/*
 * Board type selector hook.
 *
 */
export function useLayoutHook({board, layoutType}) {
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
      case 'growingTree':
        GrowingTreeCreation(board);
        break;
      case 'bfs':
        BfsCreation(board);
        break;
      case 'none':
      default:
        // _BoardReset(board);
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
  const prevSelection       = useRef(algorithm);
  const animation           = useSpring({
        solvingProgress: 1,
        from           : {solvingProgress: 0},
        reset          : algorithm !== prevSelection.current,
        onFrame        : ({solvingProgress}) => {
          onFrame(solvingProgress);
        },
      },
  );
  prevSelection.current     = algorithm;

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
    node.z = 0;
  }
}



