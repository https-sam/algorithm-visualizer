import React, { Component } from 'react'
import { CONSTANTS }        from '../../Utility/config.js';
import ShowValue from './ShowValue.js';
import SortingCanvasDescription from './Description//SortingCanvasDescription.js';
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
    const MARGIN_BTW_CANVAS_AND_OPTIONS = 146;
    const CANVAS_HEIGHT = window.innerHeight - CONSTANTS.OFFSET + MARGIN_BTW_CANVAS_AND_OPTIONS +"px";
    const FONT_SIZE = Math.floor(BAR_WIDTH * 0.4);

    const PINK = "#ff595e";
    const PURPLE = "#6a4c93";


    return (
      <div className={`w-full flex justify-center dark:bg-gradient-to-b from-lightGray to-richBlue relative`} style={{minHeight:CANVAS_HEIGHT}}>
        <p className="absolute top-3 font-medium text-red-600 " id="sort-canvas-error-msg"></p>
        <div className="flex items-end z-1">
          {arrayLength > 1 ? generatedArray.map((element) => {
            return (
              <div id={`${element}`} fontSize={FONT_SIZE} data={`${(BAR_WIDTH > 25 && element > FONT_SIZE+16 && showHeight) ? element : ''}`} length="40px" key={Math.random()} style={{"--bar-font-size" :FONT_SIZE+"px", height: element+'px', width: BAR_WIDTH+'px', backgroundColor: this.props.barColor}} 
                className={`array-bars z-10 m-[1px] rounded-t-md relative ${(defaultBarColor !== PINK && defaultBarColor !== PURPLE && defaultBarColor !== 'black') ? "after:text-gray-700" : "after:text-white"}`}/>
              )
          }) : <SortingCanvasDescription/>}
        </div>
        <div className="main-canvas-grid z-0 dark:opacity-[0.03]"/>
      </div>
    );
  }
}



export {Canvas}