import React, { Suspense, useEffect } from 'react';
import './splash.css';
import Navigation from '../partial/Navbar/Navigation';
import { useNavigate } from 'react-router-dom'

const Spline = React.lazy(() => import('@splinetool/react-spline'));

const SplashScreen = () => {

  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    
    if(document.getElementById('navbar')) {
      document.getElementById('navbar').style.backgroundColor = "#121824"
    }
  }, [])

 const navigate = useNavigate();

  return (
      <>
      <Navigation themeToggle={false}/>
      <div className="bg-homeGray relative flex justify-end min-h-screen min-w-screen">
        <p className="font-lg text-white absolute text-[6vh] z-10 top-[15vh] left-[5vw] font-semibold font-spline">Algo Visualizer</p>
        <p className="font-spline absolute top-[30vh] left-[5vw] text-[1.2em] z-10 text-gray-100">Improve your understanding of algorithms just by watching simple and completely customizable animations. <br/>
        Welcome to the algo visualizer.</p>
        <div className="hidden md:block md:scale-[.7] z-1 md:translate-x-[150px] lg:translate-x-[17px] lg:scale-[.9] xl:scale[1] w-fit">
          <Suspense fallback={<></>}>
            <Spline scene="https://prod.spline.design/qblRNAa3C-eNH6Bo/scene.splinecode" />
          </Suspense>
        </div>

        <div className="absolute top-[50vh] left-[5vw] flex flex-col gap-5">
          <div className="hover:shadow-custom-md-lightBlue cursor-pointer font-semibold  text-white font-spline bg-lightBlue2 p-[.9em] text-[1.1em] rounded-md"
          onClick={() => navigate('/sorting-visualizer')}
          >Sorting Algorithms</div>


          <div className="hover:shadow-custom-md-lightBlue cursor-pointer font-semibold  text-white font-spline bg-lightBlue2 p-[.9em] text-[1.1em] rounded-md"
          onClick={() => navigate('/sorting-visualizer')}
          >Path Finding Algorithms</div>
          </div>
        </div>



        {/*-- Start of background --*/}
        {/* <div className = "splash_background">
          <div className = "splash_overlay">
            <div className = "splash_content">
              <h1 className = "splash_title">
                <span>{'{'}</span>{'Algorithm Visualizer'}<span>{'}'}</span>
              </h1>
              <h2 className = "splash_subheading">
                <span>CU Boulder</span>
              </h2>
              <ul className = "splash_list">
                <li><a href = "/about"
                       className = "splash_link"><span>{'About'}</span></a></li>
                <li><a href = "/contact"
                       className = "splash_link"><span>{'Contact'}</span></a>
                </li>
                <li>
                  <a href = "/" className = "splash_link"><span>{'Home'}</span></a>
                </li>
                <li>
                  <a href = "/sorting-visualizer" className = "splash_link"><span>{'Sorting Algorithms'}</span></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        -- End of background -- */}
      </>
  );
};

export default SplashScreen;