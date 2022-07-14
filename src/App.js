import React, {Component} from 'react';
// import {Canvas, useFrame} from '@react-three/fiber';

// import {Strategy /*changeRed*/} from './components/Strategy/Strategy';
// import {InputField}             from './components/Canvas/InputField.js';
// import MainCanvas               from './components/Canvas/MainSortingCanvas';
// import SelectionSort            from './components/Strategy/Algorithms/SelectionSort';

// import Header       from './components/Page/partial/Header';
// import Selection    from './components/Page/partial/Selection';
// import Footer       from './components/Page/partial/Footer';
// import SplashScreen from './components/Page/Splash/SplashScreen';
// import Box          from './modals/cube/Box';
// import Cell         from './components/Board/Cell';
import AppRouter    from './AppRouter';



{/* Placeholder for the About page */}



class App extends Component {

  constructor(props) {
    super(props);
  }


  render() {



    return (
        <div className = "App h-screen dark:bg-lightGray">
         
         <AppRouter/>

         </div>

        // TESTING PURPOSES: CELL COMPONENT
        // <Canvas>
        //   <Cell id = {1}
        //         value = {1}
        //         size = {1}
        //         position = {[0, 0, 0]}
        //   />
        // </Canvas>
    );
  }
}



export default App;
