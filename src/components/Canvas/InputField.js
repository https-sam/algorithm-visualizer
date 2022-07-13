import React, { Component } from 'react'
import { InputHandler } from '../InputHandler/InputHandler.js'
import SelectionSort from '../Strategy/Algorithms/SelectionSort.js';
import { Strategy } from '../Strategy/Strategy.js';
import { Options } from './options/Options.js';
import { ReactComponent as Play } from '../../img/play.svg'
import { ReactComponent as Replay } from '../../img/replay.svg'
import { MergeSort } from '../Strategy/Algorithms/MergeSort.js';
import { RadixSortLSD } from '../Strategy/Algorithms/RadixSortLSD.js';
import AlgorithmSelection from './AlgorithmSelection.js';


class InputField extends Component {

  constructor(props) {
    super(props);
    this.InputHandler = new InputHandler();
    this.name         = props.name;
    this.Strategy = new Strategy();
    this.state = {
      algorithm:  localStorage.getItem("algorithm") || 'Radix'
    }
  }


  render() {
    const {inputArrayLength, options} = this.props.InputHandler.state;
    const { algorithm } = this.state;
    const { inputArray } = this.props;


    return (
      <div className="flex flex-col dark:bg-darkGray bg-gray-100 shadow-lg shadow-gray-200" id="input-field-sort">

        <div className={`flex items-center justify-center py-2 w-sreen gap-4 flex-wrap ${this.name[0] + ' '}`}>  
                       
          <div className="flex flex-col justify-center items-center h-full sm:mb-0 pl-6" >
            <div className="flex">
              <input placeholder={`Array size (MAX ${InputHandler.getAllowedMaxInputSize()})`} value={inputArrayLength === 0 ? '' : inputArrayLength} onChange={(e) => {
                // SG 07/07/2022 21:03  Input validation, only accepts a number that is less than the allowed array size
                (Number(e.target.value) || !e.target.value) 
                  && (e.target.value <= InputHandler.getAllowedMaxInputSize()) 
                    ? this.props.InputHandler.setState({inputArrayLength: e.target.value.replace(/\D/g, '')}) 
                    : this.props.InputHandler.setState({inputArrayLength: InputHandler.getAllowedMaxInputSize()})
                }} 
                className=" bg-gray-200 dark:bg-gray-200 text-gray-700 rounded-md text-center text-[1em] p-[.5em] font-semibold w-[50%] sm:w-100"
                maximum={InputHandler.getAllowedMaxInputSize()}
              />
              <button onClick={() => { 
                this.props.InputHandler.setState({generatedArray: InputHandler.handleInputRequest(inputArrayLength)});
              }} className="bg-blue-500 p-[.7em] ml-3 rounded-md text-white font-semibold hover:scale-[1.02] hover:bg-blue-600 transition duration-200 ease-in-out dark:bg-blue-600 dark:text-white">Generate Array</button>
            </div>
          </div>

          
          <div className="flex gap-5 md:gap-10 flex-wrap justify-center items-center">
            <Options options={this.props.InputHandler} algorithm={algorithm}/>          
            <div className="flex self-center gap-3">
              <AlgorithmSelection strategy={this.Strategy} options={this}/>
              <div onClick={async () => { 
                  if (this.state.algorithm && inputArrayLength) {
                    window.scroll({ // SG 07/10/2022 18:55  for mobile devices 
                      top: 1000,
                      behavior: 'smooth'
                    });
                    this.Strategy.setOptions = options;
                    await this.Strategy.perform(options, inputArray);
                    localStorage.setItem('options', JSON.stringify(options));
                  }                  
                }
              } className={`relative w-[3.2em] p-3 group rounded-lg flex ${this.state.algorithm && inputArrayLength ? "dark:bg-blue-600 bg-blue-500 cursor-pointer hover:shadow-custom-md-green  transition-all duration-200 ease-in-out" : "bg-gray-600 cursor-not-allowed"}`}>
                <Play className={`absolute left-0 right-0 mr-auto ml-auto scale-[1.15] transition-all duration-200 ease-in-out ${this.state.algorithm && "group-hover:scale-[1.25]"}`}/>
              </div>

              <div className="self-center group">
                <div onClick={() => { //TODO need to make sure to kill setTimeout
                    this.props.InputHandler.setState({generatedArray: InputHandler.handleInputRequest(inputArrayLength)});
                  }} className={`p-3 group rounded-lg flex ${this.state.algorithm && inputArrayLength? "dark:bg-blue-600 bg-blue-500 cursor-pointer hover:shadow-custom-md-green" : "bg-gray-600 cursor-not-allowed"}`}>
                  <Replay className={` ${this.state.algorithm && inputArrayLength && "group-hover:rotate-[330deg]"} transition-all duration-200 ease-out`}/>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}



export {InputField};