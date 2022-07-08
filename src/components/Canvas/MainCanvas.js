import React, { Component } from 'react'
import { InputHandler } from '../InputHandler/InputHandler';
import { Canvas } from './Canvas';
import { InputField } from './InputField';


class MainCanvas extends Component {
  constructor(props) {
    super(props);
    this.InputHandler = new InputHandler();
    this.state = { 
      inputArrayLength: '',
      generatedArray: InputHandler.getGeneratedArray,
    }
  }

  render() {
    return (
      <>
        <InputField InputHandler={this}/>
        <Canvas generatedArray={this.state.generatedArray}/>
      </>
    )
  }
}


export default MainCanvas