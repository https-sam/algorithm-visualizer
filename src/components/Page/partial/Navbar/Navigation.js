import React, {useState} from 'react';
import {Link}            from 'react-router-dom';
import './navbar.css';

import {Button} from '../GenericButton/Button';
import Dropdown from '../../../../Utility/Dropdown/Dropdown';
import ThemeToggle from './ThemeToggle';
import ToggleButton from 'rsuite/esm/Picker/ToggleButton';



/**
 * @Description: Navbar component for the application.
 *               @briandesignz/react-dropdown-menu
 *               https://www.youtube.com/watch?v=T2MhVxJxsL0&list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU&index=2
 * @returns {JSX.Element}
 * @constructor
 */
function Navigation({themeToggle}) {
  const [click, setClick]       = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick     = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);


  function onMouseEnter() {
    if (window.innerWidth < 800) {
      setDropdown(false);
    }
    else {
      setDropdown(true);
    }
  };


  function onMouseLeave() {
    if (window.innerWidth < 800) {
      setDropdown(false);
    }
    else {
      setDropdown(false);
    }
  };

  return (
      <>
        <nav id="navbar" className = {`navbar dark:bg-lightDark`}>
          <Link to = "/"
                className = {`navbar-logo dark:text-white`}
                onClick = {closeMobileMenu}
                id="navbar-title"
                >
            Algo Visualizer
            <i className = {'fab fa-firstdraft'}/>
          </Link>
          <div className = {'menu-icon'} onClick = {handleClick}>
            <i className = {click ? 'fas fa-times' : 'fas fa-bars'}/>
          </div>
          <ul className = {click ? 'nav-menu active' : 'nav-menu'}>
            <li className = {'nav-item'}>
              <Link to = "/"
                    className = {'nav-links dark:text-white dark:hover:text-lightDark'}
                    onClick = {closeMobileMenu}
                    >
                Home
              </Link>
            </li>
            <li
                className = {'nav-item'}
                onMouseEnter = {onMouseEnter}
                onMouseLeave = {onMouseLeave}
            >
              <Link
                  to = "/documentation"
                  className = {`nav-links dark:text-white dark:hover:text-lightDark`}
                  onClick = {closeMobileMenu}

              >
                Documentation <i className = {'fas fa-caret-down'}/>
              </Link>
              {dropdown && <Dropdown/>}
            </li>
            {/* <li className = {'nav-item'}>
              <Link
                  to = "/about"
                  className = {'nav-links dark:text-white dark:hover:text-lightDark'}
                  onClick = {closeMobileMenu}
              >
                About
              </Link>
            </li> */}
            {/* <li className = {'nav-item'}>
              <Link
                  to = "/contact"
                  className = {'nav-links dark:text-white dark:hover:text-lightDark'}
                  onClick = {closeMobileMenu}
              >
                Contact Us
              </Link>
            </li> */}
          </ul>
          {themeToggle && <ThemeToggle/>}
        </nav>
      </>
  );
}


export default Navigation;