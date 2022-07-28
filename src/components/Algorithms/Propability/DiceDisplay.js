import React, {useState, useRef} from 'react';
import Navigation                           from '../../Page/partial/Navbar/Navigation';
import {Chest}                              from './Chest';
import './diceDisplay.css';




const die = new Array(10).fill(0).map((_, i) => new Array(10).fill(0).map((_, j) => ({x: i, y: j})));
export default function DiceDisplay() {
  const [layoutType, setLayout]       = useState('container');
  const [selectedDie, setSelectedDie] = useState(null);
  const [dice, setDice]               = useState([]);
  const [diceCount, setDiceCount]     = useState(0);
  const [diceSize, setDiceSize]       = useState(0);
  const [diceColor, setDiceColor]     = useState(0);
  const [diceShape, setDiceShape]     = useState(0);

  const dieRef            = useRef(); // Mutable(Persistant) die reference object.
  const handleResetCamera = () => {
    dieRef.current.resetCamera();
  };
  const handleResetBoard  = () => {
    dieRef.current.resetBoard();
  };

  const handleLayoutChange = (e) => {
    setLayout(e.target.value);
  };

  const handleSelectedPointChange = (e) => {
    setSelectedDie(e.target.value);
  };

  const handleDiceChange = (e) => {
    setDice(e.target.value);
  };

  const handleDiceCountChange = (e) => {
    setDiceCount(e.target.value);
  };

  const handleDiceSizeChange = (e) => {
    setDiceSize(e.target.value);
  };

  const handleDiceColorChange = (e) => {
    setDiceColor(e.target.value);
  };

  const handleDiceShapeChange = (e) => {
    setDiceShape(e.target.value);
  };

  const addDice = () => {
    setDice([
      ...dice, {
        count: diceCount,
        size : diceSize,
        color: diceColor,
        shape: diceShape,
      }]);
  };

  const removeDice = () => {
    setDice(dice.slice(0, dice.length - 1));
  };

  const rollDice = () => {
    setDice(dice.map(d => ({...d, count: Math.floor(Math.random() * 6) + 1})));
  };


  return (
      <>
        <Navigation themeToggle = {true}/>
        <div className = "display-container">

          <Chest
              ref = {dieRef}
              die = {die}
              layoutType = {layoutType}
              selectedDie = {selectedDie}
              onSelectDie = {setSelectedDie}
          />
          <div className = "point-desc">
            {selectedDie && (
                <p>
                  Cell: #<span className = "point-select">{selectedDie.id}</span>
                </p>
            )}
          </div>

          <div className = "control-group-one">
            <h2 className = "control-header">Display <br/> Strategy</h2>
            <button
                onClick = {() => setLayout('Probability')}
                className = {layoutType === 'Probability' ? 'active' : undefined}
            >
              Probability
            </button>

            <button className = "reset-button" onClick = {handleResetCamera}>
              View Reset
            </button>
          </div>

          <div>
            <h1>Dice</h1>
            <div>
              <label>Dice Count:</label>
              <input type = "number" value = {diceCount} onChange = {handleDiceCountChange}/>
            </div>
            <div>
              <label>Dice Size:</label>
              <input type = "number" value = {diceSize} onChange = {handleDiceSizeChange}/>
            </div>
            <div>
              <label>Dice Color:</label>
              <input type = "text" value = {diceColor} onChange = {handleDiceColorChange}/>
            </div>
            <div>
              <label>Dice Shape:</label>
              <input type = "text" value = {diceShape} onChange = {handleDiceShapeChange}/>
            </div>
            <div>
              <button onClick = {addDice}>Add Dice</button>
              <button onClick = {removeDice}>Remove Dice</button>
              <button onClick = {rollDice}>Roll Dice</button>
              <div>
                {dice.map((dice, index) => {
                      return (
                          <div key = {index}>
                            <p>{dice}</p>
                          </div>
                      );
                    },
                )}
              </div>
            </div>
          </div>
        </div>
      </>
  );
}


