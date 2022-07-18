import React, { Component } from 'react'
import { InputHandler } from '../InputHandler/InputHandler.js'
import { Strategy } from '../Strategy/Strategy.js';
import { Options } from './options/Options.js';
import { ReactComponent as Play } from '../../img/play.svg'
import { ReactComponent as Replay } from '../../img/replay.svg'
import { ReactComponent as Loading } from '../../img/spinLoading.svg'
import AlgorithmSelection from './AlgorithmSelection.js';
import ShowValue from './ShowValue.js';
import { Animation } from '../Animation/Animation.js';



class InputField extends Component {

  constructor(props) {
    super(props);
    this.InputHandler = new InputHandler();
    this.name         = props.name;
    this.timeouts     = Animation.getTimeouts() || [];
    this.Strategy = new Strategy();
    this.state = {
      algorithm:  localStorage.getItem("algorithm") || 'Heap', // SG 07/16/2022 20:00  defalt algorithm set to heap
      animating: false,
    }
  }

  displayErrorMessage() {
    if(this.props.InputHandler.state.inputArrayLength < 2) {
      document.getElementById('sort-canvas-error-msg').innerHTML ="Array size should at least be 2" 
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
    console.log(this.state.animating);
    
    const loadingComponent = (width, margin) => {
      return (
        <div className={`${margin} cursor-not-allowed relative w-[${width}] h-[2.6em] p-3 group rounded-lg flex dark:bg-lightBlue2 bg-lightGreen`}>
          <Loading className="fill-white absolute scale-[.4] top-[50%] left-[50%] right-[50%] -translate-x-[50%] -translate-y-[50%]"/>
        </div>
      )
    }

    return (
      <div className="flex flex-col dark:bg-darkGray bg-gray-100 shadow-lg shadow-gray-200" id="input-field-sort">

        <div className={`flex items-center justify-center py-4 md:py-1 w-sreen gap-4 flex-wrap`}>   

          <div className={`flex justify-center items-center h-full sm:mb-0`}>
              <input placeholder={`Array size (MAX ${InputHandler.getAllowedMaxInputSize()})`} value={inputArrayLength === 0 ? '' : inputArrayLength} onChange={(e) => {
                if(!this.state.animating) {
                // SG 07/07/2022 21:03  Input validation, only accepts a number that is less than the allowed array size
                  (Number(e.target.value) || !e.target.value) 
                    && (e.target.value <= InputHandler.getAllowedMaxInputSize()) 
                      ? this.props.InputHandler.setState({inputArrayLength: e.target.value.replace(/\D/g, '')}) 
                      : this.props.InputHandler.setState({inputArrayLength: InputHandler.getAllowedMaxInputSize()})
                  }
                }}
                className={`${this.state.animating && 'cursor-not-allowed'} outline-none placeholder:text-[.95em] h-[2.6em] w-[50%] text-[1em] bg-gray-200 px-2 dark:bg-gray-600 text-gray-700 dark:text-gray-100 rounded-md text-center font-semibold sm:w-100`}
                maximum={InputHandler.getAllowedMaxInputSize()}
              />
              {this.state.animating ? loadingComponent("3.2em", "ml-3") : <button onClick={() => { 
                  if(this.scrollDown()) {
                    this.props.InputHandler.setState({generatedArray: InputHandler.handleInputRequest(inputArrayLength)});
                  }
              }} className=" p-[.7em] text-[.92em] w-[10.8em] ml-3 rounded-md text-white font-semibold hover:scale-[1.02] hover:bg-lightGreen transition duration-200 ease-in-out dark:bg-lightBlue2 bg-lightGreen dark:text-white hover:shadow-custom-md-blue dark:hover:shadow-custom-md-lightBlue">Generate Array</button>}

          </div>
          
          
          <div className="flex gap-5 md:gap-10 flex-wrap justify-center items-center">

            <Options options={this.props.InputHandler} algorithm={algorithm} animating={this.state.animating}/> 

            <div className="flex self-center gap-3 justify-center items-center">
              <AlgorithmSelection strategy={this.Strategy} options={this}/>
              
              {this.state.animating ? loadingComponent("3.2em") : <div id="sort-play-btn" clickable="true" onClick={async () => { 
                  if(generatedArray.length === 0){
                    document.getElementById('sort-canvas-error-msg').innerHTML ="Please generate an array first" 
                  } else {
                    this.setState({...this.state, animating: true})
                    this.scrollDown();
                    this.Strategy.setOptions = options;
                    localStorage.setItem('options', JSON.stringify(options));
                    await this.Strategy.perform(options, inputArray);
                    this.setState({...this.state, animating: false})
                  } 
               }
              } className={`relative w-[3.2em] h-[2.6em] p-3 group rounded-lg flex ${this.state.algorithm && inputArrayLength ? "dark:bg-lightBlue2 bg-lightGreen cursor-pointer hover:shadow-custom-md-blue dark:hover:shadow-custom-md-lightBlue  transition-all duration-200 ease-in-out" : "bg-gray-600 cursor-not-allowed"}`}>
                <Play className={`absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] scale-[1.1] mr-auto ml-auto transition-all duration-200 ease-in-out ${this.state.algorithm && "group-hover:scale-[1.2]"}`}/>
              </div>}
              

              {this.state.animating ? loadingComponent("3.2em") : <div className="self-center group">
                <div id="sort-replay-btn" clickable="true" onClick={() => { //TODO need to make sure to kill setTimeout
                    if(this.scrollDown()) {
                      this.props.InputHandler.setState({generatedArray: InputHandler.handleInputRequest(inputArrayLength)});
                    } 
                  }} className={`p-3 w-[3.2em] group h-[2.6em] rounded-lg flex ${this.state.algorithm && inputArrayLength? "dark:bg-lightBlue2 bg-lightGreen cursor-pointer hover:shadow-custom-md-blue dark:hover:shadow-custom-md-lightBlue" : "bg-gray-600 cursor-not-allowed"} relative`}>
                  <Replay className={` ${this.state.algorithm && inputArrayLength && "group-hover:rotate-[330deg]"} scale-[.9] absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] transition-all duration-200 ease-out`}/>
                </div>
              </div>}
              {!this.state.animating && <ShowValue mainCanvasInputHandler={this.props.InputHandler} inputArrayLength={inputArrayLength}/>}    
            </div>
          </div>
        </div>
      </div>
    )
  }
}



export {InputField};