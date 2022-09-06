import * as React from "react";
import { forwardRef, useRef } from "react";
import { Canvas } from "react-three-fiber";
import {
  default as Controls,
  default as OrbitControls,
} from "../OrbitControls";
import Dice from "./Dice";

export const Chest = (
  { die, solving, algorithm, layoutType, selectedDie, onSelectDie },
  ref
) => {
  const controlsRef = useRef(OrbitControls);
  //
  //
  // useImperativeHandle(ref, () => ({
  //   resetCamera: () => {
  //     return controlsRef.current.resetCamera();
  //   },
  //
  //   zoomIn: () => {
  //     return controlsRef.current.withTargetZoomIn();
  //   },
  //
  //   zoomOut: () => {
  //     return controlsRef.current.withTargetZoomOut();
  //   },
  //
  // }));
  //
  //
  return (
    <Canvas>
      <Controls ref={controlsRef} selectedPoint={selectedDie} />

      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Dice
        die={die}
        solving={solving}
        algorithm={algorithm}
        layoutType={layoutType}
        selectedDie={selectedDie}
        onSelectDie={onSelectDie}
      />
    </Canvas>
  );
};

export default forwardRef(Chest);
