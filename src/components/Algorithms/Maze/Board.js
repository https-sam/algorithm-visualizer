import * as React from "react";
// import {useFrame /*useFrame*/}                   from '@react-three/fiber';
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Canvas } from "react-three-fiber";
import {
  default as Controls,
  default as OrbitControls,
} from "../OrbitControls";
import Cells from "./Cells";

export const Board = (
  {
    board,
    solving,
    algorithm,
    layoutType,
    selectedPoint,
    onSelectPoint,
    mazeType,
  },
  ref
) => {
  // Based on Peter Beshai's grid example:
  const controlsRef = useRef(OrbitControls);

  useImperativeHandle(ref, () => ({
    resetCamera: () => {
      return controlsRef.current.resetCamera();
    },
  }));

  return (
    <Canvas>
      <Controls ref={controlsRef} selectedPoint={selectedPoint} />
      <mesh>
        {" "}
        {/* BorderBox */}
        <boxBufferGeometry attach="geometry" args={[80, 80, -10]} />
        <meshBasicMaterial attach="material" color="black" />
      </mesh>

      <ambientLight color="white" intensity={0.1} />
      <hemisphereLight
        color="#ffffff"
        skyColor="#ffffbb"
        groundColor="#080820"
        intensity={1.0}
      />
      <Cells
        board={board}
        layoutType={layoutType}
        mazeType={mazeType}
        solving={solving}
        algorithm={algorithm}
        selectedPoint={selectedPoint}
        onSelectPoint={onSelectPoint}
      />
      {/*<Effects />*/}
    </Canvas>
  );
};

export default forwardRef(Board);
