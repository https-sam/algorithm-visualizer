import React, { Component } from 'react'
import { CONSTANTS }        from '../../Utility/config.js';
import ShowValue from './ShowValue.js';
import './style.css'
class Canvas extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    const { generatedArray, showHeight, defaultBarColor } = this.props;

    const arrayLength = generatedArray.length;
    const MARGIN = CONSTANTS.margin;
    const SCREEN_WIDTH = window.innerWidth;
    const BAR_WIDTH = Math.floor((SCREEN_WIDTH - (MARGIN*arrayLength)) / arrayLength);
    const MARGIN_BTW_CANVAS_AND_OPTIONS = 140;
    const CANVAS_HEIGHT = window.innerHeight - CONSTANTS.OFFSET + MARGIN_BTW_CANVAS_AND_OPTIONS +"px";
    const FONT_SIZE = Math.floor(BAR_WIDTH * 0.4);

    const PINK = "#ff595e";
    const PURPLE = "#6a4c93";

    console.log(defaultBarColor)

    return (
      <div className={`w-full flex justify-center dark:bg-lightGray relative`} style={{minHeight:CANVAS_HEIGHT}}>
        
        <div className="flex items-end">
          {generatedArray.map((element) => {
            return (
              <div id={`${element}`} fontSize={FONT_SIZE} data={`${(BAR_WIDTH > 25 && element > FONT_SIZE+16 && showHeight) ? element : ''}`} length="40px" key={Math.random()} style={{"--bar-font-size" :FONT_SIZE+"px", height: element+'px', width: BAR_WIDTH+'px', backgroundColor: this.props.barColor}} 
              className={`array-bars m-[1px] rounded-t-md relative ${(defaultBarColor !== PINK && defaultBarColor !== PURPLE && defaultBarColor !== 'black') ? "after:text-gray-700" : "after:text-white"}`}>
                {/* {(BAR_WIDTH > 38 && element > FONT_SIZE+16) && <p className={`text-center font-bold text-gray-800`} style={{fontSize: FONT_SIZE+"px"}}>{element}</p>}   */}
              </div>
              )

          })}
        </div>
      </div>
    );
  }
}



export {Canvas}