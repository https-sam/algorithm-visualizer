import React, { Component } from 'react'
import { InputHandler } from '../InputHandler/InputHandler.js'
import SelectionSort from '../Strategy/Algorithms/SelectionSort.js';
import { Strategy } from '../Strategy/Strategy.js';
import { Options } from './options/Options.js';
import { ReactComponent as Play } from '../../img/play.svg'
import { ReactComponent as Replay } from '../../img/replay.svg'
class InputField extends Component {

  constructor(props) {
    super(props);
    this.InputHandler = new InputHandler();
    this.name         = props.name;
    this.selectionSort = new SelectionSort(); 
    this.Strategy = new Strategy();
    this.state = {
      algorithm: ''
    }
  }


  render() {
    const {inputArrayLength, options} = this.props.InputHandler.state;
    const { algorithm } = this.state;

    

    return (
      <div className="flex flex-col">

        <div className={`flex items-center justify-around p-3 w-sreen gap-4 flex-wrap ${this.name[0] + ' '}`}>  
          <div className="flex flex-col justify-center items-center h-full sm:mb-0">
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
            {/* <p className={`text-gray-700 mt-1 ${this.name[1] + ' '}`}>Array size should not exceed {InputHandler.getAllowedMaxInputSize()}.</p> */}
          </div>

          <div className="w-[41em] overflow-auto flex gap-3 p-1">
            <div onClick={() => { 
                this.Strategy.setStrategy = this.selectionSort;
                this.selectionSort.setOptions = options;
                this.setState({algorithm: 'selection'});
              }} 
              className={`hover:scale-[1.02] transition-all duration-200 ease-in-out border-2 ${algorithm === 'selection' ? "bg-blue-100 border-blue-300" : "border-gray-300"} min-w-[150px] rounded-xl text-gray-600 flex flex-col p-3 items-center`}>

              <p className="font-semibold">Selection Sort</p>
            </div>

            <div onClick={() => { 
                this.Strategy.setStrategy = this.selectionSort;
                this.selectionSort.setOptions = options;
                this.setState({algorithm: 'merge'});
              }} 
              className={`hover:scale-[1.02] transition-all duration-200 ease-in-out border-2 ${algorithm === 'merge' ? "bg-blue-100 border-blue-300" : "border-gray-300"} min-w-[150px] rounded-xl text-gray-600 flex flex-col p-3 items-center`}>

              <p className="font-semibold">Merge Sort</p>
            </div>

            <div onClick={() => { 
                this.Strategy.setStrategy = this.selectionSort;
                this.selectionSort.setOptions = options;
                this.setState({algorithm: 'quick'});
              }} 
              className={`hover:scale-[1.02] transition-all duration-200 ease-in-out border-2 ${algorithm === 'quick' ? "bg-blue-100 border-blue-300" : "border-gray-300"} min-w-[150px] rounded-xl text-gray-600 flex flex-col p-3 items-center`}>

              <p className="font-semibold">Quick Sort</p>
            </div>

            <div onClick={() => { 
                this.Strategy.setStrategy = this.selectionSort;
                this.selectionSort.setOptions = options;
                this.setState({algorithm: 'bubble'});
              }} 
              className={`hover:scale-[1.02] transition-all duration-200 ease-in-out border-2 ${algorithm === 'bubble' ? "bg-blue-100 border-blue-300" : "border-gray-300"} min-w-[150px] rounded-xl text-gray-600 flex flex-col p-3 items-center`}>
              <p className="font-semibold">Bubble Sort</p>
            </div>

          </div>          
          
          <Options options={this.props.InputHandler}/>          
        </div>

        <div className="flex self-center group gap-3">
          <div onClick={() => this.Strategy.perform(options)} className={`p-3 rounded-lg flex ${this.state.algorithm ? "bg-green-600 cursor-pointer hover:bg-green-700" : "bg-gray-600"}`}>
            <p className="text-white font-semibold mr-2">Sort</p><Play className={`${this.state.algorithm && "group-hover:scale-[1.15] transition-all duration-200 ease-in-out"}`}/>
          </div>

          <div className="self-center group">
          <div onClick={() => { //TODO need to make sure to kill setTimeout
              this.props.InputHandler.setState({generatedArray: InputHandler.handleInputRequest(inputArrayLength)});
            }} className={`p-3 rounded-lg flex ${this.state.algorithm ? "bg-green-600 cursor-pointer hover:bg-green-700" : "bg-gray-600"}`}><Replay/></div>
          </div>
        </div>
      </div>
    )
  }
}



export {InputField};