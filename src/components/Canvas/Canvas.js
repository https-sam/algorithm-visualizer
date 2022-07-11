import React, { Component } from 'react'
import { CONSTANTS }        from '../../Utility/config.js';

class Canvas extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    const { generatedArray } = this.props;
    const arrayLength = generatedArray.length;
    const MARGIN = CONSTANTS.margin;
    const SCREEN_WIDTH = window.innerWidth;
    const BAR_WIDTH = Math.floor((SCREEN_WIDTH - (MARGIN*arrayLength)) / arrayLength);
    const CANVAS_HEIGHT = window.innerHeight - CONSTANTS.OFFSET+"px";


    return (
      <div className={`w-full flex justify-center mt-[4em]`} style={{minHeight:CANVAS_HEIGHT}}>
        <div className="flex items-end">
          {generatedArray.map((element) => {
            return <div id={`${element}`} key={Math.random()} style={{height: element+'px', width: BAR_WIDTH+'px', backgroundColor: this.props.barColor}} className={`array-bars m-[1px] rounded-t-md`}/>
          })}
        </div>
      </div>
    );
  }
}



export {Canvas}