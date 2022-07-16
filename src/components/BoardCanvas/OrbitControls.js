import * as React                                                     from 'react';
import {extend, useThree, useFrame}                                   from 'react-three-fiber';
import {TrackballControls}                                            from 'three/examples/jsm/controls/TrackballControls';
import * as Three                                                     from 'three';
import {forwardRef, useRef, useImperativeHandle, useEffect, useState} from 'react';




extend({TrackballControls});

const CMD_KEY   = 91;
const CTRL_KEY  = 17;
const ESC_KEY   = 27;
const UP_KEY    = 38;
const DOWN_KEY  = 40;
const LEFT_KEY  = 37;
const RIGHT_KEY = 39;

const OrbitControls = ({selectedPoint, onSelectedPoint}, ref) => {
  const controls            = useRef();
  const [target, setTarget] = useState(null);
  const {camera, gl}        = useThree();
  const {setDefaultCamera}  = useThree();

  //  Set up the camera on mount.
  useEffect(() => {
    camera.position.set(0, -10, 50);  // Initial camera position
    camera.lookAt(0, 0, 0);
  }, [camera]);

  //  Set up the initial target.
  useEffect((selectedPoint) => {
    setTarget(selectedPoint);
  }, [target]);

  useFrame(() => {
    controls.current.update();
  });

  /*
   * {useImperativeHandle} React requirement in order to use refs, and
   *                       to pass the ref to the component altering functionality.
   */
  useImperativeHandle(ref, (state) => ({
    setTarget: (target) => {
      setTarget(target);
      console.log('setTarget', target);
    },

    ZoomToTarget: () => {
      camera.position.set(this.target.position.x, this.target.position.y, this.target.position.z);
      camera.lookAt(target.current.position);
    },

    /*
     * Function to reset the camera to the default position.
     */
    resetCamera: () => {
      camera.position.set(0, -10, 50);  // reset position
      camera.lookAt(0, 0, 0);           // reset rotation
      this.setTarget(null);     // reset target
    },


    /*
     * Function to zoom in the camera to the selected point.
     */
    setTargetZoomIn: (target) => {
      if (target) {
        camera.position.set(target.position.x, target.position.y, target.position.z);
        camera.lookAt(target.position);
        console.log(target.position);
      }
    },
  }));


  return (
      <trackballControls
          ref = {controls}
          args = {[camera, gl.domElement]}
          dynamicDampingFactor = {0.1}
          keys = {[
            CMD_KEY,
            CTRL_KEY,
            ESC_KEY,
            UP_KEY,
            DOWN_KEY,
            LEFT_KEY,
            RIGHT_KEY,
          ]}
          // rotationLock = {[
          //   true, // orbit
          //   true, // zoom
          //   true, // pan
          // ]}
          mouseButtons = {{
            LEFT  : Three.MOUSE.PAN,
            RIGHT : Three.MOUSE.ROTATE,
            MIDDLE: Three.MOUSE.ZOOM,
          }}
          enabled = {true}
          zoomSpeed = {0.5}
          zoomFactor = {0.1}
          panSpeed = {0.1}
          rotateSpeed = {0.15}
      />
  );
};

export default forwardRef(OrbitControls);




/*
* const usePointColorsHook = ({board, selectedPoint}) => {
 const numPoints   = board.length;
 const colorAttrib = useRef();
 const colorArray  = useMemo(() => new Float32Array(numPoints * 3), [
 numPoints,
 ]);
 useEffect((prev) => {
 for (let i = 0; i < board.length; ++i) {
 if (board[i].type === WALL_TYPE) {
 tempCOLOR.set(
 selectedPoint === board[i] ? WALL_COLOR : FLOOR_COLOR,
 );
 }
 else if (board[i].type === PATH_TYPE) {
 tempCOLOR.set(
 selectedPoint === board[i] ? PATH_COLOR : FLOOR_COLOR,
 );
 }
 else if (board[i].type === GOAL_TYPE) {
 tempCOLOR.set(
 selectedPoint === board[i] ? GOAL_COLOR : FLOOR_COLOR,
 );
 }
 else if (board[i].type === START_TYPE) {
 tempCOLOR.set(
 selectedPoint === board[i] ? START_COLOR : FLOOR_COLOR,
 );
 }
 else if (board[i].type === TEST_TYPE) {
 tempCOLOR.set(
 selectedPoint === board[i] ? TEST_COLOR : FLOOR_COLOR,
 );
 }
 else if (board[i].type === FLOOR_TYPE) {
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

 const _mouseClickHook = ({board, selectedPoint, onSelectPoint}) => {
  const onMouseDownHandler = useRef([0, 0]);   // Record and maintain the handler for the mouse down event
  const onMouseUpHandler   = useRef([0, 0]);   // Record and maintain the handler for the mouse up event
  const onMouseMoveHandler = useRef([0, 0]);   // Record and maintain the handler for the mouse move event

  //  Pointer Click Down Position
  const setDownPointerCoord = event => {
    onMouseDownHandler.current[0] = event.clientX;  // Mouseclick x coordinate
    onMouseDownHandler.current[1] = event.clientY;  // Mouseclick y coordinate
  };

  //
  //If the mouse has clicked on a point, if that point is occupied by an
  //interactable object, gather its reference.
  //
  const getClickTarget = event => {
    const {instanceId, clientX, clientY} = event;
    const travelDistance                 = Math.sqrt(
        Math.pow(onMouseDownHandler.current[0] - clientX, 2)
        +
        Math.pow(onMouseDownHandler.current[1] - clientY, 2),
    );

    // Prevents repeat calls to click handler unless drag selection is initiated.
    if (travelDistance > 50) {
      if (!useDrag) {
     }
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
*/