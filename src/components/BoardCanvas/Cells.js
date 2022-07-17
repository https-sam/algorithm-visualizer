'use strict';

import * as React                          from 'react';
import {useEffect, useRef, useMemo}        from 'react';
import * as THREE                          from 'three';
import {a}                                 from 'react-spring/three';
import {useAnimationHook, useGenerateMaze} from './layouts';




const TEST_COLOR     = '#FF66CC';
const BURN_COLOR     = '#fad6ee';
const PATH_COLOR     = '#63caef';
const WALL_COLOR     = '#1c1b1b';
const GOAL_COLOR     = '#30fa04';
const START_COLOR    = '#ff0000';
const SELECTED_COLOR = '#ffd300';
const FLOOR_COLOR    = '#8f8d8d';
const FLOOR_TYPE     = '_floor_';
const WALL_TYPE      = '_wall_';
const PATH_TYPE      = '_path_';
const GOAL_TYPE      = '_goal_';
const START_TYPE     = '_start_';
const TEST_TYPE      = '_test_';

const tempOBJ = new THREE.Object3D();


function updateInstancedMeshMatrices({mesh, board}) {
  if (!mesh) {
    return;

  }
  // transform mesh to world space
  for (let i = 0; i < board.length; ++i) {
    const {x, y, z} = board[i];
    tempOBJ.position.set(x, y, z);
    tempOBJ.rotation.set(0.5 * Math.PI, 0, 0); // Look at the origin
    tempOBJ.updateMatrix();
    mesh.setMatrixAt(i, tempOBJ.matrix);

  }
  mesh.instanceMatrix.needsUpdate = true;

}


const tempCOLOR = new THREE.Color();

const usePointColorsHook = ({board, selectedPoint}) => {
  const numPoints   = board.length;
  const colorAttrib = useRef();
  const colorArray  = useMemo(() => new Float32Array(numPoints * 3), [
    numPoints,
  ]);
  useEffect((prev) => {
    for (let i = 0; i < board.length; ++i) {
      if (board[i].type === WALL_TYPE.toString()) {
        tempCOLOR.set(
            selectedPoint === board[i] ? WALL_COLOR : FLOOR_COLOR,
        );
      }
      else if (board[i].type === PATH_TYPE.toString()) {
        tempCOLOR.set(
            selectedPoint === board[i] ? PATH_COLOR : FLOOR_COLOR,
        );
      }
      else if (board[i].type === GOAL_TYPE.toString()) {
        tempCOLOR.set(
            selectedPoint === board[i] ? GOAL_COLOR : FLOOR_COLOR,
        );
      }
      else if (board[i].type === START_TYPE.toString()) {
        tempCOLOR.set(
            selectedPoint === board[i] ? START_COLOR : FLOOR_COLOR,
        );
      }
      else if (board[i].type === TEST_TYPE.toString()) {
        tempCOLOR.set(
            selectedPoint === board[i] ? TEST_COLOR : FLOOR_COLOR,
        );
      }
      else if (board[i].type === FLOOR_TYPE.toString()) {
        tempCOLOR.set(
            selectedPoint === board[i] ? FLOOR_COLOR : FLOOR_COLOR,
        );
        tempCOLOR.set(FLOOR_COLOR);
      }
      else if (board[i].type === null) {
        tempCOLOR.set(FLOOR_COLOR);
      }
      else {
        tempCOLOR.set(FLOOR_COLOR);
      }
      tempCOLOR.toArray(colorArray, i * 3);
    }
    colorAttrib.current.needsUpdate = true;
  }, [board, selectedPoint, colorArray]);

  return {colorAttrib, colorArray};
};

