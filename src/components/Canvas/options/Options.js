import SlideBar from './SlideBar';
import './style.css'
import React, { Component } from 'react'
import { ReactComponent as ArrowDown } from '../../../img/arrowDown.svg'
import { ReactComponent as CPU } from '../../../img/cpu.svg'
import { ReactComponent as UnsortedBars } from '../../../img/unsortedBars.svg'
import { ReactComponent as SortedBars } from '../../../img/sortedBars.svg'
import { ReactComponent as Runner } from '../../../img/running.svg'
import { ReactComponent as Speed } from '../../../img/Speed.svg'
import { ReactComponent as Key } from '../../../img/key.svg'
import { CONSTANTS } from '../../../config'



class Options extends Component {
  constructor(props) {
   super(props);
   this.state =  {
    showProcessingColor: false,
    showDefaultBarColor: false,
    showSortedBarColor: false,
    showMinBarColor: false,
    showDelay: false,
   }

  }
  render() {
    const {showProcessingColor, showDefaultBarColor, showSortedBarColor, showMinBarColor, showDelay } = this.state;
    const style = {
      height: 400
    };
    return (
      <div className="rounded-md">

        <div className="w-fit flex space-x-5">

          <div className="flex flex-col items-center relative space-y-2">
            <div className="p-2 hover:bg-gray-200 rounded-md peer" onClick={() => this.setState({showDefaultBarColor: !showDefaultBarColor})}>
              <UnsortedBars className="scale-[1.2]"/>
            </div> 
            <div className={`h-3 w-3 rounded-full`} style={{backgroundColor: this.props.options.state.options.defaultBarColor}}/>
            <div className={`absolute bg-white p-2 rounded-md border-2 top-[100%] space-y-1 ${showDefaultBarColor ? "block" : "hidden"}`}>
              {CONSTANTS.DEFAULT.map((color) => (
                <div 
                  key={color}
                  style={{backgroundColor: color}} 
                  className={`w-8 h-8 rounded-md hover:scale-[1.15] transition-all duration-200 ease-in-out`}
                  onClick={() => { 
                    this.props.options.setState(prev => ({options: {...prev.options, defaultBarColor: color, }}));
                    this.setState({showDefaultBarColor: !showDefaultBarColor})
                  }  
                }/>
              ))}
            </div>
            <p className={`bg-white z-10 inline absolute top-[100%] border-2 p-1 rounded-md hidden peer-hover:block tool-tip-options`}><p className="font-bold">Unsorted</p> bars color</p>
          </div>

          <div className="flex flex-col items-center relative space-y-2">
            <div className="p-2 hover:bg-gray-200 peer rounded-md" onClick={() => this.setState({showSortedBarColor: !showSortedBarColor})}>
              <SortedBars className="scale-[1.2]"/>
            </div> 
            <div className={`h-3 w-3 rounded-full`} style={{backgroundColor: this.props.options.state.options.sortedBarColor}}/>
            <div className={`absolute bg-white p-2 rounded-md border-2 top-[100%] space-y-1 ${showSortedBarColor ? "block" : "hidden"}`}>
              {CONSTANTS.SORTED.map((color) => (
                <div 
                  key={color}
                  style={{backgroundColor: color}} 
                  className={`w-8 h-8 rounded-md hover:scale-[1.15] transition-all duration-200 ease-in-out`}
                  onClick={() => { 
                    this.props.options.setState(prev => ({options: {...prev.options, sortedBarColor: color, }}));
                    this.setState({showSortedBarColor: !showSortedBarColor})
                  }  
                }/>
              ))}
            </div>
            <p className={`bg-white inline z-10 absolute top-[100%] border-2 p-1 rounded-md hidden peer-hover:block tool-tip-options`}><p className="font-bold">Sorted</p> bars color</p>
          </div>


          <div className="flex flex-col items-center relative space-y-2">
            <div className="p-2 hover:bg-gray-200 peer rounded-md" onClick={() => this.setState({showProcessingColor: !showProcessingColor})}>
              <CPU className="scale-[1.2]"/>
            </div> 
            <div className={`h-3 w-3 rounded-full`} style={{backgroundColor: this.props.options.state.options.processingColor}}/>
            <div className={`absolute bg-white p-2 rounded-md border-2 top-[100%] space-y-1 ${showProcessingColor ? "block" : "hidden"}`}>
              {CONSTANTS.PROCESSING.map((color) => (
                <div 
                  key={color}
                  style={{backgroundColor: color}} 
                  className={`w-8 h-8 rounded-md hover:scale-[1.15] transition-all duration-200 ease-in-out`}
                  onClick={() => { 
                    this.props.options.setState(prev => ({options: {...prev.options, processingColor: color, }}));
                    this.setState({showProcessingColor: !showProcessingColor})
                  }  
                }/>
              ))}
            </div>
            <p className={`bg-white inline z-10 absolute top-[100%] border-2 p-1 rounded-md hidden peer-hover:block tool-tip-options`}><p className="font-bold">Processing</p> bars color</p>
          </div>


          <div className="flex flex-col items-center relative space-y-2">
            <div className="p-2 hover:bg-gray-200 peer rounded-md" onClick={() => this.setState({showMinBarColor: !showMinBarColor})}>
              <Key className="scale-[1.2]"/>
            </div> 
            <div className={`h-3 w-3 rounded-full`} style={{backgroundColor: this.props.options.state.options.currentMinBarColor}}/>
            <div className={`absolute bg-white p-2 rounded-md border-2 top-[100%] space-y-1 ${showMinBarColor ? "block" : "hidden"}`}>
              {CONSTANTS.CURRENT_MIN.map((color) => (
                <div 
                  key={color}
                  style={{backgroundColor: color}} 
                  className={`w-8 h-8 rounded-md hover:scale-[1.15] transition-all duration-200 ease-in-out`}
                  onClick={() => { 
                    this.props.options.setState(prev => ({options: {...prev.options, currentMinBarColor: color, }}));
                    this.setState({showMinBarColor: !showMinBarColor})
                  }  
                }/>
              ))}
            </div>
            <p className={`bg-white inline z-10 absolute top-[100%] border-2 p-1 rounded-md hidden peer-hover:block tool-tip-options`}><p className="font-bold">Minimum</p> bar color</p>
          </div>


          <div className="flex flex-col items-center relative space-y-2">
            <div className="p-2 hover:bg-gray-200 peer rounded-md" onClick={() => this.setState({showDelay: !showDelay})}>
              <Speed className="scale-[1.2]"/>
            </div> 
            <p className="font-semibold text-gray-500">{this.props.options.state.options?.delay}ms</p>
            <div className={`absolute bg-white p-2 rounded-md border-2 top-[100%] space-y-1 ${showDelay ? "block" : "hidden"}`}>
              <div className="flex flex-col items-center justify-center">
                <SlideBar mainCanvas={this.props.options}/>
                <p className="">{this.props.options.state.options?.delay}</p>
              </div>
            </div>
            <p className={`bg-white inline z-10 absolute top-[100%] border-2 p-1 rounded-md hidden peer-hover:block tool-tip-options`}>Animation Speed</p>
          </div>



          <div className="flex flex-col items-center relative space-y-2">
            <div className={`p-2 hover:bg-gray-200 peer rounded-md`} onClick={() => {
              this.props.options.setState(prev => ({options: {...prev.options, skipJ: !this.props.options.state.options.skipJ}}))

              }}>
              <Runner className="scale-[1.2]"/>
            </div> 
            <p className="font-semibold text-gray-500">{this.props.options.state.options.skipJ ? "ON" : "OFF"}</p>
            <p className={`bg-white inline z-10 absolute top-[100%] border-2 p-1 rounded-md hidden peer-hover:block tool-tip-options`}>Faster Animation</p>
          </div>
   
          
       
          
          



          {/* <p>Default bar color</p>
          <p>Current Minimum bar</p>
          <p>Processing color</p>
          <p>Sorted color</p>
          <p>Delay</p>
          <div className="flex">
            <SlideBar mainCanvas={this.props.options}/>
            <p className="ml-10">{this.props.options.state.options?.delay}</p>
          </div>
          <div className="flex cursor-pointer" onClick={() => {this.setState({showAdvancedOptions: !showAdvancedOptions})}}>
            <p>Show advanced options</p>
            <ArrowDown className="scale-[.80]"/>
          </div>
        </div>
        {showAdvancedOptions && 
        <div>
          <p>Omit j iteration</p>     */}
        </div>
        
      </div>
    )
  }
}

export { Options }