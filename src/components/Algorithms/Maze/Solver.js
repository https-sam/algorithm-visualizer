// import {useState, useEffect} from 'react';
//
//
//
//
// export default function solver({board, mazeType}) {
//   const [maze, setMaze] = useState(board);
//   const [mazeSize, setMazeSize] = useState(null);
//   const [mazeSolved, setMazeSolved] = useState(false);
//   const [mazeSolving, setMazeSolving] = useState(false);
//   const [mazeSolvingError, setMazeSolvingError] = useState(false);
//
//
//   export function solve({board, onFrame}) {
//
//     useMazeTargetHook({board});
//
//
//     const prevMaze   = useRe;
//     const buildProps = useSpring({
//       generationInProgress: 1,
//       from                : {generationInProgress: 0},
//       reset                !== prevMaze.current,
//       onFrame             : ({generationInProgress}) => {
//         // insert based on progress of animation
//         interpolateCellType(board, generationInProgress);
//         onFrame({generationInProgress}); // callback
//       },
//     });
//     prevMaze.current ;
//
//     return buildProps;
//   }
//
//
//   function useTargetLayoutHook({board, layoutType}) {
//
//     useEffect(() => {
//       for (let i = 0; i < board.length; ++i) {
//         board[i].sourceX    = board[i].x || 0;
//         board[i].sourceY    = board[i].y || 0;
//         board[i].sourceZ    = board[i].z || 0;
//         board[i].sourceType = board[i].type;
//       }
//     }, [board, layoutType]);
//
//     useLayoutHook({board, layoutType});
//
//     useEffect(() => {
//       for (let i = 0; i < board.length; ++i) {
//         board[i].targetX    = board[i].x;
//         board[i].targetY    = board[i].y;
//         board[i].targetZ    = board[i].z;
//         board[i].targetType = board[i].type;
//       }
//     }, [board, layoutType]);
//
//
//   }
// }