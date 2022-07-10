import {Component} from 'react';
import Box         from '../../modals/cube/Box';



const Cell = (fArgs) => {
  const id    = fArgs.id;
  const value = fArgs.value;
  const onClick = fArgs.onClick;
  return (
      <Box size = {fArgs.size}/>
  );

};

export default Cell;