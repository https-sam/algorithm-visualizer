import React, { useState } from 'react'

function SlideBar(props) {
  const [value, setValue] = useState(0);
  const MAX = 200;
  const getBackgroundSize = () => {
    return {
      backgroundSize: `${(value * 100) / MAX}% 100%`,
    };
  };

  return (
    <div className="flex dark:bg-darkGray dark:border-lightDark font-themeFont">
      <input
      className="themeFont dark:text-white"
      type="range"
      min="4"
      max={MAX}
      onChange={(e) => {
        setValue(e.target.value)
        props.mainCanvas.setState(prev => ({options: {...prev.options, delay: value, }}))
        let j = JSON.parse(localStorage.getItem('options'));
        j.delay = value;
        localStorage.setItem('options', JSON.stringify(j));
      }}
      style={getBackgroundSize()}
      value={value}
      />
    </div>
  )
}

export default SlideBar