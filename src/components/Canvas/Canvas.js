import React, { Component } from 'react'

class Canvas extends Component {
  
  constructor(props) {
    super(props);
  }


  render() {
    const { generatedArray } = this.props;
    const arrayLength = generatedArray.length;
    const MARGIN = 2;
    const SCREEN_WIDTH = window.innerWidth;
    const BAR_WIDTH = Math.floor((SCREEN_WIDTH - (MARGIN*arrayLength)) / arrayLength);


    return (
      <div className="w-full flex justify-center mt-[4em]">
        <div className="flex items-end">
          {generatedArray.map((element) => {
            return <div key={Math.random()} style={{height: element+'px', width: BAR_WIDTH+'px'}} className={`bg-red-400 m-[1px]`}/>
          })}
        </div>
      </div>
    )
  }
}

export { Canvas }