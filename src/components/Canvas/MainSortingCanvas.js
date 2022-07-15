import './main-canvas.css';
import React, { Component } from 'react'
import { InputHandler } from '../InputHandler/InputHandler';
import { Canvas } from './Canvas';
import { InputField } from './InputField';
import { CONSTANTS } from '../../Utility/config'
import Navigation from '../Page/partial/Navbar/Navigation';


class MainCanvas extends Component {
  constructor(props) {
    super(props);
    this.InputHandler = new InputHandler();
    this.state = { 
      generatedArray: InputHandler.getGeneratedArray,
      inputArrayLength: InputHandler.getGeneratedArray.length,
      options: { // SG 07/11/2022 12:36  load config from localStorage if exists
        delay: JSON.parse(localStorage.getItem('options'))?.delay || CONSTANTS.DELAY,
        skipJ: JSON.parse(localStorage.getItem('options'))?.skipJ || false,
        processingColor: JSON.parse(localStorage.getItem('options'))?.processingColor || CONSTANTS.PROCESSING[0],
        defaultBarColor: JSON.parse(localStorage.getItem('options'))?.defaultBarColor || localStorage.getItem('theme') === "dark" && 'white' || CONSTANTS.DEFAULT[0] ,
        sortedBarColor:  JSON.parse(localStorage.getItem('options'))?.sortedBarColor || CONSTANTS.SORTED[0],
        currentMinBarColor: JSON.parse(localStorage.getItem('options'))?.currentMinBarColor || CONSTANTS.CURRENT_MIN[0],
        showHeight: JSON.parse(localStorage.getItem('options'))?.showHeight || false
      }
    };
  }


  render() {
    const { options, generatedArray } = this.state;
    
    return (
      <>
        <Navigation/>
        <InputField name = {['generic-input', 'instructions']} InputHandler={this} inputArray={generatedArray}/>
        <Canvas defaultBarColor={this.state.options.defaultBarColor} showHeight={this.state.options.showHeight} generatedArray={this.state.generatedArray} barColor={options.defaultBarColor} InputHandler={this}/>
      </>
    )
  }
}



export default MainCanvas;