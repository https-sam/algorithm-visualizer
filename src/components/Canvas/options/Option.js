import React, { useEffect, useRef, useState } from 'react'
import { CONSTANTS } from '../../../Utility/config';
import SlideBar from './SlideBar';

function Option({options, mainCanvasInputHandler, algorithm, animating}) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if(options.hasDropDown) {
      var dropdown = document.getElementById(options.name + "-option");
      if(dropdown) {
        document.addEventListener('click', (event) => {
          var isClickInsideElement = dropdown.contains(event.target);
          if (!isClickInsideElement) {
            setOpen(false);
          }
        });
      }
    }
  }, [open, options])

  if(!options.hasDropDown) {
    if(algorithm === "Merge") return null; // SG 07/13/2022 20:46  merge sort will not have the option to speed up
    return (
      <div className={`flex flex-col items-center relative space-y-1 cursor-pointer ${animating && "cursor-not-allowed"}`}>
        <div className={`p-2 hover:bg-gray-200 peer rounded-md ${mainCanvasInputHandler.state.options.skipJ && "bg-gray-200"}`} onClick={() => {
          if(!animating) {
            mainCanvasInputHandler.setState(prev => ({options: {...prev.options, skipJ: !mainCanvasInputHandler.state.options.skipJ}}));
          }
          }}>
          {<options.icon className="scale-[1.2] dark:stroke-textGray stroke-[#7B7B7c]"/>}
        </div> 
        <p className="font-semibold text-gray-500 text-[.9em]">{mainCanvasInputHandler.state.options.skipJ ? "ON" : "OFF"}</p>
        <p className={`shadow-lg text-[.9em] bg-white inline z-40 absolute top-[107%] p-2 rounded-md hidden peer-hover:block tool-tip-options text-gray-600 whitespace-nowrap font-semibold`}>Faster Animation</p>
      </div>    
    )
  }
  
  if(options.name === "DELAY") {
   return (
    <div className={`flex flex-col items-center relative space-y-1 cursor-pointer ${animating && "cursor-not-allowed"}`}>
      <div id={`${options.name}-option`} className="p-2 hover:bg-gray-200 showDelay peer rounded-md" onClick={() => {
        if(!animating) {
          setOpen(!open)
        }
      }}>
        {<options.icon className="scale-[1.2] dark:stroke-textGray stroke-[#7B7B7c]"/>}
      </div> 
      <p className="font-semibold text-gray-500 text-[.9em]">{mainCanvasInputHandler.state.options?.delay}ms</p>
      <div className={`absolute transition-all duration-200 ease-in-out bg-white p-2 dark:bg-darkGray dark:border-lightDark rounded-md border-2 top-[100%] space-y-1 ${open ? "scale-100" : "scale-0 -translate-y-[1.9em]"}`}>
        <div className="flex dark:bg-darkGray dark:border-lightDark flex-col items-center justify-center">
          <SlideBar mainCanvas={mainCanvasInputHandler}/>
          <p className="themeFont dark:text-white font-bold text-[.9em]">{mainCanvasInputHandler.state.options?.delay}</p>
        </div>
      </div>
      <p className={`shadow-lg text-[.9em] bg-white inline z-10 absolute top-[107%] p-2 rounded-md hidden ${!open && "peer-hover:block"} tool-tip-options text-gray-600 whitespace-nowrap font-semibold`}>Animation Delay</p>
    </div>
   )
  }

  // SG 07/13/2022 13:06  Making sure that only Selection sort will have the option to change the optimum key color
  if((algorithm === "Radix" || algorithm === "Merge" || algorithm === "Heap" || algorithm === "Shell") && (options.name === "CURRENT_MIN")) return null;
  return (
    <div className={`flex flex-col items-center relative space-y-1 cursor-pointer ${animating && "cursor-not-allowed"}`}>
      <div id={`${options.name}-option`} className="p-2 mb-1 hover:bg-gray-200 showDefaultBarColor rounded-md peer" onClick={() => { 
        if(!animating) {
          setOpen(!open);
        }  
      }}>
        {<options.icon className="scale-[1.2] dark:stroke-textGray stroke-[#7B7B7c]" />}
      </div> 
      <div className={`h-3 w-3 rounded-full`} style={{backgroundColor: mainCanvasInputHandler.state.options[options.stateName]}}/>
      <div className={`options-dropdown transition-all duration-200 ease-in-out absolute bg-white dark:bg-darkGray dark:border-lightDark p-2 rounded-md border-2 top-[100%] space-y-1 ${open ? "scale-100" : "scale-0 -translate-y-[7em]"}`}>
        {CONSTANTS[options.name].map((color) => (
          <div 
            key={color}
            style={{backgroundColor: color}} 
            className={`w-7 h-7 z-200 rounded-md hover:scale-[1.15] transition-all duration-200 ease-in-out ${color === 'white' && "border-2 border-gray-300 dark:border-none"}`}
            onClick={() => { 
              mainCanvasInputHandler.setState(prev => ({options: {...prev.options, [options.stateName]: color, }}));
              setOpen(!open);
              let j = JSON.parse(localStorage.getItem("options"));
              if(j) {
                j[options.stateName] = color;
                localStorage.setItem("options", JSON.stringify(j));
              }
            } 
          }/>
        ))}
      </div>
      <p ref={ref} className={`shadow-lg z-10 text-[.9em] bg-white absolute top-[110%] p-2 rounded-md hidden whitespace-nowrap ${!open && "peer-hover:block"} tool-tip-options text-gray-600 font-semibold`}>{options.tooltipMessage}</p>
    </div>
  )
}

export default Option