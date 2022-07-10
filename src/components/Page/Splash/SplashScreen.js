import React from 'react';
import './splash.css';
import './cu-icon.png';
import './background.jpg';



const SplashScreen = () => {

  return (
      <>
        <div className = "splash_background"> {/*-- background --*/}
          <div className = "splash_overlay">
            <div className = "splash_content">
              <h1 className = "splash_title"><span>{'{'}</span>{'Algorithm Visualizer'}<span>{'}'}</span>
              </h1>
              <h2 className = "splash_subheading">
                <span>CU Boulder</span>
              </h2>
              <ul className = "splash_list">
                <li><a href = "/about" className = "splash_link"><span>{'About'}</span></a></li>
                <li><a href = "/contactUs" className = "splash_link"><span>{'Contact'}</span></a></li>
                <li><a href = "/home" className = "splash_link"><span>{'Home'}</span></a></li>
              </ul>
            </div>
          </div>
        </div>
        {/*-- background --*/}
      </>
  );
};

export default SplashScreen;