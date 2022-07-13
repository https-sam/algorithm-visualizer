import SlideBar from './SlideBar';
import './style.css'
import React, { Component } from 'react'
import { ReactComponent as CPU } from '../../../img/cpu.svg'
import { ReactComponent as UnsortedBars } from '../../../img/unsortedBars.svg'
import { ReactComponent as SortedBars } from '../../../img/sortedBars.svg'
import { ReactComponent as Runner } from '../../../img/running.svg'
import { ReactComponent as Speed } from '../../../img/Speed.svg'
import { ReactComponent as Key } from '../../../img/key.svg'
import { CONSTANTS }             from '../../../Utility/config'



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
  


  componentDidUpdate(prevProps, prevState) {
  


    //TODO resolve performance issues where it renders too many times
    if(prevState !== this.state) {
      let openOption = '';
      let states = Object.keys(this.state)
      
      for(let i = 0; i < states.length; i++) {
        if(this.state[states[i]]) openOption = states[i];
      }


      console.log("first")
      if(openOption) {
        let openDropdown = document.querySelector("." + openOption);

        document.addEventListener('click', (event) => {
          var isClickInsideElement = openDropdown.contains(event.target);
          if (!isClickInsideElement) {

            let payload = {}
            for(let i = 0; i < states.length; i++) {
              payload[states[i]] = false;
            }
            this.setState({[openOption]: false})
            // this.setState(payload);
            // console.log(payload);
            
          }
        });
      }
    }
  }

  render() {

    const {showProcessingColor, showDefaultBarColor, showSortedBarColor, showMinBarColor, showDelay } = this.state;
    const { algorithm } = this.props;
    
    return (
      <div className="rounded-md z-10">

        <div className="w-fit flex space-x-5">

          <div className="flex flex-col items-center relative space-y-2 cursor-pointer">
            <div className="p-2 hover:bg-gray-200 showDefaultBarColor rounded-md peer" onClick={() => this.setState({showDefaultBarColor: !showDefaultBarColor})}>
              <UnsortedBars className="scale-[1.2]"/>
            </div> 
            <div className={`h-3 w-3 rounded-full`} style={{backgroundColor: this.props.options.state.options.defaultBarColor}}/>
            <div className={`options-dropdown transition-all duration-200 ease-in-out absolute bg-white dark:bg-darkGray dark:border-lightDark p-2 rounded-md border-2 top-[100%] space-y-1 ${showDefaultBarColor ? "scale-100" : "scale-0 -translate-y-[7em]"}`}>
              {CONSTANTS.DEFAULT.map((color) => (
                <div 
                  key={color}
                  style={{backgroundColor: color}} 
                  className={`w-8 h-8 rounded-md hover:scale-[1.15] transition-all duration-200 ease-in-out ${color === 'white' && "border-2 border-gray-300"}`}
                  onClick={() => { 
                    this.props.options.setState(prev => ({options: {...prev.options, defaultBarColor: color, }}));
                    this.setState({showDefaultBarColor: !showDefaultBarColor})
                  }  
                }/>
              ))}
            </div>
            <p className={`shadow-lg bg-white z-10 absolute top-[100%] p-2 rounded-md hidden whitespace-nowrap peer-hover:block tool-tip-options text-gray-600 font-semibold`}>Unsorted bars color</p>
          </div>

          <div className="flex flex-col items-center relative space-y-2 cursor-pointer">
            <div className="p-2 hover:bg-gray-200 showSortedBarColor peer rounded-md z-100" onClick={() => this.setState({showSortedBarColor: !showSortedBarColor})}>
              <SortedBars className="scale-[1.2]"/>
            </div> 
            <div className={`h-3 w-3 rounded-full`} style={{backgroundColor: this.props.options.state.options.sortedBarColor}}/>
            <div className={`options-dropdown transition-all duration-200 ease-in-out absolute dark:bg-darkGray dark:border-lightDark bg-white p-2 rounded-md border-2 top-[100%] space-y-1 ${showSortedBarColor ? "scale-100" : "scale-0 -translate-y-[7em]"}`}>
              {CONSTANTS.SORTED.map((color) => (
                <div 
                  key={color}
                  style={{backgroundColor: color}} 
                  className={`w-8 h-8 rounded-md hover:scale-[1.15] transition-all duration-200 ease-in-out ${color === 'white' && "border-2 border-gray-300"}`}
                  onClick={() => { 
                    this.props.options.setState(prev => ({options: {...prev.options, sortedBarColor: color, }}));
                    this.setState({showSortedBarColor: !showSortedBarColor})
                  }  
                }/>
              ))}
            </div>
            <p className={`shadow-lg bg-white inline z-10 absolute top-[100%] p-2 rounded-md hidden peer-hover:block tool-tip-options text-gray-600 whitespace-nowrap font-semibold`}>Sorted bars color</p>
          </div>


          <div className="flex flex-col items-center relative space-y-2 cursor-pointer">
            <div className="p-2 hover:bg-gray-200 showProcessingColor peer rounded-md" onClick={() => this.setState({showProcessingColor: !showProcessingColor})}>
              <CPU className="scale-[1.2]"/>
            </div> 
            <div className={`h-3 w-3 rounded-full`} style={{backgroundColor: this.props.options.state.options.processingColor}}/>
            <div className={` options-dropdown  transition-all duration-200 ease-in-out dark:bg-darkGray dark:border-lightDark absolute bg-white p-2 rounded-md border-2 top-[100%] space-y-1 ${showProcessingColor ? "scale-100" : "scale-0 -translate-y-[7em]"}`}>
              {CONSTANTS.PROCESSING.map((color) => (
                <div 
                  key={color}
                  style={{backgroundColor: color}} 
                  className={`w-8 h-8 rounded-md hover:scale-[1.15] transition-all duration-200 ease-in-out ${color === 'white' && "border-2 border-gray-300"}`}
                  onClick={() => { 
                    this.props.options.setState(prev => ({options: {...prev.options, processingColor: color, }}));
                    this.setState({showProcessingColor: !showProcessingColor})
                  }  
                }/>
              ))}
            </div>
            <p className={`shadow-lg bg-white inline z-10 absolute top-[100%] p-2 rounded-md hidden peer-hover:block tool-tip-options text-gray-600 whitespace-nowrap font-semibold`}>Processing bars color</p>
          </div>


          <div className={`${algorithm === 'Selection' ? 'block' : 'hidden'} flex flex-col items-center relative space-y-2 cursor-pointer`}>
            <div className="p-2 hover:bg-gray-200 showMinBarColor peer rounded-md" onClick={() => this.setState({showMinBarColor: !showMinBarColor})}>
              <Key className="scale-[1.2]"/>
            </div> 
            <div className={`h-3 w-3 rounded-full`} style={{backgroundColor: this.props.options.state.options.currentMinBarColor}}/>
            <div className={`options-dropdown transition-all duration-200 ease-in-out dark:bg-darkGray dark:border-lightDark absolute bg-white p-2 rounded-md border-2 top-[100%] space-y-1 ${showMinBarColor ? "scale-100" : "scale-0 -translate-y-[7em]"}`}>
              {CONSTANTS.CURRENT_MIN.map((color) => (
                <div 
                  key={color}
                  style={{backgroundColor: color}} 
                  className={`w-8 h-8 rounded-md hover:scale-[1.15] transition-all duration-200 ease-in-out ${color === 'white' && "border-2 border-gray-300"}`}
                  onClick={() => { 
                    this.props.options.setState(prev => ({options: {...prev.options, currentMinBarColor: color, }}));
                    this.setState({showMinBarColor: !showMinBarColor})
                  }  
                }/>
              ))}
            </div>
            <p className={`shadow-lg bg-white inline z-10 absolute top-[100%] p-2 rounded-md hidden peer-hover:block tool-tip-options text-gray-600 whitespace-nowrap font-semibold`}>Current bar color</p>
          </div>


          <div className="flex flex-col items-center relative space-y-2 cursor-pointer">
            <div className="p-2 hover:bg-gray-200 showDelay peer rounded-md" onClick={() => this.setState({showDelay: !showDelay})}>
              <Speed className="scale-[1.2]"/>
            </div> 
            <p className="font-semibold text-gray-500">{this.props.options.state.options?.delay}ms</p>
            <div className={`absolute transition-all duration-200 ease-in-out bg-white p-2 dark:bg-darkGray dark:border-lightDark rounded-md border-2 top-[100%] space-y-1 ${showDelay ? "scale-100" : "scale-0 -translate-y-[1.9em]"}`}>
              <div className="flex dark:bg-darkGray dark:border-lightDark flex-col items-center justify-center">
                <SlideBar mainCanvas={this.props.options}/>
                <p className="themeFont dark:text-white">{this.props.options.state.options?.delay}</p>
              </div>
            </div>
            <p className={`shadow-lg bg-white inline z-10 absolute top-[100%] p-2 rounded-md hidden peer-hover:block tool-tip-options text-gray-600 whitespace-nowrap font-semibold`}>Animation Delay</p>
          </div>



          <div className={`${(algorithm === 'Selection' || algorithm === 'Radix') ? 'block' : 'hidden'} flex flex-col items-center relative space-y-2 cursor-pointer`}>
            <div className={`p-2 hover:bg-gray-200 peer rounded-md ${this.props.options.state.options.skipJ && "bg-gray-200"}`} onClick={() => {
              this.props.options.setState(prev => ({options: {...prev.options, skipJ: !this.props.options.state.options.skipJ}}))

              }}>
              <Runner className="scale-[1.2]"/>
            </div> 
            <p className="font-semibold text-gray-500">{this.props.options.state.options.skipJ ? "ON" : "OFF"}</p>
            <p className={`shadow-lg bg-white inline z-10 absolute top-[100%] p-2 rounded-md hidden peer-hover:block tool-tip-options text-gray-600 whitespace-nowrap font-semibold`}>Faster Animation</p>
          </div>       

        </div>
        
      </div>
    )
  }
}

export { Options }