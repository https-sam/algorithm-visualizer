import React, {useState} from 'react';
import {DescriptorItems} from '../Navigation_Descriptor';
import './dropdown.css';
import {Link}            from 'react-router-dom';



/**
 * @Description: This is the dropdown menu that is used in the navigation bar.
 *                @briandesignz/react-dropdown-menu is used to create the dropdown menu.
 * @returns {JSX.Element}
 * @constructor
 */
function Dropdown() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
      <>
        <ul
            onClick = {handleClick}
            className = {click ? 'dropdown-menu clicked' : 'dropdown-menu'}
        >
          {DescriptorItems.map((item, index) => {
            return (
                <li key = {index}>
                  <Link
                      className = {item.class}
                      to = {item.path}
                      onClick = {() => setClick(false)}
                  >
                    {item.title}
                  </Link>
                </li>
            );
          })}
        </ul>
      </>
  );
}


export default Dropdown;