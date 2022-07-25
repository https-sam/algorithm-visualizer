import * as React                                                     from 'react';
// import {extend, useThree, useFrame}                                   from '@react-three/fiber';
import {extend, useThree, useFrame}                                   from 'react-three-fiber';
import {TrackballControls}                                            from 'three/examples/jsm/controls/TrackballControls';
import * as Three                                                     from 'three';
import {forwardRef, useRef, useImperativeHandle, useEffect, useState} from 'react';


extend({TrackballControls});


const OrbitControls = ({board, selectedPoint, onSelectedPoint}, ref) => {
  // Based on Peter Beshai's grid example:
  const controls            = useRef();
  const [target, setTarget] = useState(null);
  const {camera, gl}        = useThree();
  const {setDefaultCamera}  = useThree();

  //  Set up the camera on mount.
  useEffect(() => {
    camera.position.set(0, -10, 50);  // Initial camera position
    camera.lookAt(0, -10, 50);
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
  useImperativeHandle(ref, () => ({
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
      // reset look-at (target) and camera position
      controls.current.target.set(0, 0, 0);
      camera.position.set(0, 0, 80);

      // needed for trackball controls, reset the up vector
      camera.up.set(
          controls.current.up0.x,
          controls.current.up0.y,
          controls.current.up0.z
      );
    },
    // resetCamera: () => {
    //   camera.position.set(0, -10, 50);      // reset position
    //   camera.lookAt(0, 0, 0);            // reset rotation
    //   this.setTarget(null);                    // reset target
    // },


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
          rotationLock = {[
            true, // orbit
            true, // zoom
            true, // pan
          ]}
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


