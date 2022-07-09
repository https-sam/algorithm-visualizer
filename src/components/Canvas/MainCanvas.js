import React, {Component} from 'react';
import './main-canvas.css';
import {InputHandler}     from '../InputHandler/InputHandler';
import {Canvas}           from './Canvas';
import {InputField}       from './InputField';



class MainCanvas extends Component {
  constructor(props) {
    super(props);
    this.InputHandler = new InputHandler();
    this.state        = {
      inputArrayLength: '',
      generatedArray  : InputHandler.getGeneratedArray,
    };
  }


  render() {
    return (
        <>
          <div className = "w-full flex justify-center mt-[4em]">
            <InputField name={["generic-input", "instructions"]} InputHandler = {this}/>
            <Canvas generatedArray = {this.state.generatedArray}/>
          </div>
        </>
    );
  }
}



export default MainCanvas;