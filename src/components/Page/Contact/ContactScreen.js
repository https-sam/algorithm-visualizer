import React      from 'react';
import './contact.css';
import '../Splash/splash.css';
import Navigation from '../partial/Navbar/Navigation';



const ContactScreen = () => {

  return (
      <>
        <Navigation/>

        <div className = "splash_background">
          <div className = "splash_overlay">
            <div className = "splash_content">
              <div className = "contact-screen">
                <div className = "contact-screen-text">
                  <h1>Contact Us</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
};

export default ContactScreen;