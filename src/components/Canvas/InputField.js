import React, { Component } from 'react'
import { InputHandler } from '../InputHandler/InputHandler.js'

class InputField extends Component {

  constructor(props) {
    super(props);
   
  }


  render() {
    const { inputArrayLength } = this.props.InputHandler.state;


    return (
      <div className="flex flex-col items-center justify-center">
        <p className="text-gray-700 mb-5">Array size should not exceed {InputHandler.getAllowedMaxInputSize()}.</p>
        <div className="flex">
          <input placeholder="Enter array size" value={inputArrayLength} onChange={(e) => {
            (Number(e.target.value) || !e.target.value) 
              && (e.target.value <= InputHandler.getAllowedMaxInputSize()) 
                ? this.props.InputHandler.setState({inputArrayLength: e.target.value.replace(/\D/g, '')}) 
                : this.props.InputHandler.setState({inputArrayLength: InputHandler.getAllowedMaxInputSize()})
            }}
            className=" bg-gray-200 rounded-md text-center p-2 font-medium"
            maximum={InputHandler.getAllowedMaxInputSize()}
          />
          <button onClick={() => { 
            this.props.InputHandler.setState({generatedArray: InputHandler.handleInputRequest(inputArrayLength)});
          }} className="bg-blue-300 p-2 ml-3 rounded-md text-white font-medium hover:scale-[1.02] hover:bg-blue-400 transition duration-200 ease-in-out">Generate Array</button>
        </div>
      </div>
    )
  }
}

export { InputField };