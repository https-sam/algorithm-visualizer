import {useState} from 'react';




export default function useMaze({board, mazeType}) {
  const [maze, setMaze] = useState(board);
  const [mazeSize, setMazeSize] = useState(null);
  const [mazeSolved, setMazeSolved] = useState(false);
  const [mazeSolving, setMazeSolving] = useState(false);
  const [mazeSolvingError, setMazeSolvingError] = useState(false);

}