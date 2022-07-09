import './main-canvas.css';
import React, { Component } from 'react'
import { InputHandler } from '../InputHandler/InputHandler';
import SelectionSort from '../Strategy/Algorithms/SelectionSort';
import { Strategy } from '../Strategy/Strategy';
import { Canvas } from './Canvas';
import { InputField } from './InputField';
import { Options } from './options/Options';
import { CONSTANTS } from '../../config'

class MainCanvas extends Component {
  constructor(props) {
    super(props);
    this.InputHandler = new InputHandler();
    this.state = { 
      generatedArray: InputHandler.getGeneratedArray,
      inputArrayLength: InputHandler.getGeneratedArray.length,
      options: {
        showAdvancedOptions: false,
        processingColor: CONSTANTS.PROCESSING[0],
        defaultBarColor: CONSTANTS.DEFAULT[0],
        sortedBarColor: CONSTANTS.SORTED[0],
        currentMinBarColor: CONSTANTS.CURRENT_MIN[0]
      }
    };
    this.selectionSort = new SelectionSort(); 
    this.Strategy = new Strategy().setStrategy = this.selectionSort;
    Strategy.setTargetArray = this.state.generatedArray;
  }


  render() {
    const {options} = this.state;

    return (
      <>
        <InputField name = {['generic-input', 'instructions']} InputHandler = {this}/>
        <Canvas generatedArray={this.state.generatedArray} barColor={options.defaultBarColor}/>
        {this.state.generatedArray.length >= 1 && 
          <div className="">
            <div className="">
              <button onClick={async () => { // SG 07/08/2022 15:03  start sorting using whatever algorithm assigned to Strategy
                this.selectionSort.setOptions = this.state.options;
                await this.Strategy.perform(options);  
              }}>Selection Sort</button>
            </div>
          </div>
        } 
      </>
    )
  }
}



export default MainCanvas;