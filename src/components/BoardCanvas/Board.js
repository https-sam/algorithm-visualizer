import * as React                      from 'react';
import {Canvas, useFrame /*useFrame*/} from 'react-three-fiber';
import Controls                        from './OrbitControls';
import Cell                                      from './Cells';
import {useImperativeHandle, useRef, forwardRef} from 'react';
import {TrackballControls}                       from 'three/examples/jsm/controls/TrackballControls';
import OrbitControls                             from './OrbitControls';
// import create                                    from 'zustand';

// const useStore = create((set) => ({target: null, setTarget: (target) => set({target})}));

export const Board = ({board, layoutType, selectedPoint, onSelectPoint}, ref) => {
  const controlsRef = useRef(OrbitControls);
  // const borderRef = new BorderBox(layoutType.width, layoutType.height, layoutType.depth);
  // const setTarget = useStore((state) => state.setTarget)

  useImperativeHandle(ref, () => ({
    resetCamera: () => {
      return controlsRef.current.resetCamera();
    },

    // setTarget: (target) => {
    //   console.log('ZOOOooom: ' + target.position);
    //   return controlsRef.current.setCurrentTarget(target);
    // },
  }));

  // useFrame(({ camera }) => {
  //   ref.current.position.copy(camera.position);
  //   ref.current.quaternion.copy(camera.quaternion);
  //
  //   // Apply offset
  //   ref.current.translateZ(-5);
  // });


  return (
      <Canvas className = "board" camera = {{position: [0, 0, 80], far: 1000}}>
        {/*<PerspectiveCamera position={[2, 2, 2]} makeDefault />*/}
        <Controls ref = {controlsRef} selectedPoint={selectedPoint}/>
        {/* <instancedMesh> */}
        <mesh>  {/* BorderBox */}
          {(layoutType === 'standard') ?
           <boxBufferGeometry attach = "geometry" args = {[110, 110, -10]}/>
                                   :
           <boxBufferGeometry attach = "geometry" args = {[180, 180, -10]}/>
          }
          <meshBasicMaterial attach = "material" color = "black"/>
        </mesh>


        <ambientLight color = "white" intensity = {0.1}/>
        <hemisphereLight
            color = "#ffffff"
            skyColor = "#ffffbb"
            groundColor = "black"
            intensity = {1.0}
        />
        <Cell
            board = {board}
            layoutType = {layoutType}
            selectedPoint = {selectedPoint}
            onSelectPoint = {onSelectPoint}
        />
        {/*<Effects />*/}
      </Canvas>
  );
};

export default forwardRef(Board);
