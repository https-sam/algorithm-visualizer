import React, { Component } from 'react'
import { InputHandler } from '../InputHandler/InputHandler.js'
import SelectionSort from '../Strategy/Algorithms/SelectionSort.js';
import { Strategy } from '../Strategy/Strategy.js';
import { Options } from './options/Options.js';
import { ReactComponent as Play } from '../../img/play.svg'
import { ReactComponent as Replay } from '../../img/replay.svg'
import { Animation } from '../Animation/Animation.js';
import { MergeSort } from '../Strategy/Algorithms/MergeSort.js';


class InputField extends Component {

  constructor(props) {
    super(props);
    this.InputHandler = new InputHandler();
    this.name         = props.name;
    this.selectionSort = new SelectionSort(); 
    this.mergeSort = new MergeSort();
    this.Strategy = new Strategy();
    this.state = {
      algorithm: ''
    }
  }


  render() {
    const {inputArrayLength, options} = this.props.InputHandler.state;
    const { algorithm } = this.state;
    const { inputArray } = this.props;


    return (
      <div className="flex flex-col border-[1px]">

        <div className={`flex items-center justify-around p-3 w-sreen gap-4 flex-wrap ${this.name[0] + ' '}`}>  
          <div className="flex flex-col justify-center items-center h-full sm:mb-0 cursor-pointer">
            <div className="flex">
              <input placeholder={`Array size (MAX ${InputHandler.getAllowedMaxInputSize()})`} value={inputArrayLength === 0 ? '' : inputArrayLength} onChange={(e) => {
                // SG 07/07/2022 21:03  Input validation, only accepts a number that is less than the allowed array size
                (Number(e.target.value) || !e.target.value) 
                  && (e.target.value <= InputHandler.getAllowedMaxInputSize()) 
                    ? this.props.InputHandler.setState({inputArrayLength: e.target.value.replace(/\D/g, '')}) 
                    : this.props.InputHandler.setState({inputArrayLength: InputHandler.getAllowedMaxInputSize()})
                }} 
                className=" bg-gray-200 rounded-md text-center p-[.5em] font-medium w-[57%] sm:w-100"
                maximum={InputHandler.getAllowedMaxInputSize()}
              />
              <button onClick={() => { 
                this.props.InputHandler.setState({generatedArray: InputHandler.handleInputRequest(inputArrayLength)});
              }} className="bg-blue-300 p-2 ml-3 rounded-md text-white font-medium hover:scale-[1.02] hover:bg-blue-400 transition duration-200 ease-in-out">Generate Array</button>
            </div>
          </div>

          <div className="w-[41em] overflow-auto flex gap-3 p-1">
            <div onClick={() => { 
                this.Strategy.setStrategy = this.selectionSort;
                this.setState({algorithm: 'Selection'});
              }} 
              className={`cursor-pointer hover:scale-[1.02] transition-all duration-200 ease-in-out border-2 ${algorithm === 'Selection' ? "bg-blue-100 border-blue-300" : "border-gray-300"} min-w-[150px] rounded-xl text-gray-600 flex flex-col p-3 items-center`}>
              <p className="font-semibold">Selection Sort</p>
            </div>

            <div onClick={() => { 
                this.Strategy.setStrategy = this.mergeSort;
                this.setState({algorithm: 'Merge'});
              }} 
              className={`cursor-pointer hover:scale-[1.02] transition-all duration-200 ease-in-out border-2 ${algorithm === 'Merge' ? "bg-blue-100 border-blue-300" : "border-gray-300"} min-w-[150px] rounded-xl text-gray-600 flex flex-col p-3 items-center`}>
              <p className="font-semibold">Merge Sort</p>
            </div>

            <div onClick={() => { 
                this.Strategy.setStrategy = this.selectionSort; 
                this.setState({algorithm: 'Quick'});
              }} 
              className={`cursor-pointer hover:scale-[1.02] transition-all duration-200 ease-in-out border-2 ${algorithm === 'Quick' ? "bg-blue-100 border-blue-300" : "border-gray-300"} min-w-[150px] rounded-xl text-gray-600 flex flex-col p-3 items-center`}>
              <p className="font-semibold">Quick Sort</p>
            </div>

            <div onClick={() => { 
                this.Strategy.setStrategy = this.selectionSort;
                this.setState({algorithm: 'Bubble'});
              }} 
              className={`cursor-pointer hover:scale-[1.02] transition-all duration-200 ease-in-out border-2 ${algorithm === 'Bubble' ? "bg-blue-100 border-blue-300" : "border-gray-300"} min-w-[150px] rounded-xl text-gray-600 flex flex-col p-3 items-center`}>
              <p className="font-semibold">Bubble Sort</p>
            </div>

          </div>          
          
          <div className="flex gap-10 flex-wrap justify-center">
            <Options options={this.props.InputHandler} algorithm={algorithm}/>          
            <div className="flex self-center gap-3">
              <div onClick={() => { 
                  this.Strategy.setOptions = options;
                  this.Strategy.perform(options, inputArray)
                }
              } className={`relative min-w-[3.5em] p-3 group rounded-lg flex ${this.state.algorithm && inputArrayLength ? "bg-green-600 cursor-pointer hover:shadow-custom-md-green  transition-all duration-200 ease-in-out" : "bg-gray-600 cursor-not-allowed"}`}>
                <p className={`text-white font-semibold group-hover:opacity-0 ${this.state.algorithm && "mr-9"}`}>{this.state.algorithm && this.state.algorithm + " sort"}</p>
                <Play className={`absolute right-[1em] transition-all duration-200 ease-in-out ${this.state.algorithm && "group-hover:scale-[1.15] group-hover:right-[39%]"}`}/>
              </div>

              <div className="self-center group">
                <div onClick={() => { //TODO need to make sure to kill setTimeout
                    this.props.InputHandler.setState({generatedArray: InputHandler.handleInputRequest(inputArrayLength)});
                  }} className={`p-3 group rounded-lg flex ${this.state.algorithm && inputArrayLength? "bg-green-600 cursor-pointer hover:shadow-custom-md-green" : "bg-gray-600 cursor-not-allowed"}`}>
                  <Replay className="grouphover:rotate-[330deg] transition-all duration-200 ease-out"/>
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