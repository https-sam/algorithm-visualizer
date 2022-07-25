import * as React                                from 'react';
// import {useFrame /*useFrame*/}                   from '@react-three/fiber';
import {Canvas}                                  from 'react-three-fiber';
import Controls                                  from './OrbitControls';
import {useImperativeHandle, useRef, forwardRef} from 'react';
import {TrackballControls}                       from 'three/examples/jsm/controls/TrackballControls';
import OrbitControls                             from './OrbitControls';
import Cells                                     from './Cells';




export const Board = ({board, solving, algorithm, layoutType, selectedPoint, onSelectPoint, mazeType}, ref) => {
  const controlsRef = useRef(OrbitControls);


  useImperativeHandle(ref, () => ({
    resetCamera: () => {
      return controlsRef.current.resetCamera();
    },
  }));


  return (
      <Canvas>
        <Controls ref = {controlsRef} selectedPoint = {selectedPoint}/>
        <mesh>  {/* BorderBox */}
          <boxBufferGeometry attach = "geometry" args = {[80, 80, -10]}/>
          <meshBasicMaterial attach = "material" color = "black"/>
        </mesh>


        <ambientLight color = "white" intensity = {0.1}/>
        <hemisphereLight
            color = "#ffffff"
            skyColor = "#ffffbb"
            groundColor = "#080820"
            intensity = {1.0}
        />
        <Cells
            board = {board}
            layoutType = {layoutType}
            mazeType = {mazeType}
            solving={solving}
            algorithm={algorithm}
            selectedPoint = {selectedPoint}
            onSelectPoint = {onSelectPoint}
        />
        {/*<Effects />*/}
      </Canvas>
  );
};

export default forwardRef(Board);
