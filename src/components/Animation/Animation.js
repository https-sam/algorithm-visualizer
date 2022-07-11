import {Document} from 'postcss';



class Animation {

  constructor() {
    Animation.threads = [];
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
    for (const timeout of Animation.threads) {
      await this.clearTimeout(timeout);
    }
  }


  /**
   * takes indecies to be swapped
   * @param {Integer} i
   * @param {Integer} minBarIndex
   */
  swap(i, minBarIndex) {
    let unSortedBars                       = document.querySelectorAll('.array-bars');
    var temp1                              = unSortedBars[minBarIndex].style.height;
    unSortedBars[minBarIndex].style.height = unSortedBars[i].style.height;
    unSortedBars[i].style.height           = temp1;

    var temp2                    = unSortedBars[minBarIndex].id;
    unSortedBars[minBarIndex].id = unSortedBars[i].id;
    unSortedBars[i].id           = temp1;
  }


  static async getAnimation(delay) {
    if (!Animation.stop) {
    await new Promise((resolve) =>
      Animation.threads.push(setTimeout(() => {
        resolve();
      }, delay)));
    }
  }

  static animateMerge(options, animation) {
    const delay = options.delay;
    const processingColor = options.processingColor;
    const defaultColor = options.sortedBarColor;


    for (let i = 0; i < animation.length; i++) {
      const arrayBars = document.querySelectorAll('.array-bars');
      if (i % 3 !== 2) { // SG 07/10/2022 16:52  animate colors
        const [firstBar, secondBar] = animation[i];
        const color = i % 3 === 0 ? processingColor : defaultColor;
        setTimeout(() => {
          arrayBars[firstBar].style.backgroundColor = color;
          arrayBars[secondBar].style.backgroundColor = color;
        }, i * delay);
      } else { // SG 07/10/2022 16:52  animate height
        setTimeout(() => {
          const [firstBarI, swapHeight] = animation[i];
          arrayBars[firstBarI].style.height = swapHeight + "px";
        }, i * delay);
      }
    }
  }


}



export {Animation};