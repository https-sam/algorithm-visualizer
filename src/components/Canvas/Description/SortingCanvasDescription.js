import React from 'react'
import { ReactComponent as CPU } from '../../../img/cpu.svg'
import { ReactComponent as UnsortedBars } from '../../../img/unsortedBars.svg'
import { ReactComponent as SortedBars } from '../../../img/sortedBars.svg'
import { ReactComponent as Runner } from '../../../img/running.svg'
import { ReactComponent as Speed } from '../../../img/Speed.svg'
import { ReactComponent as Key } from '../../../img/key.svg'
import BoldParagraph from './BoldParagraph'
import NormalParagraph from './NormalParagraph'
import { InputHandler } from '../../InputHandler/InputHandler'


function SortingCanvasDescription() {
  return (
    <div className="z-10 self-center font-sans max-w-[90vw] text-gray-700 dark:text-white mt-10 xl:mt-0 md:pt-0">
      <p className="text-[1.5em] md:text-[2.8em] font-bold mb-5">Welcome to Sorting Visualizer</p>
      <div>
        <span className="font-medium text-[1.1em] text-gray-700 dark:text-textGray">Let's start by entering a number. It will generate an array with <BoldParagraph text="random numbers"/> based on the input.</span><br/>
        <span className="font-medium text-[1.1em] text-gray-700 dark:text-textGray">Next, select an <BoldParagraph text="algorithm"/> and press the <BoldParagraph text="play"/> button.</span>
      </div>

      <div className="mt-4">
        <span className="font-medium text-[1.1em] text-gray-700 dark:text-textGray">The maximum input is currently limited to <BoldParagraph text={InputHandler.getAllowedMaxInputSize()}/>. To play with a larger number, increase the window size and refresh the page.</span>
      </div>

      <div className="mt-[4em] mb-10">
        <p className="text-[1.3em] font-semibold">Options</p>
        <p className="m-3 font-medium text-[1em] text-gray-700 dark:text-textGray">*Some options are not available in some algorithms</p>
        <li className="list-none mt-5 space-y-3">
          <ul className="space-x-2"><UnsortedBars className="mr-2 dark:stroke-textGray stroke-[#7B7B7c] scale-[1.2] inline "/><BoldParagraph text="Unsorted"/><NormalParagraph text="bars color"/></ul>
          <ul className="space-x-2"><SortedBars className="mr-2 dark:stroke-textGray stroke-[#7B7B7c] scale-[1.2] inline "/><BoldParagraph text="Sorted"/><NormalParagraph text="bars color"/></ul>
          <ul className="space-x-2"><CPU className="mr-2 dark:stroke-textGray stroke-[#7B7B7c] scale-[1.2] inline "/><BoldParagraph text="Processing"/><NormalParagraph text="bars color"/></ul>
          <ul className="space-x-2"><Key className="mr-2 dark:stroke-textGray stroke-[#7B7B7c] scale-[1.2] inline "/><BoldParagraph text="Key"/><NormalParagraph text="bars color"/></ul>
          <ul className="space-x-2"><Speed className="mr-2 dark:stroke-textGray stroke-[#7B7B7c] scale-[1.2] inline "/><NormalParagraph text="Animation"/><BoldParagraph text="delay"/></ul>
          <ul className="space-x-2"><Runner className="mr-2 dark:stroke-textGray stroke-[#7B7B7c] scale-[1.2] inline "/><BoldParagraph text="Faster"/><NormalParagraph text="animation (skips some animations)"/> </ul>
        </li>
      </div>
    </div>
  )
}

export default SortingCanvasDescription