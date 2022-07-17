import * as React                    from 'react';
import {useEffect, useRef, useState} from 'react';
import {useSpring}                   from 'react-spring/three';
import {BinaryTreeCreation}          from '../Algorithms/Maze/Generation/BinaryTreeCreation';
import board                         from './Board';
import {directions}                  from '../Algorithms/Maze/Generation/Directions';



// const [mazeState, setMazeState] = useState(null);
// const [mazeChange, setMazeChange] = useState(null);

/*
 * Board type selector hook.
 *
 */
export const useLayoutHook = ({board, layoutType}) => {
  useEffect(() => {
    switch (layoutType) {
      case 'circular':
        circularLayout(board);
        break;
      case 'standard':
      default: {
        standardLayout(board);
      }
    }
    // GridState.setGrid(layoutType);
  }, [board, layoutType]);
};


export const useMazeTypeHook = ({board, mazeType}) => {
  useEffect(() => {
    switch (mazeType) {
      case '_BinaryTree_':
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
};


/*
 This function component is used to animate the grid layout by
 altering the points(Cells)' position on the board.

 "Deep Linking" is used to animate the grid layout.
 */
function useTargetLayoutHook({board, layoutType}) {

  useEffect(() => {
    for (let i = 0; i < board.length; ++i) {
      board[i].sourceX    = board[i].x || 0;
      board[i].sourceY    = board[i].y || 0;
      board[i].sourceZ    = board[i].z || 0;
      board[i].sourceType = board[i].type || "_floor_";
    }
  }, [board, layoutType]);

  useLayoutHook({board, layoutType});

  useEffect(() => {
    for (let i = 0; i < board.length; ++i) {
      board[i].targetX    = board[i].x;
      board[i].targetY    = board[i].y;
      board[i].targetZ    = board[i].z;
      board[i].targetType = board[i].type;
    }
  }, [board, layoutType]);
}


function useMazeTargetHook({board, mazeType}) {
  useEffect(() => {
    // TODO: Clean board before building.
  }, [board, mazeType]);

  useMazeTypeHook({board, mazeType});

  useEffect(() => {
    //  TODO: Get build strategy from mazeType.
  }, [board, mazeType]);
}


function interpolateSourceTarget(board, progress) {
  for (let i = 0; i < board.length; ++i) {
    board[i].x    = (1 - progress) * board[i].sourceX + progress * board[i].targetX;
    board[i].y    = (1 - progress) * board[i].sourceY + progress * board[i].targetY;
    board[i].z    = (1 - progress) * board[i].sourceZ + progress * board[i].targetZ;
    board[i].type = board[i].targetType;
  }
}


function interpolateCellType(board, progress) {
  for (let i = 0; i < board.length; ++i) {
    board[i].type = board[i].targetType;
  }
}


export function useGeneratedMazeHook({board, mazeType, onFrame}) {

  useMazeTargetHook({board, mazeType});

  const prevMaze   = useRef(mazeType);
  const buildProps = useSpring({
    generationInProgress: 1,
    from                : {generationInProgress: 0},
    reset               : mazeType !== prevMaze.current,
    onFrame             : ({generationInProgress}) => {
      // insert based on progress of animation
      interpolateCellType(board, generationInProgress);
      onFrame({generationInProgress}); // callback
    },
  });
  prevMaze.current = mazeType;

  return buildProps;
}




export function useAnimationHook({board, layoutType, mazeType, onFrame}) {

  useTargetLayoutHook({board, layoutType});
  useMazeTargetHook({board, mazeType});

  // do the actual animation when layoutType changes
  const prevLayout   = useRef(layoutType);
  const animProps    = useSpring({
    animationInProgress: 1,
    from               : {animationInProgress: 0},
    reset              : layoutType !== prevLayout.current,
    onFrame            : ({animationInProgress}) => {
      // insert based on progress of animation
      interpolateSourceTarget(board, animationInProgress);
      onFrame({animationInProgress}); // callback
    },
  });
  prevLayout.current = layoutType;

  return animProps;
}


// Peter Beshai's iddea for the creation and animation of a board-like grid section
// https://codesandbox.io/s/r3f-demo-2-prj0b
function standardLayout(board) {
  const numPoints = board.length;
  const numCols   = Math.ceil(Math.sqrt(numPoints));

  for (let i = 0; i < numPoints; ++i) {
    const node = board[i];
    const col   = (i % numCols) - numCols / 2;
    const row   = Math.floor(i / numCols) - numCols / 2;

    node.x = col;
    node.y = row;
    node.z = 0;
    node.type = board[i].type || '_floor_';
  }
}

function BinaryTreeMaze(board) {
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
}

function circularLayout(board) {
  let theta = 0;
  for (let i = 0; i < board.length; ++i) {
    const node  = board[i];
    const radius = Math.max(1, Math.sqrt(i + 1) * 0.8);
    theta += (Math.asin(1 / radius));

    node.x = radius * Math.cos(theta);
    node.y = radius * Math.sin(theta);
    node.z = 0;
    node.type = board[i].type;
  }
}