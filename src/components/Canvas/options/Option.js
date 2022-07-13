import React, { useEffect, useRef, useState } from 'react'
import { CONSTANTS } from '../../../Utility/config';
import SlideBar from './SlideBar';

function Option({options, mainCanvasInputHandler}) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if(options.hasDropDown) {
      var dropdown = document.getElementById(options.name + "-option");
      document.addEventListener('click', (event) => {
        var isClickInsideElement = dropdown.contains(event.target);
        if (!isClickInsideElement) {
          setOpen(false);
        }
      }); 
    }
  }, [open])

  if(!options.hasDropDown) {
    return (
      <div className={`flex flex-col items-center relative space-y-2 cursor-pointer`}>
        <div className={`p-2 hover:bg-gray-200 peer rounded-md ${mainCanvasInputHandler.state.options.skipJ && "bg-gray-200"}`} onClick={() => {
          mainCanvasInputHandler.setState(prev => ({options: {...prev.options, skipJ: !mainCanvasInputHandler.state.options.skipJ}}));
          }}>
          {<options.icon className="scale-[1.2]"/>}
        </div> 
        <p className="font-semibold text-gray-500">{mainCanvasInputHandler.state.options.skipJ ? "ON" : "OFF"}</p>
        <p className={`shadow-lg bg-white inline z-10 absolute top-[100%] p-2 rounded-md hidden peer-hover:block tool-tip-options text-gray-600 whitespace-nowrap font-semibold`}>Faster Animation</p>
      </div>    
    )
  }

  if(options.name === "DELAY") {
   return (
    <div className="flex flex-col items-center relative space-y-2 cursor-pointer">
      <div id={`${options.name}-option`} className="p-2 hover:bg-gray-200 showDelay peer rounded-md" onClick={() => setOpen(!open)}>
        {<options.icon className="scale-[1.2]"/>}
      </div> 
      <p className="font-semibold text-gray-500">{mainCanvasInputHandler.state.options?.delay}ms</p>
      <div className={`absolute transition-all duration-200 ease-in-out bg-white p-2 dark:bg-darkGray dark:border-lightDark rounded-md border-2 top-[100%] space-y-1 ${open ? "scale-100" : "scale-0 -translate-y-[1.9em]"}`}>
        <div className="flex dark:bg-darkGray dark:border-lightDark flex-col items-center justify-center">
          <SlideBar mainCanvas={mainCanvasInputHandler}/>
          <p className="themeFont dark:text-white">{mainCanvasInputHandler.state.options?.delay}</p>
        </div>
      </div>
      <p className={`shadow-lg bg-white inline z-10 absolute top-[100%] p-2 rounded-md hidden ${!open && "peer-hover:block"} tool-tip-options text-gray-600 whitespace-nowrap font-semibold`}>Animation Delay</p>
    </div>
   )
  }


  return (
    <div className="flex flex-col items-center relative space-y-2 cursor-pointer">
      <div id={`${options.name}-option`} className="p-2 hover:bg-gray-200 showDefaultBarColor rounded-md peer" onClick={() => { 
        setOpen(!open);
      }}>
        {<options.icon className="scale-[1.2]"/>}
      </div> 
      <div className={`h-3 w-3 rounded-full`} style={{backgroundColor: mainCanvasInputHandler.state.options[options.stateName]}}/>
      <div className={`options-dropdown transition-all duration-200 ease-in-out absolute bg-white dark:bg-darkGray dark:border-lightDark p-2 rounded-md border-2 top-[100%] space-y-1 ${open ? "scale-100" : "scale-0 -translate-y-[7em]"}`}>
        {CONSTANTS["CURRENT_MIN"].map((color) => (
          <div 
            key={color}
            style={{backgroundColor: color}} 
            className={`w-8 h-8 rounded-md hover:scale-[1.15] transition-all duration-200 ease-in-out ${color === 'white' && "border-2 border-gray-300"}`}
            onClick={() => { 
              mainCanvasInputHandler.setState(prev => ({options: {...prev.options, [options.stateName]: color, }}));
              setOpen(!open);
              let j = JSON.parse(localStorage.getItem("options"));
              j[options.stateName] = color;
              localStorage.setItem("options", JSON.stringify(j));
            }  
          }/>
        ))}
      </div>
      <p ref={ref} className={`shadow-lg bg-white z-10 absolute top-[100%] p-2 rounded-md hidden whitespace-nowrap ${!open && "peer-hover:block"} tool-tip-options text-gray-600 font-semibold`}>{options.tooltipMessage}</p>
    </div>
  )
}

export default Option