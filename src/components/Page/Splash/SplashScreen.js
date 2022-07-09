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
              <h1 className = "splash_title">{'Algorithm Visualizer'}<span>{'{}'}</span>
              </h1>
              <h2 className = "splash_subheading">
                <span>CU Boulder</span>
              </h2>
              <div className = "splash_Links">

              </div>
            </div>
          </div>
        </div>
        {/*-- background --*/}
      </>
  );
};

export default SplashScreen;