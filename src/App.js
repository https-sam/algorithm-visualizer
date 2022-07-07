import './App.css';
import React, {Component}    from 'react';
import {Strategy, changeRed} from './components/Strategy/Strategy'
import {Container}           from "./components/Container/Container";




/*
 class App extends Component {

 constructor(props) {
 super(props);
 this.changeRed = new changeRed();
 this.Strategy  = new Strategy().setStrategy = this.changeRed;
 }


 render() {
 return (
 <>
 <div className = "h-72 w-72 bg-blue-500" id = "bar" onClick = {this.Strategy.perform}></div>
 </>
 )
 }
 }
 */


class App extends Component {
	constructor(props) {
		super(props);
		this.changeRed = new changeRed();
		this.Strategy  = new Strategy().setStrategy = this.changeRed;
		this.triggerID = '';
	}


	render() {
		return (
			<div className = "App">
				<Container/>
			</div>
		);
	}
}



export default App;
