import {Document} from 'postcss';



class Animation {
  static timeouts = [];

  constructor() {
    // SG 07/09/2022 15:11  Singleton pattern
    if (Animation._instance) {
      return Animation._instance;
    }
    Animation._instance = this;
    Animation.stop      = false;
  }


  // SG 07/07/2022 22:00  define differnet animaitons here and call it in sorting algorithms

  static async clearTimeout() {
    Animation.stop = true;
    for (const timeout of Animation.timeouts) {
      await this.clearTimeout(timeout);
    }
  }


  /**
   * takes indecies to be swapped
   * and swaps them in the dom tree
   * modifies: height, id, data (height value to be displayed in bar)
   * @param {Integer} i
   * @param {Integer} k
   */

  static swap(i, k) {
    let unSortedBars                       = document.querySelectorAll('.array-bars');
    var oldHeight                          = unSortedBars[k].style.height;
    unSortedBars[k].style.height = unSortedBars[i].style.height;
    unSortedBars[i].style.height           = oldHeight;

    var oldID                    = unSortedBars[k].id;
    unSortedBars[k].id = unSortedBars[i].id;
    unSortedBars[i].id           = oldID;

    var oldContent = unSortedBars[i].getAttribute("data");
    unSortedBars[i].setAttribute("data", unSortedBars[k].getAttribute("data"));
    unSortedBars[k].setAttribute("data", oldContent); 
  }



  static changeHeight(i, value, oldIndex) {
    let unSortedBars                       = document.querySelectorAll('.array-bars');    
    unSortedBars[i].style.height           = value+'px';
    unSortedBars[i].id           = value;
    unSortedBars[i].setAttribute("data", unSortedBars[oldIndex].getAttribute("data"));
  }


  static async getAnimation(delay) {
    if (!Animation.stop) {
    await new Promise((resolve) =>
      Animation.timeouts.push(setTimeout(() => {
        resolve();
      }, delay)));
    }

  }

  static getTimeouts() {
    return Animation.timeouts;
  }



  static async makeBeep(vol, freq, duration){
      
  }

   

  static async animateMerge(options, animation) {
    const delay = options.delay;
    const processingColor = options.processingColor;
    const defaultColor = options.sortedBarColor;

    for (let i = 0; i < animation.length; i++) {
      await Animation.getAnimation(delay);
      const arrayBars = document.querySelectorAll('.array-bars');
      if (i % 3 !== 2) { // SG 07/10/2022 16:52  animate colors
        const [firstBar, secondBar] = animation[i];
        const color = i % 3 === 0 ? processingColor : defaultColor;

        arrayBars[firstBar].style.backgroundColor = color;
        arrayBars[secondBar].style.backgroundColor = color;

      } else { // SG 07/10/2022 16:52  animate height
          const [firstBarI, swapHeight] = animation[i];
          arrayBars[firstBarI].style.height = swapHeight + "px";
          let firstBarHeight = parseInt(arrayBars[firstBarI].style.height.replace('px', ''));
          var fontSize = arrayBars[firstBarI].getAttribute('font-size');

          // SG 07/13/2022 16:22  making sure that larger font does not overflow, so it height is not enough, set conetnt empty
          if(firstBarHeight-10 > fontSize && parseInt((arrayBars[firstBarI].style.width).replace("px", '')) > 25 ) {
            arrayBars[firstBarI].setAttribute('data', swapHeight);
          } else {
            arrayBars[firstBarI].setAttribute('data', '');
          }
          arrayBars[firstBarI].id = swapHeight;
        }
    }
  }
}



export {Animation};