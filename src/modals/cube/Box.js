import React, {useRef, useState} from 'react';
import {Canvas, useFrame}        from '@react-three/fiber';



export default function Box(fArgs) {
  const size                = fArgs.size;
  const mesh                = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // const HOTPINK   = new THREE.Color(0xFF00FF);
  // const YELLOW    = new THREE.Color(0xFFFF00);
  // const WHITE     = new THREE.Color(0xFFFFFF);
  // const BLACK     = new THREE.Color(0x000000);
  // const ROYALBLUE = new THREE.Color(0x4169E1);

  // useFrame();
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => (this.mesh.current.rotation.x += 0.01))

  return (
      <mesh {...fArgs} ref = {mesh} scale = {active ? 1.5 : size}
            onClick = {(event) => setActive(!active)}
            onPointerOver = {(event) => setHover(true)}
            onPointerOut = {(event) => setHover(false)}>
        <boxGeometry args = {[1, 1, 1]}/>
        <meshBasicMaterial color = {hovered ? 'hotpink' : 'royalblue'}/>
      </mesh>
  );
}

