import React, {Component, useState, useRef} from 'react';
import Board                                from '../BoardCanvas/Board';
import Navigation                           from '../Page/partial/Navbar/Navigation';
import './display.css';

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
  const [selectedPoint, setSelectedPoint]           = useState(null);
  const [selectedGoalPoint, setSelectedGoalPoint]   = useState(null);
  const [selectedStartPoint, setSelectedStartPoint] = useState(null);
  // const board                                       = new Array(10000).fill(0).map(
  const board                                       = new Array(3844).fill(0).map(
      (i, id, type: string = '_wall_', visited: boolean = false) => ({id, type, visited}));

  const boardRef = useRef(); // Mutable(Persistant) board reference object.

  const handleResetCamera = () => {
    boardRef.current.resetCamera();
  };
  const handleResetBoard  = () => {
    boardRef.current.resetBoard();
  };


  return (
      <>
        <Navigation/>
        <div className = "display-container">

          <Board
              ref = {boardRef}
              board = {board}
              layoutType = {layoutType}
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
              Grid
            </button>
            <button
                onClick = {() => setLayout('circular')}
                className = {layoutType === 'circular' ? 'active' : undefined}
            >
              Circular
            </button>

            <button className = "reset-button" onClick = {handleResetCamera}>
              View Reset
            </button>
          </div>

          <div className = "control-group-two">
            <h2 className = "control-header">Control</h2>
            <button

            >

            </button>
            <button

            >

            </button>

            <button className = "reset-button" onClick = {handleResetCamera}>
              Settings Reset
            </button>
          </div>
        </div>
      </>
  );
}
