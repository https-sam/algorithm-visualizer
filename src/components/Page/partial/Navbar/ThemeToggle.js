import React, { useEffect, useState } from 'react'
import { ReactComponent as Moon } from '../../../../img/moon.svg'
import { ReactComponent as Sun } from '../../../../img/sun.svg'

const ThemeToggle = () => {
  const [night, setNightMode] = useState(false);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('dark')) || night) {
      document.documentElement.classList.add('dark');
      setNightMode(true);
    } else {
      document.documentElement.classList.remove('dark')
      setNightMode(false);
    }
  }, [night])

  return (
    <div className={`${night ? 'bg-gradient-to-r from-gray-900 to-gray-800' : "bg-gradient-to-r from-gray-300 to-white"} w-[3.5em] h-[36px] bg-white rounded-full relative border-[2px] border-gray-400`} 
    onClick={() => { 
      setNightMode(!night)
      localStorage.setItem("dark", !night);
    }}>
      <div className={`transition-all duration-300 ease-in-out absolute w-[28px] h-[28px] bg-gray-100 shadow-sm ${night ? "top-[.1em] translate-x-[1.75em] shadow-black" : " shadow-gray-400 top-[.1em] translate-x-[.1em]"} rounded-full`}>
        <div className={`transition-all duration-300 ease-in-out absolute w-[26px] h-[26px] bg-gray-200 top-[3%] left-[7%] rounded-full flex items-center justify-center`}>
          {night ? <Moon className={`text-gray-800 scale-[.8]`}/> : <Sun className={`text-gray-500 scale-[.8]`}/>}
        </div>
      </div>
    </div>
  )
}

export default ThemeToggle