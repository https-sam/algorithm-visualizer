import * as React          from 'react';
import {useEffect, useRef} from 'react';
import {useSpring}         from 'react-spring/three';
import BinaryTreeCreation  from '../Algorithms/Maze/Generation/BinaryTreeCreation';


/*
 * Board type selector hook.
 *
 */
export const useLayoutHook = (/* {GridState, layoutType = 'standard'} */{board, layoutType = 'standard'}) => {
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


/*
 This function component is used to animate the grid layout by
 altering the points(Cells)' position on the board.

 "Deep Linking" is used to animate the grid layout.
 */
function useTargetLayoutHook({board, layoutType}) {

  useEffect(() => {
    for (let i = 0; i < board.length; ++i) {
      board[i].sourceX = board[i].x || 0;
      board[i].sourceY = board[i].y || 0;
      board[i].sourceZ = board[i].z || 0;
    }
  }, [board, layoutType]);

  useLayoutHook({board, layoutType});

  useEffect(() => {
    for (let i = 0; i < board.length; ++i) {
      board[i].targetX = board[i].x;
      board[i].targetY = board[i].y;
      board[i].targetZ = board[i].z;
    }
  }, [board, layoutType]);
}


function interpolateSourceTarget(board, progress) {
  for (let i = 0; i < board.length; ++i) {
    board[i].x = (1 - progress) * board[i].sourceX + progress * board[i].targetX;
    board[i].y = (1 - progress) * board[i].sourceY + progress * board[i].targetY;
    board[i].z = (1 - progress) * board[i].sourceZ + progress * board[i].targetZ;
  }
}


export const useGenerateMaze = ({board, layoutType}) => {
  useEffect(() => {

    BinaryTreeCreation(board);

  }, [board]);
}

export function useAnimationHook({board, layoutType, onFrame}) {

  useTargetLayoutHook({board, layoutType});

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
    const datum = board[i];
    const col   = (i % numCols) - numCols / 2;
    const row   = Math.floor(i / numCols) - numCols / 2;

    datum.x = col * 1.05;
    datum.y = row * 1.05;
    datum.z = 0;
  }
}


function circularLayout(board) {
  let theta = 0;
  for (let i = 0; i < board.length; ++i) {
    const datum  = board[i];
    const radius = Math.max(1, Math.sqrt(i + 1) * 0.8);
    theta += (Math.asin(1 / radius));

    datum.x = radius * Math.cos(theta);
    datum.y = radius * Math.sin(theta);
    datum.z = 0;
  }
}