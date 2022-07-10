import React  from 'react';
import './button.css';
import {Link} from 'react-router-dom';



export function Button(props) {
  return (
      <Link to = {props.ref}>
        <button className = "btn"><span className={props.style}>{props.value}</span></button>
      </Link>
  );
}