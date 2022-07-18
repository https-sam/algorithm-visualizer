import React, {Component, useState, useRef, useEffect} from 'react';
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
  const [layoutType, setLayout]                     = useState('standard');
  const [mazeType, setMazeType]                    = useState("_none_");
  const [selectedPoint, setSelectedPoint]           = useState(null);
  const [selectedGoalPoint, setSelectedGoalPoint]   = useState(null);
  const [selectedStartPoint, setSelectedStartPoint] = useState(null);
  // const board                                       = new Array(10000).fill(0).map(
  const board                                       = new Array(3844).fill(0).map(
      // (i, id, type: string = '_floor_', visited: Boolean = false, x: Number, y: Number ) => ({id, type, visited}));
      // (i, id, type: string = '_floor_', visited: Boolean = false, x: Number, y: Number ) => ({x, y} ({id, type, visited})));
      (i, id: number, type: String = '_wall_', sourceType: String = '_wall_', targetType: String = '_wall_', visited: Boolean = false, x: number, y: number ) => ({x, y, id, type, visited, sourceType, targetType}));

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
    // SG 07/17/2022 23:32  theme initially set to dark
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  })

  return (
      <>
        <Navigation themeToggle={true}/>
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
            {/* <button */}
            {/*     onClick = {() => setLayout('circular')} */}
            {/*     className = {layoutType === 'circular' ? 'active' : undefined} */}
            {/* > */}
            {/*   Circular */}
            {/* </button> */}

            <button className = "reset-button" onClick = {handleResetCamera}>
              View Reset
            </button>
          </div>

          <div className = "control-group-two">
            <h2 className = "control-header">Generate Maze</h2>
            <div className = "maze-toggle-group" >
              <button
                  onClick = {() => {
                    if (mazeType === '_none_') {
                      setMazeType('_BinaryTree_');
                    }
                  }}
                  className = {`maze-toggle ${mazeType !== '_none_' ? 'active' : undefined}`}
              >
                ON
              </button>

            <button
                onClick = {() => setMazeType('_none_')}
                className = {`maze-toggle ${mazeType === '_none_' ? 'active' : undefined}`}
            >
              OFF
            </button>

            </div>
            <button
                onClick = {() => setMazeType('_BinaryTree_')}
                className = {mazeType === '_BinaryTree_' ? 'active' : undefined}
            >
              Binary Tree
            </button>
            <button
                onClick = {() => setMazeType('_GrowingTree_')}
                className = {mazeType === '_GrowingTree_' ? 'active' : undefined}
            >
              Growing Tree
            </button>
            <button
                onClick = {() => setMazeType('_BFS_')}
                className = {mazeType === '_BFS_' ? 'active' : undefined}
            >
              Breath First Search
            </button>
            <button className = "reset-button" onClick = {handleResetBoard}>
              Board Reset
            </button>
          </div>
        </div>
      </>
  );
}
