import React, { useState } from 'react'

function SlideBar(props) {
  const [value, setValue] = useState(0);
  const MAX = 30;
  const getBackgroundSize = () => {
    return {
      backgroundSize: `${(value * 100) / MAX}% 100%`,
    };
  };

  return (
    <div className="flex">
      <input
      type="range"
      min="4"
      max={MAX}
      onChange={(e) => {
        setValue(e.target.value)
        props.mainCanvas.setState({options: {delay: value}})
      }}
      style={getBackgroundSize()}
      value={value}
      />
    </div>
  )
}

export default SlideBar