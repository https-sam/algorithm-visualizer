import React, { useEffect, useState } from 'react'
import { ReactComponent as Triangle } from '../../img/triangle.svg'
import { MergeSort } from '../Strategy/Algorithms/MergeSort';
import { RadixSortLSD } from '../Strategy/Algorithms/RadixSortLSD';
import { QuickSort } from '../Strategy/Algorithms/QuickSort.js'
import SelectionSort from '../Strategy/Algorithms/SelectionSort';
import { HeapSort } from '../Strategy/Algorithms/Heapsort';
import { ShellSort } from '../Strategy/Algorithms/ShellSort';
function AlgorithmSelection({strategy, options}) {

  const [currentAlgo, setCurrentAlgo] = useState(options.state.algorithm);
  const [showDropdown, setShowDropdown] = useState(null);
  const Radix = new RadixSortLSD();
  const Merge = new MergeSort();
  const Selection = new SelectionSort();
  const Quick = new QuickSort();
  const Heap = new HeapSort();
  const Shell = new ShellSort();

  useEffect(() => {
    var dropdown = document.getElementById('algo-selection-dropdown');
    document.addEventListener('click', (event) => {
        var isClickInsideElement = dropdown.contains(event.target);
        if (!isClickInsideElement) {
          setShowDropdown(false);
        }
      });
  }, [setShowDropdown])

  useEffect(() => { // SG 07/12/2022 11:12  setting initial strategy 
    if(currentAlgo === "Radix") strategy.setStrategy = Radix;
    else if(currentAlgo === "Merge") strategy.setStrategy = Merge;
    else if(currentAlgo === "Selection") strategy.setStrategy = Selection;
    else if(currentAlgo === "Quick") strategy.setStrategy = Quick;
    else if(currentAlgo === "Heap") strategy.setStrategy = Heap;
    else if(currentAlgo === "Shell") strategy.setStrategy = Shell;
  }, [])



  return (
    <div className="relative self-center">
      <div id="algo-selection-dropdown" className="w-[9.5em] text-[.95em] h-[2.8em] dark:bg-gray-600 bg-gray-500 dark:hover:bg-gray-700 hover:bg-gray-600 rounded-md flex items-center justify-around cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <p className="text-white font-semibold ml-2">{currentAlgo} Sort</p>
        <Triangle className={`h-5 transition-all duration-200 ease-in-out scale-[.5] ${showDropdown ? "rotate-0" : "rotate-180"}`}/>
      </div>

      {/* Dropdown menu */}
      <div className={`transition-all duration-200 ease-in-out absolute h-[fit] w-[9.5em] text-[.95em] dark:bg-gray-600 bg-gray-500 top-[3.9em] rounded-md z-20 ${showDropdown ? "scale-100" : "scale-[0] -translate-y-[8em]"} `}>
        <div className={`${currentAlgo === 'Radix' && 'bg-gray-200'} group cursor-pointer w-full dark:hover:bg-gray-700 hover:bg-gray-600 rounded-t-md font-semibold text-white h-[2.8em] flex items-center justify-start pl-4`}
          onClick={() => {
            setCurrentAlgo('Radix');
            options.setState({algorithm: "Radix"});
            strategy.setStrategy = Radix;
            localStorage.setItem("algorithm", "Radix");
            setShowDropdown(!showDropdown);
          }}
          >
          <p className={`${currentAlgo === 'Radix' && 'text-black group-hover:text-white'}`}>Radix Sort</p>
        </div>

        <div className={`${currentAlgo === 'Heap' && 'bg-gray-200'} group cursor-pointer w-full hover:bg-gray-700 font-semibold text-white h-[2.8em] flex items-center justify-start pl-4`}
          onClick={() => {
            setCurrentAlgo('Heap');
            options.setState({algorithm: "Heap"});
            strategy.setStrategy = Heap;
            localStorage.setItem("algorithm", "Heap");
            setShowDropdown(!showDropdown)
          }}
        >
          <p className={`${currentAlgo === 'Heap' && 'text-black group-hover:text-white'}`}>Heap Sort</p>
        </div>

        <div className={`${currentAlgo === 'Quick' && 'bg-gray-200'} group cursor-pointer w-full hover:bg-gray-700 font-semibold text-white h-[2.8em] flex items-center justify-start pl-4`}
          onClick={() => {
            setCurrentAlgo('Quick');
            options.setState({algorithm: "Quick"});
            strategy.setStrategy = Quick;
            localStorage.setItem("algorithm", "Quick");
            setShowDropdown(!showDropdown)
          }}
        >
          <p className={`${currentAlgo === 'Quick' && 'text-black group-hover:text-white'}`}>Quick Sort</p>
        </div>
        
        <div className={`${currentAlgo === 'Merge' && 'bg-gray-200'} group cursor-pointer w-full hover:bg-gray-700 font-semibold text-white h-[2.8em] flex items-center justify-start pl-4`}
          onClick={() => {
            setCurrentAlgo('Merge');
            options.setState({algorithm: "Merge"});
            strategy.setStrategy = Merge;
            localStorage.setItem("algorithm", "Merge");
            setShowDropdown(!showDropdown)
          }}
        >
          <p className={`${currentAlgo === 'Merge' && 'text-black group-hover:text-white'}`}>Merge Sort</p>
        </div>
 

        <div className={`${currentAlgo === 'Shell' && 'bg-gray-200'} group cursor-pointer w-full hover:bg-gray-700 font-semibold text-white h-[2.8em] flex items-center justify-start pl-4`}
          onClick={() => {
            setCurrentAlgo('Shell');
            options.setState({algorithm: "Shell"});
            strategy.setStrategy = Shell;
            localStorage.setItem("algorithm", "Shell");
            setShowDropdown(!showDropdown)
          }}
        >
          <p className={`${currentAlgo === 'Shell' && 'text-black group-hover:text-white'}`}>Shell Sort</p>
        </div>
        

        <div className={`${currentAlgo === 'Selection' && 'bg-gray-200'} group cursor-pointer w-full rounded-b-md  hover:bg-gray-700 font-semibold text-white h-[2.8em] flex items-center justify-start pl-4`}
          onClick={() => {
            setCurrentAlgo('Selection');
            options.setState({algorithm: "Selection"});
            localStorage.setItem("algorithm", "Selection");
            strategy.setStrategy = Selection;
            setShowDropdown(!showDropdown)
          }}
        >
          <p className={`${currentAlgo === 'Selection' && 'text-black group-hover:text-white'}`}>Selection Sort</p>
        
        </div>
      </div>
    </div>
  )
}

export default AlgorithmSelection