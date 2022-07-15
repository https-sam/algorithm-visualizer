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
    Animation.myAudioContext = new AudioContext();
  }


  /**
   * takes indecies to be swapped
   * @param {Integer} i
   * @param {Integer} k
   */
  static swap(i, k) {
    let unSortedBars                       = document.querySelectorAll('.array-bars');
    var oldHeight                              = unSortedBars[k].style.height;
    unSortedBars[k].style.height = unSortedBars[i].style.height;
    unSortedBars[i].style.height           = oldHeight;

    var oldID                    = unSortedBars[k].id;
    unSortedBars[k].id = unSortedBars[i].id;
    unSortedBars[i].id           = oldID; // SG 07/11/2022 09:27  temp1

    var oldContent = unSortedBars[i].getAttribute("data");
    unSortedBars[i].setAttribute("data", unSortedBars[k].getAttribute("data"));
    unSortedBars[k].setAttribute("data", oldContent); // SG 07/11/2022 09:27  temp1

  }


  static async getAnimation(delay) {
    if (!Animation.stop) {
    await new Promise((resolve) =>
      Animation.threads.push(setTimeout(() => {
        resolve();
      }, delay)));
    }
  }

  static async makeBeep(vol, freq, duration){
      
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
          let firstBarHeight = parseInt(arrayBars[firstBarI].style.height.replace('px', ''));
          var fontSize = arrayBars[firstBarI].getAttribute('font-size');

          // SG 07/13/2022 16:22  making sure that larger font does not overflow, so it height is not enough, set conetnt empty
          if(firstBarHeight-10 > fontSize && parseInt((arrayBars[firstBarI].style.width).replace("px", '')) > 25 ) {
            arrayBars[firstBarI].setAttribute('data', swapHeight);
          } else {
            arrayBars[firstBarI].setAttribute('data', '');
          }
          arrayBars[firstBarI].id = swapHeight;
        }, i * delay);
      }
    }
  }


}



export {Animation};