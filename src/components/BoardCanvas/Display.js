import React, {useState, useRef, useEffect} from 'react';
import Board                                           from './Board';
import Navigation                                      from '../Page/partial/Navbar/Navigation';
import './display.css';
// import {useBinaryTreeCreation}                         from '../Algorithms/Maze/Generation/BinaryTreeCreation';
import {Strategy}                                      from '../Strategy/Strategy';

/*

 This is the main display of the game/visual demonstration.
 It contains the board, board control interface, orbital(camera)/Input interface,
 the game control interface, and the navigation bar.

 "The Mediator"
 or a psudo
 "Layers Pattern"

 */
export default function Display() {
  const [layoutType, setLayout]                     = useState('none');
  const [mazeType, setMazeType]                     = useState('none');
  const [solving, setSolving]                       = useState(false);
  const [selectedPoint, setSelectedPoint]           = useState(null);
  const [selectedGoalPoint, setSelectedGoalPoint]   = useState(null);
  const [selectedStartPoint, setSelectedStartPoint] = useState(null);

  const board                                       = new Array(3844).fill(0).map(
      // const board                                       = new Array(1000).fill(0).map(
      // (i, id, type: string = '_floor_', visited: Boolean = false, x: Number, y: Number ) => ({id, type, visited}));
      // (i, id, type: string = '_floor_', visited: Boolean = false, x: Number, y: Number ) => ({x, y} ({id, type, visited})));
      (i, id: number, type: string = '_wall_', sourceType: string = '_wall_', targetType: string = '_wall_', visited: boolean = false, x: number, y: number) => ({x, y, id, type, visited, sourceType, targetType}));

  const boardRef = useRef(); // Mutable(Persistant) board reference object.

  const handleResetCamera    = () => {
    boardRef.current.resetCamera();
  };
  const handleResetBoard     = () => {
    boardRef.current.resetBoard();
  };
  const handleMazeGeneration = (Strategy) => {
    boardRef.current.generateMaze(Strategy);
  };

  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  });

  return (
      <>
        <Navigation themeToggle = {true}/>
        <div className = "display-container">

          <Board
              ref = {boardRef}
              board = {board}
              layoutType = {layoutType}
              mazeType = {mazeType}
              selectedPoint = {selectedPoint}
              onSelectPoint = {setSelectedPoint}
          />
          <div className = "point-desc">
            {selectedPoint && (
                <p>Cell:
                   #<span className = "point-select">{selectedPoint.id}</span>
                </p>
            )}
          </div>

          <div className = "control-group-one">
            <h2 className = "control-header">Display <br/> Strategy</h2>
            <button
                onClick = {() => setLayout('standard')}
                className = {layoutType === 'standard' ? 'active' : undefined}
            >
              Standard Grid
            </button>
            <button className = "reset-button" onClick = {handleResetCamera}>
              View Reset
            </button>
          </div>

          <div className = "control-group-two">
            <h2 className = "control-header">Generate Maze</h2>
            <div className = "maze-toggle-group">
              <button
                  onClick = {() => {
                    if (mazeType === 'none') {
                      setMazeType('binaryTree');
                    }
                  }}
                  className = {`maze-toggle ${mazeType !== 'none' ? 'active' : undefined}`}
              >
                ON
              </button>

              <button
                  onClick = {() => setMazeType('none')}
                  className = {`maze-toggle ${mazeType === 'none' ? 'active' : undefined}`}
              >
                OFF
              </button>
              <button className = "maze-toggle" onClick = {handleResetBoard}>
                Reset
              </button>
            </div>
            <button
                onClick = {() => setMazeType('binaryTree')}
                className = {mazeType === 'binaryTree' ? 'active' : undefined}
            >
              Binary Tree
            </button>
            <button
                onClick = {() => setMazeType('growingTree')}
                className = {mazeType === 'growingTree' ? 'active' : undefined}
            >
              Growing Tree
            </button>
            <button
                onClick = {() => setMazeType('bfs')}
                className = {mazeType === 'bfs' ? 'active' : undefined}
            >
              Breath First Search
            </button>
          </div>
        </div>
        <div className = "solve-toggle-group">
          <h2 className = "control-header">Solving Pattern</h2>
          <button
              onClick = {() => {
                if (solving === false) {
                  setSolving(true);
                }
              }}
              className = {`solve-toggle ${solving === true ? 'active' : undefined}`}
          >
            SOLVE
          </button>
        </div>

      </>
  );
}
