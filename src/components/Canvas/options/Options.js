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
import Option from './Option';


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


  render() {

    const { algorithm, animating } = this.props;

    const optionItems = [
      {
        name: "DEFAULT",
        stateName: "defaultBarColor",
        icon: UnsortedBars,
        hasDropDown: true,
        tooltipMessage: "Unsorted bars color",
      },
      {
        name: "SORTED",
        stateName: "sortedBarColor",
        icon: SortedBars,
        hasDropDown: true,
        tooltipMessage: "Sorted bars color"
      },
      {
        name: "PROCESSING",
        stateName: "processingColor",
        icon: CPU,
        hasDropDown: true,
        tooltipMessage: `${algorithm === 'Quick' ? "Left and Right pointers color" : "Processing bars color"}`,
      },
      {
        name: "CURRENT_MIN",
        stateName: "currentMinBarColor",
        icon: Key,
        hasDropDown: true,
        tooltipMessage: `${algorithm === 'Quick' ? "Pivot color" : "Current optimum bar color"}`,
      },
      {
        name: "DELAY",
        stateName: "delay",
        icon: Speed,
        hasDropDown: true,
        tooltipMessage: "Animation delay",
      },
      {
        name: "SPEEDUP",
        stateName: "skipJ",
        icon: Runner,
        hasDropDown: false,
        tooltipMessage: "Faster animation",
      },
    ];
    
    
    return (
      <div className="rounded-md z-20">
        <div className="w-fit flex space-x-5">
          {optionItems.map((option) => (
            <Option animating={animating} options={option} mainCanvasInputHandler={this.props.options} key={option.name} algorithm={algorithm}/>
          ))}
        </div>        
      </div>
    )
  }
}

export { Options }