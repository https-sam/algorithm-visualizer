import React, { Component } from 'react'
import { Strategy } from '../Strategy';
import { Animation } from '../../Animation/Animation';


export default class SelectionSort  {
  
  constructor() {
    this.Animation = new Animation();
    this.options = {};
    this._delay = 4;
  }


  async perform(options) {
    console.log(options);
    console.log(options)
    const DEFAULT = options.defaultBarColor;
    const PROCESSING = options.processingColor;
    const SORTAED = options.sortedBarColor;
    const CURRENT_MIN = options.currentMinBarColor;
    const DELAY = 4;
    let unSortedBars = document.querySelectorAll('.array-bars');
    let minBarIndex = 0;

    for(var i = 0; i < unSortedBars.length; i++) {
      if(Animation.stop) break;
      // SG 07/08/2022 15:01 animation for i iterationå
      await Animation.getAnimation(options.delay);
      
      minBarIndex = i;
        for(var j = i + 1; j < unSortedBars.length; j++) {
          // original color
          for(let k = j; k < unSortedBars.length; k++) {
            unSortedBars[k].style.backgroundColor = DEFAULT;
          }

          // SG 07/08/2022 15:01 animation for j iteration - can be removed for faster animation
          if(!options.skipJ) {
            await Animation.getAnimation(options.delay);
          }

          var currentMinBar = parseInt(unSortedBars[minBarIndex].id);
          var currentNum = parseInt(unSortedBars[j].id);


          // SG 07/07/2022 21:19  fins min value in the rest of the array          
          if (currentNum < currentMinBar) {
            if (minBarIndex !== i) {
              unSortedBars[minBarIndex].style.backgroundColor = PROCESSING;
            }
            minBarIndex = j;
            unSortedBars[j].style.backgroundColor = CURRENT_MIN;
          } else {

            unSortedBars[j].style.backgroundColor = PROCESSING;
          }
        }

        // SG 07/08/2022 13:09  SWAP Animation - swaps element id and height
        this.Animation.swap(i, minBarIndex);
    
        unSortedBars[i].style.backgroundColor = SORTAED;  
    }
    console.log(unSortedBars);
  }
}
