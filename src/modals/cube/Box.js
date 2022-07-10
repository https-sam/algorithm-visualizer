import React    from 'react';
import {Canvas} from 'react-three-fiber';


export default function Box({fArgs}) {
  return (
    <mesh {...fArgs}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color="hotpink" />
    </mesh>
  );
}

