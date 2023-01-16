import React      from 'react';
import './about.css';
import '../Splash/splash.css';
import Navigation from '../partial/Navbar/Navigation';



const AboutScreen = () => {

  return (
      <>
        <Navigation/>
        <div className = "splash_background">
          <div className = "splash_overlay">
            <div className = "splash_content">
              <div className = "about-screen">
                <div className = "about-screen-text">
                  <h1>About</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
};

export default AboutScreen;