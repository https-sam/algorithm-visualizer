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
            className = {`${click ? 'dropdown-menu clicked ' : 'dropdown-menu'}`}
        >
          {DescriptorItems.map((item, index) => {
            return (
                <li key = {index} className="bg-gray-300 hover:bg-gray-400 dark:bg-lightDark dark:hover:bg-darkGray">
                  <Link
                      className = {`${item.class} text-gray-700 dark:text-gray-200 fontFamily-themeFont font-bold`}
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