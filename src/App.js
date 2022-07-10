import './App.css';
import React, {Component}    from 'react';
import {Canvas}              from 'react-three-fiber';
import {Strategy, changeRed} from './components/Strategy/Strategy';
import {InputField}          from './components/Canvas/InputField.js';
import MainCanvas            from './components/Canvas/MainCanvas';
import SelectionSort         from './components/Strategy/Algorithms/SelectionSort';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
}                            from 'react-router-dom';
import Header                from './partial/Header';
import Selection             from './partial/Selection';
import Footer                from './partial/Footer';
import SplashScreen          from './components/Page/Splash/SplashScreen';
import {Routes}              from 'react-router';
import Box                   from './modals/cube/Box';



{/* Placeholder for the About page */}


function About() {
  return null;
}



class App extends Component {

  constructor(props) {
    super(props);
  }


  render() {

    return (
        <>
            <Router>
              {/*<Layout>*/}
              <Routes>

                <Route exact path = "/about" element = {<About/>}/>
                <Route exact path = "/home" element = {<MainCanvas/>}/>
                <Route exact path = "/" element = {<SplashScreen/>}/>
                {/*<Route exact path = "/" element = {<MainCanvas/>}/>*/}
              </Routes>
              {/*<Box/>*/}
            </Router>
            <div className = "App">
              <Header/>
              <Selection/>
              <Footer/>
            </div>

        </>
    );

  }
}



export default App;
