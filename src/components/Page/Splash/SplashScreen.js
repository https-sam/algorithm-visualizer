import React      from 'react';
import './splash.css';
import Navigation from '../partial/Navbar/Navigation';



const SplashScreen = () => {

  return (
      <>
        {/*-- Start of background --*/}
        <div className = "splash_background">
          <div className = "splash_overlay">
            <div className = "splash_content">
              <h1 className = "splash_title">
                <span>{'{'}</span>{'Algorithm Visualizer'}<span>{'}'}</span>
              </h1>
              <h2 className = "splash_subheading">
                <span>CU Boulder</span>
              </h2>

              <ul className = "splash_list">
                <li><a href = "/dashboard"
                       className = "splash_link">
                  <span>{'Dashboard'}</span></a>
                </li>
                <li><a href = "/about"
                       className = "splash_link">
                  <span>{'About'}</span></a>
                </li>
                <li><a href = "/contact"
                       className = "splash_link">
                  <span>{'Contact'}</span></a>
                </li>
                {/*<li>
                 <a href = "/"
                 className = "splash_link">
                 <span>{'Home'}</span></a>
                 </li>*/}
                <li>
                  <a href = "/sorting-visualizer"
                     className = "splash_link">
                    <span>{'Sorting Algorithms'}</span></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/*-- End of background --*/}
      </>
  );
};

export default SplashScreen;