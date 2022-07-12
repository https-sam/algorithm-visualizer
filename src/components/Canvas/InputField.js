import React, { Component } from 'react'
import { InputHandler } from '../InputHandler/InputHandler.js'
import SelectionSort from '../Strategy/Algorithms/SelectionSort.js';
import { Strategy } from '../Strategy/Strategy.js';
import { Options } from './options/Options.js';
import { ReactComponent as Play } from '../../img/play.svg'
import { ReactComponent as Replay } from '../../img/replay.svg'
import { ReactComponent as Arrow } from '../../img/arrowDown.svg'
import { MergeSort } from '../Strategy/Algorithms/MergeSort.js';
import { RadixSortLSD } from '../Strategy/Algorithms/RadixSortLSD.js';


class InputField extends Component {

  constructor(props) {
    super(props);
    this.InputHandler = new InputHandler();
    this.name         = props.name;
    this.selectionSort = new SelectionSort(); 
    this.mergeSort = new MergeSort();
    this.radixSortLSD = new RadixSortLSD();
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
      <div className="flex flex-col dark:bg-darkGray bg-gray-100 shadow-lg shadow-gray-200" id="input-field-sort">

        <div className={`flex items-center justify-center py-2 w-sreen gap-4 flex-wrap ${this.name[0] + ' '}`}>  

          <div className="w-[41em] overflow-auto flex gap-3 p-2">
            <div onClick={() => { 
                this.Strategy.setStrategy = this.selectionSort;
                this.setState({algorithm: 'Selection'});
              }} 
              className={`cursor-pointer hover:scale-[1.05] transition-all duration-200 ease-in-out border-2 hover:border-blue-300 ${algorithm === 'Selection' ? "bg-blue-200 dark:bg-transBlue border-blue-300" : "border-gray-300 bg-white dark:bg-gray-300" } min-w-[150px] rounded-xl text-gray-600 flex flex-col p-3 items-center`}>
              <p className={`font-semibold ${algorithm === 'Selection' && "dark:text-white"}`}>Selection Sort</p>
            </div>

            <div onClick={() => { 
                this.Strategy.setStrategy = this.mergeSort;
                this.setState({algorithm: 'Merge'});
              }} 
              className={`cursor-pointer hover:scale-[1.05] transition-all duration-200 ease-in-out border-2 hover:border-blue-300 ${algorithm === 'Merge' ? "bg-blue-200 dark:bg-transBlue border-blue-300" : "border-gray-300 bg-white dark:bg-gray-300"} min-w-[150px] rounded-xl text-gray-600 flex flex-col p-3 items-center`}>
              <p className={`font-semibold ${algorithm === 'Merge' && "dark:text-white"}`}>Merge Sort</p>
            </div>

            <div onClick={() => { 
                this.Strategy.setStrategy = this.selectionSort; 
                this.setState({algorithm: 'Quick'});
              }} 
              className={`cursor-pointer hover:scale-[1.05] transition-all duration-200 ease-in-out border-2 hover:border-blue-300 ${algorithm === 'Quick' ? "bg-blue-200 dark:bg-transBlue border-blue-300" : "border-gray-300 bg-white dark:bg-gray-300"} min-w-[150px] rounded-xl text-gray-600 flex flex-col p-3 items-center`}>
            <p className={`font-semibold ${algorithm === 'Quick' && "dark:text-white"}`}>Quick Sort</p>
            </div>

            <div onClick={() => { 
                this.Strategy.setStrategy = this.radixSortLSD;
                this.setState({algorithm: 'Radix'});
              }} 
              className={`cursor-pointer hover:scale-[1.05] transition-all duration-200 ease-in-out border-2 hover:border-blue-300 ${algorithm === 'Radix' ? "bg-blue-200 dark:bg-transBlue border-blue-300" : "border-gray-300 bg-white dark:bg-gray-300"} min-w-[150px] rounded-xl text-gray-600 flex flex-col p-3 items-center`}>
              <p className={`font-semibold ${algorithm === 'Radix' && "dark:text-white"}`}>Radix Sort</p>
            </div>

          </div>      
              
          <div className="flex flex-col justify-center items-center h-full sm:mb-0 cursor-pointer">
            <div className="flex">
              <input placeholder={`Array size (MAX ${InputHandler.getAllowedMaxInputSize()})`} value={inputArrayLength === 0 ? '' : inputArrayLength} onChange={(e) => {
                // SG 07/07/2022 21:03  Input validation, only accepts a number that is less than the allowed array size
                (Number(e.target.value) || !e.target.value) 
                  && (e.target.value <= InputHandler.getAllowedMaxInputSize()) 
                    ? this.props.InputHandler.setState({inputArrayLength: e.target.value.replace(/\D/g, '')}) 
                    : this.props.InputHandler.setState({inputArrayLength: InputHandler.getAllowedMaxInputSize()})
                }} 
                className=" bg-gray-200 dark:bg-gray-300 rounded-full text-center p-[.7em] font-medium w-[57%] sm:w-100"
                maximum={InputHandler.getAllowedMaxInputSize()}
              />
              <button onClick={() => { 
                this.props.InputHandler.setState({generatedArray: InputHandler.handleInputRequest(inputArrayLength)});
              }} className="bg-blue-300 p-2 ml-3 rounded-lg text-white font-medium hover:scale-[1.02] hover:bg-blue-400 transition duration-200 ease-in-out dark:bg-lightBlue dark:text-darkGray">Generate Array</button>
            </div>
          </div>
          
          <div className="flex gap-10 flex-wrap justify-center">
            <Options options={this.props.InputHandler} algorithm={algorithm}/>          
            <div className="flex self-center gap-3">
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
              } className={`relative min-w-[3.5em] p-3 group rounded-lg flex ${this.state.algorithm && inputArrayLength ? "bg-green-600 cursor-pointer hover:shadow-custom-md-green  transition-all duration-200 ease-in-out" : "bg-gray-600 cursor-not-allowed"}`}>
                <p className={`text-white font-semibold group-hover:opacity-0 ${this.state.algorithm && "mr-9"}`}>{this.state.algorithm && this.state.algorithm + " Sort"}</p>
                <Play className={`absolute right-[.94em] transition-all duration-200 ease-in-out ${this.state.algorithm && "group-hover:scale-[1.15] group-hover:right-[40%]"}`}/>
              </div>

              <div className="self-center group">
                <div onClick={() => { //TODO need to make sure to kill setTimeout
                    this.props.InputHandler.setState({generatedArray: InputHandler.handleInputRequest(inputArrayLength)});
                  }} className={`p-3 group rounded-lg flex ${this.state.algorithm && inputArrayLength? "bg-green-600 cursor-pointer hover:shadow-custom-md-green" : "bg-gray-600 cursor-not-allowed"}`}>
                  <Replay className="group-hover:rotate-[330deg] transition-all duration-200 ease-out"/>
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