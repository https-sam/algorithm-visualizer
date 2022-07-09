import React, { Component } from 'react'
import { InputHandler } from '../InputHandler/InputHandler.js'
import { Options } from './options/Options.js';

class InputField extends Component {

  constructor(props) {
    super(props);
    this.InputHandler = new InputHandler();
    this.name         = props.name;
  }


  render() {
    const {inputArrayLength} = this.props.InputHandler.state;

    return (
      <div className={`flex items-center justify-around border-b p-3 w-sreen flex-wrap ${this.name[0] + ' '}`}>
        <div className="flex flex-col justify-center items-center h-full">
          <div className="flex">
            <input placeholder="Enter array size" value={inputArrayLength} onChange={(e) => {
              // SG 07/07/2022 21:03  Input validation, only accepts a number that is less than the allowed array size
              (Number(e.target.value) || !e.target.value) 
                && (e.target.value <= InputHandler.getAllowedMaxInputSize()) 
                  ? this.props.InputHandler.setState({inputArrayLength: e.target.value.replace(/\D/g, '')}) 
                  : this.props.InputHandler.setState({inputArrayLength: InputHandler.getAllowedMaxInputSize()})
              }} 
              className=" bg-gray-200 rounded-md text-center p-[.5em] font-medium"
              maximum={InputHandler.getAllowedMaxInputSize()}
            />
            <button onClick={() => { 
              this.props.InputHandler.setState({generatedArray: InputHandler.handleInputRequest(inputArrayLength)});
            }} className="bg-blue-300 p-2 ml-3 rounded-md text-white font-medium hover:scale-[1.02] hover:bg-blue-400 transition duration-200 ease-in-out">Generate Array</button>
          </div>
          <p className={`text-gray-700 mt-1 ${this.name[1] + ' '}`}>Array size should not exceed {InputHandler.getAllowedMaxInputSize()}.</p>
        </div>
        <Options options={this.props.InputHandler}/>
      </div>
    )
  }
}



export {InputField};