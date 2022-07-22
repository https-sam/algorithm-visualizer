// import {useMemo}         from 'react';
// import {BufferAttribute} from 'three';
//
//
//
//
// export function BufferPoints({numPoints, board, colors, sizes, ...props}) {
//   const points = useMemo(() => {
//     const positions = new Array(numPoints).fill(board).map((v) => (0.5 - Math.random()) * 7.5);
//     return new BufferAttribute(new Float32Array(p), 3);
//   }, [numPoints]);
//
//   return (
//       <points>
//         {/* <bufferGeometry> */}
//           {positions.map((position: {x, y, z}, id) => (
//               // <position key={i} value={p} />
//               <boxBufferGeometry key={id} position={position} />
//           ))}
//         {/* </bufferGeometry> */}
//         <pointsMaterial
//             size = {0.1}
//             threshold = {0.1}
//             color = {0xff00ff}
//             sizeAttenuation = {true}
//         />
//       </points>
//   );
// }