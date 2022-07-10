import './main-canvas.css';
import React, { Component } from 'react'
import { InputHandler } from '../InputHandler/InputHandler';
import SelectionSort from '../Strategy/Algorithms/SelectionSort';
import { Strategy } from '../Strategy/Strategy';
import { Canvas } from './Canvas';
import { InputField } from './InputField';
import { Options }   from './options/Options';
import { CONSTANTS } from '../../Utility/config'

class MainCanvas extends Component {
  constructor(props) {
    super(props);
    this.InputHandler = new InputHandler();
    this.state = { 
      generatedArray: InputHandler.getGeneratedArray,
      inputArrayLength: InputHandler.getGeneratedArray.length,
      options: {
        delay: 4,
        skipJ: false,
        processingColor: CONSTANTS.PROCESSING[0],
        defaultBarColor: CONSTANTS.DEFAULT[0],
        sortedBarColor: CONSTANTS.SORTED[0],
        currentMinBarColor: CONSTANTS.CURRENT_MIN[0]
      }
    };
  }


  render() {
    const {options} = this.state;
    console.log(options);
    return (
      <>
        <InputField name = {['generic-input', 'instructions']} InputHandler={this}/>
        <Canvas generatedArray={this.state.generatedArray} barColor={options.defaultBarColor}/>
      </>
    )
  }
}



export default MainCanvas;