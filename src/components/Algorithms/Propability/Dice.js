import * as React                                                   from "react";
import {useEffect, useMemo, useRef, useState}                       from "react";
import {Color, MeshStandardMaterial, Object3D, TetrahedronGeometry} from "three";
// import {Tetrahedron}                                         from '@react-three/drei';

const tempOBJ   = new Object3D();
const tempCOLOR = new Color();


// transform mesh to world space
function update({mesh, board}) {
   for (let i = 0; i < board.length; ++i) {
      const {x, y, z} = board[i];
      tempOBJ.position.set(x, y, z);
      tempOBJ.rotation.set(0.5 * Math.PI, 0, 0); // Look at the origin
      tempOBJ.updateMatrix();
      mesh.setMatrixAt(i, tempOBJ.matrix);
   }
   mesh.instanceMatrix.needsUpdate = true; // Notify that the matrix array has changed
}


const useMouseClickHook = ({board, selectedDie, onSelectDie}) => {
   const onMouseDownHandler = useRef([0, 0]); // Record and maintain the handler for the mouse down event
   const onMouseUpHandler   = useRef([0, 0]); // Record and maintain the handler for the mouse up event
   const onMouseMoveHandler = useRef([0, 0]); // Record and maintain the handler for the mouse move event

   /*
    * Pointer Click Down Position
    */
   const setDownPointerCoord = (event) => {
      onMouseDownHandler.current[0] = event.clientX; // Mouseclick x coordinate
      onMouseDownHandler.current[1] = event.clientY; // Mouseclick y coordinate
   };

   /*
    * If the mouse has clicked on a point, if that point is occupied by an
    * interactable object, gather its reference.
    */
   const getClickTarget = (event) => {
      const {instanceId, clientX, clientY} = event;
      const travelDistance                 = Math.sqrt(
        Math.pow(onMouseDownHandler.current[0] - clientX, 2) +
        Math.pow(onMouseDownHandler.current[1] - clientY, 2)
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
      console.log("Point clicked: ", point);
      // toggle the point
      if (point === selectedDie) {
         onSelectDie(null);
      } else {
         onSelectDie(point);
      }
   };

   return {setDownPointerCoord, getClickTarget};
};

const Dice = ({
                 die,
                 count,
                 layoutType,
                 algorithm,
                 onSelectDie,
                 selectedDie,
              }) => {
   const meshRef             = useRef();
   const [active, setActive] = useState(false);
   const numDice             = useMemo(() => die.length, [die]);

   // useAnimationHook({
   //   board,
   //   algorithm,
   //   active,
   //   onFrame: () => {
   //     update({mesh: meshRef.current, board});
   //   },
   // });
   //
   //
   // useEffect(() => {
   //   if (!active) {
   //     update({mesh: meshRef.current, board});
   //   }
   // }, [board]);

   // const {getClickTarget, setDownPointerCoord} = useMouseClickHook({board, selectedDie, onSelectDie});

   return (
     <D4Die ref={meshRef} count={count} layoutType={layoutType} algorithm={algorithm} onSelectDie={onSelectDie} selectedDie={selectedDie}
     />
   );
};

const D4Die = (props) => {
   const dieRef   = props.ref;
   const tetraGeo = new TetrahedronGeometry(5, 0);
   const tetraMat = new MeshStandardMaterial({color: "indigo"});

   useEffect(() => {
      if (dieRef) {
         for (let i = 0; i < 4; i++) {
            dieRef.geometry.addGroup(i * 3, 3, i);
         }
      }
   });

   return <mesh ref={dieRef} geometry={tetraGeo} material={tetraMat}/>;
};

export default Dice;
