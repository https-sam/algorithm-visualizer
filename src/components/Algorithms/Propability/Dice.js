import * as React                                            from 'react';
import {useEffect, useRef, useMemo, useState, createContext} from 'react';
import {a}                                                   from '@react-spring/three';
import {
  FLOOR_TYPE, FLOOR_COLOR, WALL_TYPE, WALL_COLOR,
  getColor, GOAL_TYPE, START_TYPE, SELECTED_COLOR,
  BURN_COLOR, PATH_TYPE, PATH_COLOR,
}                                                            from '../../../Utility/Colors';
import {useAnimationHook}                                    from './DiceFunctions';
import * as THREE                                            from 'three';




const tempOBJ   = new THREE.Object3D();
const tempCOLOR = new THREE.Color();


// transform mesh to world space
function update({mesh, board}) {
  for (let i = 0; i < board.length; ++i) {
    const {x, y, z} = board[i];
    tempOBJ.position.set(x, y, z);
    tempOBJ.rotation.set(0.5 * Math.PI, 0, 0);  // Look at the origin
    tempOBJ.updateMatrix();
    mesh.setMatrixAt(i, tempOBJ.matrix);
  }
  mesh.instanceMatrix.needsUpdate = true; // Notify that the matrix array has changed
}


const useMouseClickHook = ({board, selectedDie, onSelectDie}) => {
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
    if (point === selectedDie) {
      onSelectDie(null);
    }
    else {
      onSelectDie(point);
    }
  };

  return {setDownPointerCoord, getClickTarget};
};



const Dice = ({board, count, layoutType, algorithm, onSelectDie, selectedDie}) => {
  const meshRef             = useRef();
  const [active, setActive] = useState(false);
  const numPoints           = board.length;

  useAnimationHook({
    board,
    algorithm,
    active,
    onFrame: () => {
      update({mesh: meshRef.current, board});
    },
  });


  useEffect(() => {
    if (!active) {
      update({mesh: meshRef.current, board});
    }
  }, [board]);


  const {getClickTarget, setDownPointerCoord} = useMouseClickHook({board, selectedDie, onSelectDie});


  return (
      <group>
        <mesh
            ref = {meshRef}
            frustumCulled = {false}
            onClick = {getClickTarget}
            onPointerDown = {setDownPointerCoord}
        >

          <meshStandardMaterial attach = "material" color = "white" vertexColors = "vertex"/>
          {selectedDie && (
              <a.group
                  position = {[
                    selectedDie.x,
                    selectedDie.y,
                    selectedDie.z,
                  ]}
              >
                <pointLight
                    position = {selectedDie.position}
                    decay = {10}
                    intensity = {20}
                    color = {BURN_COLOR}
                />
              </a.group>
          )}
        </mesh>
      </group>
  );
};


export default Dice;