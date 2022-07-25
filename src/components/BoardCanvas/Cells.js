import * as React                                            from 'react';
import {useEffect, useRef, useMemo, useState, createContext} from 'react';
import {a}                                                   from '@react-spring/three';
import {useGenerateMazeHook, useSolver, useLayoutHook}       from './LayoutsFunctions';
import {directions}                                          from '../Algorithms/Maze/Directions';
import {_FindCell}                                           from '../Algorithms/Maze/Tools';
import board                                                 from './Board';
import {BinaryTreeCreation}                                  from '../Algorithms/Maze/Generation/BinaryTreeCreation';
import {
  FLOOR_TYPE, FLOOR_COLOR, WALL_TYPE, WALL_COLOR,
  getColor, GOAL_TYPE, START_TYPE, SELECTED_COLOR,
  BURN_COLOR, PATH_TYPE, PATH_COLOR,
}                                                            from '../../Utility/Colors';
import * as THREE                                            from 'three';




const tempOBJ   = new THREE.Object3D();
const tempCOLOR = new THREE.Color();


// transform mesh to world space
function update({mesh, board, colorAttrib, colorArray}) {
  for (let i = 0; i < board.length; ++i) {
    const {x, y, z} = board[i];
    tempOBJ.position.set(x, y, z);
    tempOBJ.rotation.set(0.5 * Math.PI, 0, 0);  // Look at the origin
    tempCOLOR.set(getColor(board[i].type));             // Set the color
    tempCOLOR.toArray(colorArray, i * 3);         // Update color array
    tempOBJ.updateMatrix();
    mesh.setMatrixAt(i, tempOBJ.matrix);
  }
  colorAttrib.current.needsUpdate = true; // Notify that the color array has changed
  mesh.instanceMatrix.needsUpdate = true; // Notify that the matrix array has changed
}




const useColorsHook = ({board}) => {
  const numPoints   = board.length;
  const colorAttrib = React.useRef();
  const colorArray  = React.useMemo(() => new Float32Array(numPoints * 3), [
    numPoints,
  ]);

  useEffect(() => {
    for (let i = 0; i < board.length; ++i) {
      tempCOLOR.set(getColor(board[i].type));
      tempCOLOR.toArray(colorArray, i * 3);
    }
    colorAttrib.current.needsUpdate = true;
  }, [board, colorArray]);
  return {colorAttrib, colorArray};
};



const useMouseClickHook = ({board, selectedPoint, onSelectPoint}) => {
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
    console.log(board[instanceId]);
    console.log('Point clicked: ', point);
    // toggle the point
    if (point === selectedPoint) {
      onSelectPoint(null);
    }
    else {
      onSelectPoint(point);
    }
  };

  return {setDownPointerCoord, getClickTarget};
};




const Cells = ({board, layoutType, solving, algorithm, mazeType, selectedPoint, onSelectPoint /*,  useDrag */}) => {
  const meshRef                = useRef();
  const [activeRef, setActive] = useState(false);
  const numPoints              = board.length;




  // @Test
  // board[100].type = GOAL_TYPE;
  // board[1].type   = START_TYPE;


  /* Builtin observer callback functions for the board state.
   * These functions are called when the board state changes.
   *
   * useGenerateMazeHook() is a hook that calls the GenerateMazeHook() function.
   * Generating a maze according to the selected generation algorithm.
   *
   * useLayoutHook() is a hook that calls the LayoutHook() function.
   * Generating a layout according to the selected layout shape.
   */
  useGenerateMazeHook({board, mazeType});
  useLayoutHook({board, layoutType});

  /*
   * useSolver() is a hook that calls the SolverHook() function.
   * Solving the maze according to the selected algorithm.
   * Also, it updates the board state according to solver's progress.
   */
  const {solvingProgress} = useSolver({
    board,
    algorithm,
    solving,
    onFrame: () => {
      update({mesh: meshRef.current, board, colorAttrib, colorArray});
    },
  }, [solving === true]);


  useEffect(() => {
    console.log('Board updated');
    update({mesh: meshRef.current, board, colorAttrib, colorArray});
  }, [board, layoutType, mazeType]);


  const {getClickTarget, setDownPointerCoord} = useMouseClickHook({
    board,
    selectedPoint,
    onSelectPoint,
  });

  /*
    * useColorsHook() is a hook that calls the useColorsHook() function.
    * Generating a color array according to the listed type of each cell.
    *
   */
  const {colorAttrib, colorArray} = useColorsHook({board});





  return (
      <group>
        <instancedMesh
            ref = {meshRef}
            args = {[null, null, numPoints]}
            frustumCulled = {false}
            onClick = {getClickTarget}
            onPointerDown = {setDownPointerCoord}
        >
          <boxBufferGeometry attach = "geometry" args = {[0.6, 0.3, 0.6, 18]}>
            <instancedBufferAttribute
                ref = {colorAttrib}
                attachObject = {['attributes', 'color']}
                array = {colorArray}
                itemSize = {3}
            />
          </boxBufferGeometry>
          <meshStandardMaterial
              attach = "material"
              vertexColors = {THREE.VertexColors}
          />

          {/* {generationInProgress && <a.group */}
          {/*     position = {generationInProgress.interpolate((x, y, z) => [x, y, z])} */}
          {/* />} */}
          {/* <BufferPoints numPoints={numPoints} /> */}
          {/* <BufferPoints numPoints = {numPoints}/> */}
          {selectedPoint && (
              <a.group
                  position = {[
                    selectedPoint.x,
                    selectedPoint.y,
                    selectedPoint.z,
                  ]}

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
        </instancedMesh>
      </group>

  );
};


export default Cells;



