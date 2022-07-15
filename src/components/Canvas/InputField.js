import React, { Component } from 'react'
import { InputHandler } from '../InputHandler/InputHandler.js'
import { Strategy } from '../Strategy/Strategy.js';
import { Options } from './options/Options.js';
import { ReactComponent as Play } from '../../img/play.svg'
import { ReactComponent as Replay } from '../../img/replay.svg'
import AlgorithmSelection from './AlgorithmSelection.js';
import ShowValue from './ShowValue.js';



class InputField extends Component {

  constructor(props) {
    super(props);
    this.InputHandler = new InputHandler();
    this.name         = props.name;
    this.Strategy = new Strategy();
    this.state = {
      algorithm:  localStorage.getItem("algorithm") || 'Radix',
    }
  }

  displayErrorMessage() {
    if(this.props.InputHandler.state.inputArrayLength < 2) {
      document.getElementById('sort-canvas-error-msg').innerHTML ="Array size shuold at least be 2" 
      return false;   
    }

    document.getElementById('sort-canvas-error-msg').innerHTML = '';
    return true;
  }

  scrollDown() {
    if(this.displayErrorMessage()) {
      window.scroll({ // SG 07/10/2022 18:55  for mobile devices 
        top: 1000,
        behavior: 'smooth'
      });
      return true;
    } else {
      return false;
    }
  }

  render() {
    const {inputArrayLength, options} = this.props.InputHandler.state;
    const { algorithm } = this.state;
    const { inputArray, generatedArray } = this.props;

    return (
      <div className="flex flex-col dark:bg-darkGray bg-gray-100 shadow-lg shadow-gray-200" id="input-field-sort">

        <div className={`flex items-center justify-center py-4 md:py-1 w-sreen gap-4 flex-wrap ${this.name[0] + ' '}`}>  
                       
          <div className="flex flex-col justify-center items-center h-full sm:mb-0 pl-6" >
            <div className="flex">
              <input placeholder={`Array size (MAX ${InputHandler.getAllowedMaxInputSize()})`} value={inputArrayLength === 0 ? '' : inputArrayLength} onChange={(e) => {
                // SG 07/07/2022 21:03  Input validation, only accepts a number that is less than the allowed array size
                (Number(e.target.value) || !e.target.value) 
                  && (e.target.value <= InputHandler.getAllowedMaxInputSize()) 
                    ? this.props.InputHandler.setState({inputArrayLength: e.target.value.replace(/\D/g, '')}) 
                    : this.props.InputHandler.setState({inputArrayLength: InputHandler.getAllowedMaxInputSize()})
                }}
                className="outline-none placeholder:text-[.95em] text-[1em] bg-gray-200 px-2 dark:bg-gray-600 text-gray-700 dark:text-gray-100 rounded-md text-center font-semibold w-[50%] sm:w-100"
                maximum={InputHandler.getAllowedMaxInputSize()}
              />
              <button onClick={() => { 
                  if(this.scrollDown()) {
                    this.props.InputHandler.setState({generatedArray: InputHandler.handleInputRequest(inputArrayLength)});
                  }
              }} className=" p-[.7em] text-[.92em] ml-3 rounded-md text-white font-semibold hover:scale-[1.02] hover:bg-lightGreen transition duration-200 ease-in-out dark:bg-lightBlue2 bg-lightGreen dark:text-white hover:shadow-custom-md-blue dark:hover:shadow-custom-md-lightBlue">Generate Array</button>
            </div>
          </div>
          
          
          <div className="flex gap-5 md:gap-10 flex-wrap justify-center items-center">

          <Options options={this.props.InputHandler} algorithm={algorithm}/> 

            <div className="flex self-center gap-3 justify-center items-center">
              <AlgorithmSelection strategy={this.Strategy} options={this}/>
              <div onClick={async () => { 
                console.log(generatedArray);
                  if(generatedArray.length === 0){
                    document.getElementById('sort-canvas-error-msg').innerHTML ="Please enter an array size first." 
                  } else {
                    this.scrollDown();
                    this.Strategy.setOptions = options;
                    this.Strategy.perform(options, inputArray);
                    localStorage.setItem('options', JSON.stringify(options));
                  } 
                }
              } className={`relative w-[3.2em] h-[2.6em] p-3 group rounded-lg flex ${this.state.algorithm && inputArrayLength ? "dark:bg-lightBlue2 bg-lightGreen cursor-pointer hover:shadow-custom-md-blue dark:hover:shadow-custom-md-lightBlue  transition-all duration-200 ease-in-out" : "bg-gray-600 cursor-not-allowed"}`}>
                <Play className={`absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] scale-[1.1] mr-auto ml-auto transition-all duration-200 ease-in-out ${this.state.algorithm && "group-hover:scale-[1.2]"}`}/>
              </div>
              

              <div className="self-center group">
                <div onClick={() => { //TODO need to make sure to kill setTimeout
                    if(this.scrollDown()) {
                      this.props.InputHandler.setState({generatedArray: InputHandler.handleInputRequest(inputArrayLength)});
                    }
                  }} className={`p-3 w-[3.2em] group h-[2.6em] rounded-lg flex ${this.state.algorithm && inputArrayLength? "dark:bg-lightBlue2 bg-lightGreen cursor-pointer hover:shadow-custom-md-blue dark:hover:shadow-custom-md-lightBlue" : "bg-gray-600 cursor-not-allowed"} relative`}>
                  <Replay className={` ${this.state.algorithm && inputArrayLength && "group-hover:rotate-[330deg]"} scale-[.9] absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] transition-all duration-200 ease-out`}/>
                </div>
              </div>
              <ShowValue mainCanvasInputHandler={this.props.InputHandler} inputArrayLength={inputArrayLength}/>    
            </div>
          </div>
        </div>
      </div>
    )
  }
}



export {InputField};