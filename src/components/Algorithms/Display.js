import {Component}        from 'react';
import {Canvas, useFrame} from '@react-three/fiber';



export class Display extends Component {
  constructor(fArgs) {
    super(fArgs);
    this.state = {
      displayType: fArgs.displayType,
      algorithm  : fArgs.algorithm,
      dataString : fArgs.dataString,
      width      : fArgs.innerWidth,
      height     : fArgs.innerHeight,
      aspect     : fArgs.aspect,
      perspective: fArgs.perspective,
    };
  }


  componentDidMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }


  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }


  handleWindowSizeChange = () => {
    this.setState({width: window.innerWidth, height: window.innerHeight});
  };


  render() {
    const {width, height} = this.state;
    const aspect          = width / height;
    return (
        <Canvas children = {}>

        </Canvas>
    );
  };
}