const _mouseClickHook = ({board, selectedPoint, onSelectPoint/* , useDrag  */}) => {
  const onMouseDownHandler = useRef([0, 0]);   // Record and maintain the handler for the mouse down event
  const onMouseUpHandler   = useRef([0, 0]);   // Record and maintain the handler for the mouse up event
  const onMouseMoveHandler = useRef([0, 0]);   // Record and maintain the handler for the mouse move event

  /*
   * Pointer Click Down Position
   */
  const setDownPointerCoord = event => {
    onMouseDownHandler.current[0] = event.clientX;  // Mouseclick x coordinate
    onMouseDownHandler.current[1] = event.clientY;  // Mouseclick y coordinate
  };

  /*
   * If the mouse has clicked on a point, if that point is occupied by an
   * interactable object, gather its reference.
   */
  const getClickTarget = event => {
    const {instanceId, clientX, clientY} = event;
    const travelDistance                 = Math.sqrt(
        Math.pow(onMouseDownHandler.current[0] - clientX, 2)
        +
        Math.pow(onMouseDownHandler.current[1] - clientY, 2),
    );

    // Prevents repeat calls to click handler unless drag selection is initiated.
    if (travelDistance > 50) {
      /* if (!useDrag) { */
      event.stopPropagation();
      return;
      // }
    }

    const point = board[instanceId];
    console.log('Point clicked: ', point);
    // toggle the point
    if (point === selectedPoint) {
      onSelectPoint(null);
    }
    else {
      onSelectPoint(point);
    }
  };

  // const onMouseMove = (e) => {
  //   const dx = e.clientX - originalPosition.clientX
  //   const dy = e.clientY - originalPosition.clientY
  //   onMouseMoveHandler.current(e, { dx, dy })
  // }

  return {setDownPointerCoord, getClickTarget};
};




const Cells = ({board, layoutType, mazeType, selectedPoint, onSelectPoint /*,  useDrag */}) => {
  const meshRef   = useRef();
  const numPoints = board.length;

  // @Test
  board[100].type = '_start_';
  board[1].type   = '_goal_';


  /*
   * Update the mesh matrixes based on the board state
   * with the goal of constructing a solvable maze.
   */
    useEffect(() => {

    })


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


  const {animationInProgress} = useAnimationHook({
    board,
    layoutType,
    onFrame: () => {
      updateInstancedMeshMatrices({mesh: meshRef.current, board});
    },
  });

  useEffect(() => {
    updateInstancedMeshMatrices({mesh: meshRef.current, board});
  }, [board, layoutType]);

  const {getClickTarget, setDownPointerCoord} = _mouseClickHook({
    board,
    selectedPoint,
    onSelectPoint,
    /* useDrag */
  });


  const {colorAttrib, colorArray} = usePointColorsHook({board, selectedPoint});


  return (
      <>
        <instancedMesh
            ref = {meshRef}
            args = {[null, null, numPoints]}
            frustumCulled = {false}
            onClick = {getClickTarget}
            onPointerDown = {setDownPointerCoord}
        >
          <boxBufferGeometry attach = "geometry" args = {[1, 0.5, 1, 18]}>
            <instancedBufferAttribute
                ref = {colorAttrib}
                attachObject = {['attributes', 'color']}
                args = {[colorArray, 3]}
            />
          </boxBufferGeometry>
          <meshStandardMaterial
              attach = "material"
              vertexColors = {THREE.VertexColors}
          />
        </instancedMesh>

        {selectedPoint && (
            <a.group
                position = {animationInProgress.interpolate(() => [
                  selectedPoint.x,
                  selectedPoint.y,
                  selectedPoint.z,
                ])}
            >
              <pointLight
                  distance = {6}
                  position = {[0, 0, 0.6]}
                  decay = {30}  // Fast defusion of light. Drop light intensity by half each second. (30 = 1/2^30). No directly select_color leaves the box.
                  intensity = {155}
                  color = {SELECTED_COLOR}
              />
              <pointLight
                  distance = {12}  // With decay: 1, distance = 5 boxes in each direction
                  position = {[0, 0.11, 0.051]}
                  decay = {10}   // Slow defusion of light
                  intensity = {20}
                  color = {BURN_COLOR}
              />
            </a.group>
        )}
      </>
  );
};



export default Cells;
